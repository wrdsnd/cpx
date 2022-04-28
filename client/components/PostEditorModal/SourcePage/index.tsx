import { useState } from 'react'
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { Spacer } from 'components'
import { FromDrafts } from './FromDrafts'
import { FromURL } from './FromURL'
import { PostSource } from './types'
import { SendToQueueInput } from 'types/graphql/schema'

const labels = {
  [PostSource.DRAFTS]: 'From drafts',
  [PostSource.URL]: 'From URL',
}

type Props = {
  initialSourceUrl: string
  allowedSources: PostSource[]
  onPostSubmit: (p: SendToQueueInput) => void
  onDraftedPostIdSubmit: (id: string) => void
}

export const SourcePage = ({
  initialSourceUrl,
  allowedSources,
  onPostSubmit,
  onDraftedPostIdSubmit,
}: Props) => {
  const [firstSource] = allowedSources
  const [source, setSource] = useState<PostSource>(firstSource)

  return (
    <>
      {allowedSources.length > 1 && (
        <>
          <RadioGroup value={source} onChange={(v: PostSource) => setSource(v)}>
            <Stack direction="row">
              {allowedSources.map((source) => (
                <Radio key={source} value={source}>
                  {labels[source]}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Spacer h={4} />
        </>
      )}
      {source === PostSource.URL && (
        <FromURL onSubmit={onPostSubmit} initialSourceUrl={initialSourceUrl} />
      )}
      {source === PostSource.DRAFTS && (
        <FromDrafts onSubmit={onDraftedPostIdSubmit} />
      )}
    </>
  )
}
