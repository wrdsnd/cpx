import { useState, useEffect, useMemo } from 'react'
import { Form } from 'react-final-form'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps,
  Input,
  Button,
  Flex,
  useToast,
} from '@chakra-ui/react'
import gql from 'graphql-tag'
import { DateTime } from 'luxon'
import { Status, Spacer } from 'components'
import { createTelegramMessage } from 'utils/templates'
import { parseTweetId } from 'utils/sources'
import {
  GetQueueDocument,
  GetDraftsDocument,
  useGetPostLazyQuery,
  useGetTimeslotsQuery,
  useSendToQueueFromEditorMutation,
} from 'hooks/graphql'
import { EditorForm } from './EditorForm'
import { GetPostQuery, SendToQueueInput } from 'types/graphql/schema'

type Props = {
  initialSourceUrl?: string
  initialDate?: string
  initialTimelotId?: string
  onClose: () => void
  isDraft: boolean
} & Pick<ModalProps, 'isOpen'>

gql`
  query GetPost($id: String!) {
    news(id: $id) {
      id
      inQueue
      images {
        src
      }
      user {
        name
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
        sourceMeta {
          text
          media {
            src
          }
          id
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

export const EditorModal = ({
  isOpen,
  onClose,
  initialSourceUrl,
  initialDate,
  initialTimelotId,
  isDraft,
}: Props) => {
  const toast = useToast()

  const timeslots = useGetTimeslotsQuery()

  const [getPost, getPostRequest] = useGetPostLazyQuery({
    fetchPolicy: 'no-cache',
  })

  const [sourceUrl, setSourceUrl] = useState(initialSourceUrl)

  useEffect(() => {
    setSourceUrl(initialSourceUrl)
  }, [initialSourceUrl])

  const sourceId = useMemo(() => parseTweetId(sourceUrl), [sourceUrl])

  useEffect(() => {
    if (sourceId) {
      getPost({ variables: { id: sourceId } })
    }
  }, [sourceId])

  const [sendToQueue, sendToQueueRequest] = useSendToQueueFromEditorMutation({
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
            query: GetQueueDocument,
            variables: {
              date: data.sendToQueue?.scheduledOn,
            },
          },
        ]
      }
    },
  })

  const postIsReady =
    !getPostRequest.error &&
    !getPostRequest.loading &&
    getPostRequest.data &&
    !timeslots.loading &&
    !timeslots.error

  const canSendPost = !sendToQueueRequest.loading && postIsReady

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New post</ModalHeader>
        <ModalCloseButton right={2} />
        <ModalBody>
          <Input
            placeholder="Tweet URL"
            value={initialSourceUrl}
            onChange={(e: any) => {
              const url = e.target.value
              setSourceUrl(url)
            }}
            isDisabled={sendToQueueRequest.loading}
          />
          <Spacer height={4} />
          {postIsReady && (
            <Form<{
              images: GetPostQuery['news']['images']
              message: string
              timeslotId: string
              scheduledOn: string
              isDraft: boolean
            }>
              component={(props) => (
                <EditorForm
                  id="editorForm"
                  timeslots={timeslots.data.timeslots}
                  {...props}
                />
              )}
              initialValues={{
                message: createTelegramMessage({
                  id: sourceId,
                  username: getPostRequest.data.news.user.name,
                }),
                images: getPostRequest.data.news.images,
                timeslotId:
                  initialTimelotId || timeslots.data?.timeslots[0]?.id,
                scheduledOn: initialDate || DateTime.local().toISODate(),
                isDraft: isDraft,
              }}
              onSubmit={(v) => {
                const postValues: SendToQueueInput = v.isDraft
                  ? {
                      sourceId: sourceId,
                      media: v.images.map((i) => ({
                        ...i,
                        __typename: undefined,
                      })),
                      text: v.message,
                      isDraft: true,
                    }
                  : {
                      sourceId: sourceId,
                      media: v.images.map((i) => ({
                        ...i,
                        __typename: undefined,
                      })),
                      text: v.message,
                      timeslotId: v.timeslotId,
                      scheduledOn: v.scheduledOn,
                    }

                sendToQueue({
                  variables: {
                    input: {
                      ...postValues,
                    },
                  },
                })
              }}
            />
          )}
          {getPostRequest.loading && (
            <Flex justify="center">
              <Status.Loading />
            </Flex>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose} mr={3}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            isDisabled={!canSendPost}
            onClick={() => {
              document
                .getElementById('editorForm')
                .dispatchEvent(
                  new Event('submit', { cancelable: true, bubbles: true }),
                )
            }}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
