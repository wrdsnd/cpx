import { useState } from 'react'
import gql from 'graphql-tag'
import { Flex, Box, Grid } from '@chakra-ui/react'
import { Postcard, Lightbox, Spacer, PostEditorModal, Status } from 'components'
import Head from 'next/head'
import { ImagePreview } from 'components/Postcard/ImagePreview'
import { SourceLink } from 'components/Postcard/SourceLink'
import { ActionIconButton } from 'components/Postcard/ActionIconButton'
import { TextPreview } from 'components/Postcard/TextPreview'
import { createTweetUrl } from 'utils/sources'
import { AddIcon } from '@chakra-ui/icons'
import { useGetPostsLazyQuery } from 'hooks/graphql'
import { WorkspaceLayout } from 'components/WorkspaceLayout'
import { useAuthAccess } from 'hooks/access'

gql`
  query GetPosts {
    feed {
      id
      inQueue
      message
      user {
        name
      }
      images {
        src
      }
    }
  }
`

const Feed = () => {
  const [runGetPostsQuery, { loading, error, data = { feed: [] } }] =
    useGetPostsLazyQuery({
      pollInterval: 40000,
    })

  const [isAuthenticated] = useAuthAccess({
    onSuccess: () => {
      runGetPostsQuery()
    },
  })

  const [sourceUrl, setSourceUrl] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)

  if (loading || !isAuthenticated) {
    return (
      <Flex justify="center">
        <Status.Loading />
      </Flex>
    )
  }

  if (error) {
    return (
      <Flex justify="center">
        <Status.Failed />
      </Flex>
    )
  }

  return (
    <>
      <Head>
        <title>Feed</title>
      </Head>
      {modalIsOpen && (
        <PostEditorModal
          isDraft={false}
          isOpen={modalIsOpen}
          initialSourceUrl={sourceUrl}
          onClose={() => {
            setModalIsOpen(false)
            setSourceUrl('')
          }}
        />
      )}
      <Grid
        templateColumns={[
          'repeat(1, minmax(0, 1fr))',
          'repeat(2, minmax(0, 1fr))',
          'repeat(3, minmax(0, 1fr))',
          'repeat(4, minmax(0, 1fr))',
        ]}
        gap={10}
      >
        {data.feed.map((post, index) => (
          <Lightbox key={index} images={post.images}>
            {({ open }) => (
              <Postcard>
                <ImagePreview
                  alt=""
                  onClick={() => open(0)}
                  src={post.images[0]?.src}
                />
                <Spacer height={4} />
                <Flex justify="space-between">
                  <SourceLink
                    href={createTweetUrl({
                      id: post.id,
                      username: post.user.name,
                    })}
                  >
                    TWITTER
                  </SourceLink>
                  <Box flexShrink={1}>
                    <ActionIconButton
                      icon={<AddIcon />}
                      aria-label="Add to queue"
                      onClick={() => {
                        setSourceUrl(
                          createTweetUrl({
                            id: post.id,
                            username: post.user.name,
                          }),
                        )
                        setModalIsOpen(true)
                      }}
                    />
                  </Box>
                </Flex>
                <TextPreview title={post.message}>{post.message}</TextPreview>
                <Spacer height={4} />
              </Postcard>
            )}
          </Lightbox>
        ))}
      </Grid>
    </>
  )
}

Feed.Layout = WorkspaceLayout

export default Feed
