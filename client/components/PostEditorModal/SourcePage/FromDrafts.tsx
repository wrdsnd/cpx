import { gql } from '@apollo/client'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Box,
  Button,
  Flex,
  Grid,
  useDisclosure,
} from '@chakra-ui/react'
import { Postcard, Spacer, Status } from 'components'
import { Lightbox } from 'components/Lightbox'
import { VideoPreview } from 'components/Postcard'
import { ActionIconButton } from 'components/Postcard/ActionIconButton'
import { ImagePreview } from 'components/Postcard/ImagePreview'
import { SourceLink } from 'components/Postcard/SourceLink'
import { TextPreview } from 'components/Postcard/TextPreview'
import { useGetDraftsQuery, useRemoveFromQueueMutation } from 'hooks/graphql'
import { useRef, useState } from 'react'
import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa'
import { MediaType } from 'types/graphql/schema'
import { createTweetUrl } from 'utils/twitter'

gql`
  query GetDrafts {
    drafts {
      id
      createdAt
      content
      sourceId
      media {
        id
        url
        type
        createdAt
      }
    }
  }
`

gql`
  mutation RemoveFromQueue($id: String!) {
    removeFromQueue(id: $id)
  }
`

type Props = {
  onSubmit: (p: string) => void
}

export const FromDrafts = ({ onSubmit }: Props) => {
  const { loading, data, refetch } = useGetDraftsQuery({
    fetchPolicy: 'cache-and-network',
  })

  const [removeFromQueue] = useRemoveFromQueueMutation({
    onCompleted: () => {
      refetch()
    },
  })

  const [idToDelete, setIdToDelete] = useState<string>()
  const cancelDeleteRef = useRef()
  const deletionDialog = useDisclosure()

  if (loading) {
    return <Status.Loading />
  }

  return (
    <Grid
      templateColumns={[
        'repeat(1, minmax(0, 1fr))',
        'repeat(2, minmax(0, 1fr))',
        'repeat(3, minmax(0, 1fr))',
      ]}
      gap={10}
    >
      <DeletionAlert
        isOpen={deletionDialog.isOpen}
        leastDestructiveRef={cancelDeleteRef}
        onClose={() => {
          deletionDialog.onClose()
          setIdToDelete(null)
        }}
        onConfirm={() => {
          removeFromQueue({
            variables: {
              id: idToDelete,
            },
          })
          deletionDialog.onClose()
          setIdToDelete(null)
        }}
      />
      {data.drafts.map((post, index) => {
        const { sourceId, media } = post

        return (
          <Postcard key={post.id}>
            <Lightbox images={post.media}>
              {({ open }) => {
                switch (media[0].type) {
                  case MediaType.IMAGE:
                    return (
                      <ImagePreview
                        alt=""
                        onClick={() => open(index)}
                        src={media[0]?.url}
                      />
                    )
                  case MediaType.VIDEO:
                    return (
                      <VideoPreview
                        onClick={() => open(index)}
                        src={media[0]?.url}
                      />
                    )
                }
              }}
            </Lightbox>
            <Spacer height={4} />
            <Flex justify="space-between">
              <SourceLink href={createTweetUrl(sourceId)}>TWITTER</SourceLink>
              <Box flexShrink={1}>
                <ActionIconButton
                  icon={<FaTrashAlt />}
                  aria-label="Remove from queue"
                  mr={3}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIdToDelete(post.id)
                    deletionDialog.onOpen()
                  }}
                />
                <ActionIconButton
                  icon={<FaCheckCircle />}
                  aria-label="Pick"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSubmit(post.id)
                  }}
                />
              </Box>
            </Flex>
            <TextPreview title={post.content}>{post.content}</TextPreview>
            <Spacer height={4} />
          </Postcard>
        )
      })}
    </Grid>
  )
}

type DeletionAlertProps = {
  onConfirm: () => void
} & Pick<AlertDialogProps, 'isOpen' | 'leastDestructiveRef' | 'onClose'>

const DeletionAlert = ({
  onConfirm,
  isOpen,
  leastDestructiveRef,
  onClose,
}: DeletionAlertProps) => (
  <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={leastDestructiveRef}
    onClose={onClose}
  >
    <AlertDialogOverlay />
    <AlertDialogContent>
      <AlertDialogHeader fontSize="lg" fontWeight="bold">
        Delete post from drafts
      </AlertDialogHeader>

      <AlertDialogBody>Are you sure?</AlertDialogBody>

      <AlertDialogFooter>
        <Button
          variant="ghost"
          // @ts-expect-error chakra-ui typings problem?
          ref={leastDestructiveRef}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button colorScheme="red" onClick={onConfirm} ml={3}>
          Delete
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
)
