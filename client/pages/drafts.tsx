import { ReactNode, useState } from 'react'
import { FaRegCalendarAlt, FaTrashAlt } from 'react-icons/fa'
import gql from 'graphql-tag'
import { Postcard, Spacer, Status } from 'components'
import { Flex, Box, Grid, Text, useDisclosure } from '@chakra-ui/react'
import Head from 'next/head'
import { ImagePreview } from 'components/Postcard/ImagePreview'
import { ActionIconButton } from 'components/Postcard/ActionIconButton'
import { TextPreview } from 'components/Postcard/TextPreview'
import { RescheduleModal } from 'components/RescheduleModal'
import { useGetDraftsQuery, useRemoveFromQueueMutation } from 'hooks/graphql'
import { WorkspaceLayout } from 'components/WorkspaceLayout'
import { GetDraftsQuery } from 'types/graphql/schema'
import { PostModal } from 'components/PostModal'

export const GET_DRAFTS = gql`
  query GetDrafts {
    drafts {
      id
      createdAt
      sourceMeta {
        id
        media {
          src
        }
        text
      }
    }
  }
`

gql`
  mutation RemoveFromQueue($id: String!) {
    removeFromQueue(id: $id)
  }
`

const Drafts = () => {
  const { loading, error, data, refetch } = useGetDraftsQuery({
    fetchPolicy: 'cache-and-network',
  })

  const [removeFromQueue] = useRemoveFromQueueMutation({
    onCompleted: () => {
      refetch()
    },
  })

  const rescheduleDialog = useDisclosure()
  const [idToReschedule, setIdToReschedule] = useState<string>()

  if (loading) {
    return (
      <Flex justify="center">
        <Status.Loading />
      </Flex>
    )
  }

  if (error) {
    return (
      <Flex justifyContent="center">
        <Status.Failed />
      </Flex>
    )
  }

  return (
    <>
      <Head>
        <title>Drafts</title>
      </Head>
      {rescheduleDialog.isOpen && (
        <RescheduleModal
          id={idToReschedule}
          isOpen
          onClose={rescheduleDialog.onClose}
          onSubmit={() => {
            refetch()
          }}
        />
      )}
      <DraftsGrid
        drafts={data.drafts}
        onRemove={(id) => {
          removeFromQueue({ variables: { id } })
        }}
        onRechedule={(id) => {
          setIdToReschedule(id)
          rescheduleDialog.onOpen()
        }}
      />
    </>
  )
}

Drafts.Layout = ({ children }: { children: ReactNode }) => (
  <WorkspaceLayout editorDefaultMode="DRAFT">{children}</WorkspaceLayout>
)

export default Drafts

type DraftsGridProps = {
  drafts: GetDraftsQuery['drafts']
  onRemove: (id: string) => void
  onRechedule: (id: string) => void
}
const DraftsGrid = ({
  drafts,
  onRechedule: onReschedule,
  onRemove,
}: DraftsGridProps) => {
  const postViewModal = useDisclosure()
  const [idToView, setIdToView] = useState<string>()

  return drafts.length === 0 ? (
    <Flex justify="center">
      <Text fontSize="xl" color="gray.600">
        Nothing here yet
      </Text>
    </Flex>
  ) : (
    <Grid
      templateColumns={[
        'repeat(1, minmax(0, 1fr))',
        'repeat(2, minmax(0, 1fr))',
        'repeat(3, minmax(0, 1fr))',
        'repeat(4, minmax(0, 1fr))',
      ]}
      gap={10}
    >
      {drafts.map((post) => (
        <Postcard
          key={post.id}
          onClick={() => {
            setIdToView(post.id)
            postViewModal.onOpen()
          }}
        >
          {postViewModal.isOpen && post.id === idToView && (
            <PostModal
              onClose={postViewModal.onClose}
              sourceMeta={post.sourceMeta}
            />
          )}
          <ImagePreview src={post.sourceMeta.media[0]?.src} />
          <Spacer height={4} />
          <Flex justify="flex-end">
            <Box flexShrink={1}>
              <ActionIconButton
                icon={<FaRegCalendarAlt />}
                aria-label="Add to queue"
                onClick={(e) => {
                  e.stopPropagation()
                  onReschedule(post.id)
                }}
                mr={3}
              />
              <ActionIconButton
                icon={<FaTrashAlt />}
                aria-label="Remove from queue"
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove(post.id)
                }}
              />
            </Box>
          </Flex>
          <TextPreview title={post.sourceMeta.text}>
            {post.sourceMeta.text}
          </TextPreview>
          <Spacer height={4} />
        </Postcard>
      ))}
    </Grid>
  )
}
