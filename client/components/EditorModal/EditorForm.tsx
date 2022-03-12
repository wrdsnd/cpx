import { Spacer } from 'components'
import { SwitchField, TextareaField } from 'fields'
import { FormRenderProps, useField } from 'react-final-form'
import { ImagesField } from './ImagesField'
import { TimeslotField } from 'components/TimeslotField'
import { FormControl, FormLabel } from '@chakra-ui/react'
import { GetPostQuery } from 'types/graphql/schema'

type EditorFormProps = { id: string; timeslots: any } & FormRenderProps<{
  images: GetPostQuery['news']['images']
  message: string
  timeslotId: string
  scheduledOn: string
  isDraft: boolean
}>

export const EditorForm = ({
  id,
  timeslots,
  handleSubmit,
}: EditorFormProps) => {
  const isDraftField = useField('isDraft')

  return (
    <form id={id} onSubmit={handleSubmit}>
      <FormControl display="flex" alignItems="center" mb={2}>
        <SwitchField name="isDraft" size="sm" mr={2} />
        <FormLabel m={0} htmlFor="is-draft">
          Draft
        </FormLabel>
      </FormControl>
      {!isDraftField.input.value && (
        <TimeslotField timeslotOptions={timeslots} />
      )}
      <Spacer height={4} />
      <TextareaField name="message" />
      <Spacer height={2} />
      <ImagesField />
    </form>
  )
}
