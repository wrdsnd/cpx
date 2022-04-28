import { gql } from '@apollo/client'
import { Flex, Grid } from '@chakra-ui/react'
import { Postcard, Spacer, Status } from 'components'
import { ActionIconButton } from 'components/Postcard/ActionIconButton'
import { ImagePreview } from 'components/Postcard/ImagePreview'
import { TextPreview } from 'components/Postcard/TextPreview'
import { useGetDraftsForEditorQuery } from 'hooks/graphql'
import { FaCheckCircle } from 'react-icons/fa'

gql`
  query GetDraftsForEditor {
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

type Props = {
  onSubmit: (p: string) => void
}

export const FromDrafts = ({ onSubmit }: Props) => {
  const { loading, data } = useGetDraftsForEditorQuery({
    fetchPolicy: 'no-cache',
  })

  if (loading) {
    return <Status.Loading />
  }

  return (
    <Grid
      templateColumns={[
        'repeat(1, minmax(0, 1fr))',
        'repeat(2, minmax(0, 1fr))',
      ]}
      gap={10}
    >
      {data.drafts.map((post) => {
        return (
          <Postcard
            key={post.id}
            // onClick={() => {
            //   setIdToView(post.id)
            //   postViewModal.onOpen()
            // }}
          >
            <ImagePreview src={post.sourceMeta.media[0]?.src} />
            <Spacer height={4} />
            <Flex justify="flex-end">
              <ActionIconButton
                icon={<FaCheckCircle />}
                aria-label="Remove from queue"
                onClick={(e) => {
                  e.stopPropagation()
                  onSubmit(post.id)
                }}
              />
            </Flex>
            <TextPreview title={post.sourceMeta.text}>
              {post.sourceMeta.text}
            </TextPreview>
            <Spacer height={4} />
          </Postcard>
        )
      })}
    </Grid>
  )
}
