import { useCallback, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps,
  Button,
  useToast,
} from '@chakra-ui/react'
import gql from 'graphql-tag'
import { PostSource } from './SourcePage/types'
import { SendToQueueInput } from 'types/graphql/schema'
import { Page } from './types'
import { SchedulePage } from './SchedulePage'
import { SourcePage } from './SourcePage'
import {
  GetDraftsDocument,
  ReloadQueueAfterPostCreationDocument,
  useReschedulePostFromDraftsMutation,
  useSendToQueueFromEditorMutation,
} from 'hooks/graphql'

const useEditorPager = (): [Page, boolean, () => void] => {
  const [page, setPage] = useState<Page>('edit')

  const isLastPage = page === 'schedule'

  const goToNextPage = useCallback(() => {
    const currentPageIndex = pagesInOrder.indexOf(page)

    if (!isLastPage) {
      setPage(pagesInOrder[currentPageIndex + 1])
    }
  }, [isLastPage, page])

  return [page, isLastPage, goToNextPage]
}

const pagesInOrder: Page[] = ['edit', 'schedule']

type Props = {
  initialSourceUrl?: string
  initialDate?: string
  initialTimelotId?: string
  onClose: () => void
  isDraft: boolean
} & Pick<ModalProps, 'isOpen'>

export const PostEditorModal = ({
  isOpen,
  onClose,
  initialSourceUrl,
  initialDate,
  initialTimelotId,
  isDraft,
}: Props) => {
  const toast = useToast()

  const [source, setSource] = useState<PostSource>()

  const [draftId, setDraftId] = useState<string>()
  const [rescheduleFromDrafts] = useReschedulePostFromDraftsMutation({
    awaitRefetchQueries: true,
  })

  const [post, setPost] = useState<SendToQueueInput>()
  const [sendToQueue] = useSendToQueueFromEditorMutation({
    onCompleted: () => {
      onClose()
    },
    onError: () => {
      toast({ status: 'error', title: '' })
    },
    refetchQueries: ({ data }) => {
      if (data.sendToQueue.isDraft) {
        return [
          {
            query: GetDraftsDocument,
          },
        ]
      } else {
        return [
          {
            query: ReloadQueueAfterPostCreationDocument,
            variables: {
              date: data.sendToQueue?.scheduledOn,
            },
          },
        ]
      }
    },
  })

  const [page, isLastPage, goToNextPage] = useEditorPager()

  const submitCurrentEditorPage = (page: Page) => {
    document
      .getElementById(`${page}Form`)
      .dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
  }

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        mt={[0, '3.75rem']}
        minH={['100vh', 'initial']}
        mb={[0, '3.75rem']}
      >
        <ModalHeader>New post</ModalHeader>
        <ModalCloseButton right={2} />
        <ModalBody>
          {page === 'edit' && (
            <SourcePage
              onPostSubmit={(p) => {
                setPost(p)
                setSource(PostSource.URL)
                goToNextPage()
              }}
              onDraftedPostIdSubmit={(id: string) => {
                setSource(PostSource.DRAFTS)
                setDraftId(id)
                goToNextPage()
              }}
              allowedSources={[PostSource.URL, PostSource.DRAFTS]}
              initialSourceUrl={initialSourceUrl}
            />
          )}
          {page === 'schedule' && (
            <SchedulePage
              initialDate={initialDate}
              initialTimeslotId={initialTimelotId}
              isDraft={isDraft}
              onSubmit={async ({ isDraft, scheduledOn, timeslotId }) => {
                switch (source) {
                  case PostSource.URL: {
                    await sendToQueue({
                      variables: {
                        input: {
                          ...post,
                          isDraft,
                          scheduledOn,
                          timeslotId,
                        },
                      },
                    })
                    break
                  }

                  case PostSource.DRAFTS: {
                    await rescheduleFromDrafts({
                      variables: {
                        input: { id: draftId, scheduledOn, timeslotId },
                        date: scheduledOn,
                      },
                    })
                    break
                  }
                }

                onClose()
              }}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose} mr={3}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              submitCurrentEditorPage(page)
            }}
          >
            {isLastPage ? 'Save' : 'Next'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

gql`
  query GetPost($id: String!) {
    news(id: $id) {
      id
      inQueue
      media {
        url
        type
      }
      user {
        name
      }
    }
  }
`

gql`
  mutation ReschedulePostFromDraftsInEditor(
    $input: RescheduleInput!
    $date: ISO8601Date!
  ) {
    reschedule(input: $input) {
      id
      posts(date: $date) {
        id
        scheduledOn
        timeslot {
          id
          time
        }
      }
    }
  }
`

gql`
  query ReloadQueueAfterPostCreation($date: ISO8601Date!) {
    timeslots {
      id
      time
      posts(date: $date) {
        id
        sentAt
        sourceId
        createdAt
        content
        media {
          id
          url
          createdAt
        }
      }
    }
  }
`

gql`
  query GetTimeslots {
    timeslots {
      id
      time
    }
  }
`

gql`
  mutation SendToQueueFromEditor($input: SendToQueueInput!) {
    sendToQueue(input: $input) {
      id
      scheduledOn
      isDraft
    }
  }
`
