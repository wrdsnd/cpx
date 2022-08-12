import { Box, Flex, Input } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { Form } from 'react-final-form'
import { Spacer, Status } from 'components'
import { TextareaField } from 'fields'
import { useGetPostLazyQuery } from 'hooks/graphql'
import { GetPostQuery, SendToQueueInput } from 'types/graphql/schema'
import { parseTweetId } from 'utils/sources'
import { createTelegramMessage } from 'utils/templates'
import { Page } from '../types'
import { ImagesField } from './ImagesField'

type Props = {
  initialSourceUrl: string
  onSubmit: (p: SendToQueueInput) => void
}

export const FromURL = ({ initialSourceUrl, onSubmit }: Props) => {
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
  }, [sourceId, getPost])

  const postIsReady =
    !getPostRequest.error && !getPostRequest.loading && getPostRequest.data

  return (
    <Box>
      <Input
        placeholder="Tweet URL"
        value={sourceUrl}
        onChange={(e: any) => {
          const url = e.target.value
          setSourceUrl(url)
        }}
      />
      <Spacer height={4} />
      {postIsReady && (
        <Form<{
          images: GetPostQuery['news']['media']
          message: string
        }>
          initialValues={{
            message: createTelegramMessage({
              id: sourceId,
              username: getPostRequest.data.news.user.name,
            }),
            images: getPostRequest.data.news.media,
          }}
          onSubmit={(v) => {
            const post: SendToQueueInput = {
              sourceId: sourceId,
              media: v.images.map((i) => ({
                ...i,
                __typename: undefined,
              })),
              text: v.message,
              isDraft: false,
            }

            onSubmit(post)
          }}
        >
          {({ handleSubmit }) => {
            const formNamePrefix: Page = 'edit'
            return (
              <form id={formNamePrefix + 'Form'} onSubmit={handleSubmit}>
                <Spacer height={4} />
                <TextareaField name="message" />
                <Spacer height={2} />
                <ImagesField />
              </form>
            )
          }}
        </Form>
      )}
      {getPostRequest.loading && (
        <Flex justify="center">
          <Status.Loading />
        </Flex>
      )}
    </Box>
  )
}
