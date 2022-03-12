import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalProps,
  ModalFooter,
  Button,
} from '@chakra-ui/react'
import { TimeslotField } from './TimeslotField'
import gql from 'graphql-tag'
import { Form } from 'react-final-form'
import { Loading } from './Status'
import {
  useGetDataToRescheduleQuery,
  useReschedulePostFromDraftsMutation,
  useReschedulePostMutation,
} from 'hooks/graphql'

type FormValues = {
  scheduledOn: string
  timeslotId: string
}

type Props = {
  id: string
  onSubmit?: (values: FormValues) => void
} & Pick<ModalProps, 'onClose' | 'isOpen'>

gql`
  query GetDataToReschedule($id: String!) {
    timeslots {
      id
      time
    }
    post(id: $id) {
      id
      scheduledOn
      timeslot {
        id
        time
      }
    }
  }
`

gql`
  mutation ReschedulePost(
    $input: RescheduleInput!
    $date: ISO8601Date!
    $secondDate: ISO8601Date!
  ) {
    reschedule(input: $input) {
      id
      currentDayPosts: posts(date: $date) {
        id
        scheduledOn
        timeslot {
          id
          time
        }
      }
      anotherDayPosts: posts(date: $secondDate) {
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
  mutation ReschedulePostFromDrafts(
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

export const RescheduleModal = ({ id, isOpen, onSubmit, onClose }: Props) => {
  const { data, loading } = useGetDataToRescheduleQuery({
    variables: {
      id,
    },
  })

  const [reschedule] = useReschedulePostMutation({ onCompleted: onClose })

  const [rescheduleFromDrafts] = useReschedulePostFromDraftsMutation({
    onCompleted: onClose,
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      {loading ? (
        <Loading />
      ) : (
        <Form<FormValues>
          onSubmit={async (values) => {
            if (data.post.scheduledOn) {
              await reschedule({
                variables: {
                  date: data.post.scheduledOn,
                  secondDate: values.scheduledOn,
                  input: {
                    id,
                    ...values,
                  },
                },
              })
            } else {
              await rescheduleFromDrafts({
                variables: {
                  date: values.scheduledOn,
                  input: {
                    id,
                    ...values,
                  },
                },
              })
            }

            onSubmit && onSubmit(values)
          }}
          initialValues={{
            scheduledOn: data.post.scheduledOn,
            timeslotId: data.post.timeslot?.id,
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <ModalContent>
                <ModalHeader>Reschedule post</ModalHeader>
                <ModalCloseButton right={2} />
                <ModalBody>
                  <TimeslotField
                    timeslotOptions={data.timeslots}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={onClose}
                    mr={3}
                  >
                    Cancel
                  </Button>
                  <Button colorScheme="blue" type="submit">
                    Reschedule
                  </Button>
                </ModalFooter>
              </ModalContent>
            </form>
          )}
        </Form>
      )}
    </Modal>
  )
}
