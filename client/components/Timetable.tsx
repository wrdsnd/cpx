import { useRef, useState, ReactNode } from 'react'
import isEmpty from 'lodash/isEmpty'
import { gql } from '@apollo/client'
import {
  Flex,
  Text,
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
  Divider,
  IconButton,
  IconButtonProps,
  Grid,
} from '@chakra-ui/react'
import { FaPlus, FaRegCalendarAlt, FaArchive } from 'react-icons/fa'
import { DateTime } from 'luxon'
import { useDrag, useDrop } from 'react-dnd'
import { Postcard, Status, Spacer, PostEditorModal } from 'components'
import { PostModal } from 'components/PostModal'
import { ImagePreview } from 'components/Postcard/ImagePreview'
import { ActionIconButton } from 'components/Postcard/ActionIconButton'
import { TextPreview } from 'components/Postcard/TextPreview'
import { SourceLink } from 'components/Postcard/SourceLink'
import { RescheduleModal } from 'components/RescheduleModal'
import { formatTimeslotTime } from 'utils/timeslots'
import {
  GetQueueDocument,
  useGetQueueQuery,
  useMoveToDraftsFromQueueMutation,
  useReschedulePostOnDropMutation,
} from 'hooks/graphql'
import { VideoPreview } from './Postcard'
import { MediaType } from 'types/graphql/schema'
import { createTweetUrl } from 'utils/twitter'

gql`
  query GetQueue($date: ISO8601Date!) {
    timeslots {
      id
      time
      posts(date: $date) {
        id
        sentAt
        sourceId
        createdAt
        scheduledOn
        timeslot {
          id
          time
        }
        ...PostModalData
      }
    }
  }

  ${PostModal.fragments.data}
`

gql`
  mutation ReschedulePostOnDrop($input: RescheduleInput!, $date: ISO8601Date!) {
    reschedule(input: $input) {
      id
      currentDayPosts: posts(date: $date) {
        id
        scheduledOn
        sentAt
        timeslot {
          id
          time
        }
      }
    }
  }
`

interface DraggablePostCardObject {
  id: string
  timeslotId: string
  scheduledOn: string
}

type DraggablePostcardEnvelopeProps = {
  children: ReactNode
  canDrag: boolean
} & Omit<DraggablePostCardObject, 'type'>
const DraggablePost = ({
  children,
  id,
  timeslotId,
  scheduledOn,
  canDrag,
}: DraggablePostcardEnvelopeProps) => {
  const [, drag] = useDrag({
    canDrag,
    type: 'post',
    item: { id, timeslotId, scheduledOn, type: 'post' },
  })

  return <div ref={drag}>{children}</div>
}

type PostcardDropTargetProps = {
  children: ReactNode
  timeslotId: string
  canDrop: boolean
}
const SchedulePostDropTarget = ({
  children,
  timeslotId,
  canDrop,
}: PostcardDropTargetProps) => {
  const [rescheduleOnDrop] = useReschedulePostOnDropMutation()

  const [, drop] = useDrop<DraggablePostCardObject, void, any>({
    accept: 'post',
    canDrop: (p) => timeslotId !== p.timeslotId && canDrop,
    hover: (p) => {
      if (timeslotId === p.timeslotId) {
        return
      }
    },
    drop: (p) => {
      if (timeslotId === p.timeslotId) {
        return
      }
      rescheduleOnDrop({
        variables: {
          input: {
            id: p.id,
            scheduledOn: p.scheduledOn,
            timeslotId: timeslotId,
          },
          date: p.scheduledOn,
        },
      })
    },
  })

  return <div ref={drop}>{children}</div>
}

type SchedulePostButtonProps = Omit<IconButtonProps, 'aria-label'>

const SchedulePostButton = (p: SchedulePostButtonProps) => {
  const [isHovered, setHovered] = useState(false)

  const minHeight = 16
  const maxHeight = '346px'

  return (
    <IconButton
      icon={<FaPlus />}
      width="100%"
      variant="outline"
      colorScheme="pink"
      borderStyle="dashed"
      aria-label="Schedule post"
      onMouseEnter={() => setHovered(true)}
      onDragEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDragLeave={() => setHovered(false)}
      height={[minHeight, isHovered ? maxHeight : minHeight]}
      opacity={[1, isHovered ? 1 : 0.3]}
      transition="all 250ms;"
      _hover={{
        opacity: 1,
      }}
      _focus={{
        opacity: 1,
      }}
      _active={{
        opacity: 1,
      }}
      {...p}
    />
  )
}

gql`
  mutation MoveToDraftsFromQueue($input: SaveAsDraftInput!) {
    saveAsDraft(input: $input) {
      id
    }
  }
`

export const Timetable = ({ selectedDate }: { selectedDate: DateTime }) => {
  const [removeFromQueue] = useMoveToDraftsFromQueueMutation({
    refetchQueries: [
      {
        query: GetQueueDocument,
        variables: { date: selectedDate.toISODate() },
      },
    ],
  })

  const cancelDeleteRef = useRef()

  const deleteDialog = useDisclosure()
  const [idToDelete, setIdToDelete] = useState<string>()

  const { loading, data, error } = useGetQueueQuery({
    variables: {
      date: selectedDate.toISODate(),
    },
  })

  const postModal = useDisclosure()
  const [activeTimeslotId, setActiveTimeslotId] = useState<string>()

  const viewDialog = useDisclosure({ defaultIsOpen: true })
  const [idToView, setIdToView] = useState<string>()

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
    <Box>
      <AlertDialog
        isOpen={deleteDialog.isOpen}
        leastDestructiveRef={cancelDeleteRef}
        onClose={() => {
          deleteDialog.onClose()
          setIdToDelete(null)
        }}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Move post to drafts
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can always reschedule post in editor
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              variant="ghost"
              ref={cancelDeleteRef}
              onClick={deleteDialog.onClose}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                removeFromQueue({
                  variables: {
                    input: {
                      id: idToDelete,
                    },
                  },
                })
                deleteDialog.onClose()
                setIdToDelete(null)
              }}
              ml={3}
            >
              Move
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {rescheduleDialog.isOpen && (
        <RescheduleModal
          id={idToReschedule}
          isOpen
          onClose={rescheduleDialog.onClose}
        />
      )}

      {data.timeslots
        .filter((timeslot) => {
          const now = DateTime.local()
          const timeslotDateTime = DateTime.fromISO(timeslot.time).set({
            year: selectedDate.get('year'),
            day: selectedDate.get('day'),
            month: selectedDate.get('month'),
          })
          return now < timeslotDateTime || timeslot.posts.length > 0
        })
        .map((timeslot, index) => {
          const now = DateTime.local({ zone: 'Europe/Moscow' })
          const timeslotDateTime = DateTime.fromISO(timeslot.time, {
            zone: 'Europe/Moscow',
          }).set({
            day: selectedDate.get('day'),
            month: selectedDate.get('month'),
          })
          const timeslotIsInFuture = now < timeslotDateTime

          return (
            <Box mb={10} key={index}>
              {postModal.isOpen && timeslot.id === activeTimeslotId && (
                <PostEditorModal
                  isOpen
                  initialTimelotId={timeslot.id}
                  initialDate={selectedDate.toISODate()}
                  isDraft={false}
                  onClose={() => {
                    postModal.onClose()
                    setActiveTimeslotId(null)
                  }}
                />
              )}
              <Text mb={4} fontSize="lg">
                {formatTimeslotTime(timeslot.time)}
              </Text>
              <Divider mb={4} />
              <Grid
                templateColumns={[
                  'repeat(1, minmax(0, 1fr))',
                  'repeat(2, minmax(0, 1fr))',
                  'repeat(3, minmax(0, 1fr))',
                  'repeat(4, minmax(0, 1fr))',
                ]}
                gap={10}
              >
                {isEmpty(timeslot.posts) ? (
                  <SchedulePostDropTarget
                    canDrop={timeslotIsInFuture}
                    timeslotId={timeslot.id}
                  >
                    <SchedulePostButton
                      onClick={() => {
                        postModal.onOpen()
                        setActiveTimeslotId(timeslot.id)
                      }}
                      isActive={timeslot.id === activeTimeslotId}
                    />
                  </SchedulePostDropTarget>
                ) : (
                  <>
                    {timeslot.posts.map(
                      (
                        { id, sentAt, sourceId, content, media, __typename },
                        index,
                      ) => (
                        <DraggablePost
                          key={index}
                          timeslotId={timeslot.id}
                          id={id}
                          scheduledOn={selectedDate.toISODate()}
                          canDrag={!sentAt}
                        >
                          <Postcard
                            onClick={() => {
                              setIdToView(id)
                              viewDialog.onOpen()
                            }}
                          >
                            {viewDialog.isOpen && id === idToView && (
                              <PostModal
                                onClose={viewDialog.onClose}
                                post={{ content, media, __typename }}
                              />
                            )}
                            {media[0].type === MediaType.IMAGE && (
                              <ImagePreview alt="" src={media[0]?.url} />
                            )}
                            {media[0].type === MediaType.VIDEO && (
                              <VideoPreview src={media[0]?.url} />
                            )}
                            <Spacer height={4} />
                            <Flex justify="space-between">
                              <SourceLink href={createTweetUrl(sourceId)}>
                                TWITTER
                              </SourceLink>
                              {!sentAt && (
                                <Box flexShrink={1}>
                                  <ActionIconButton
                                    icon={<FaRegCalendarAlt />}
                                    aria-label="Reschedule"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setIdToReschedule(id)
                                      rescheduleDialog.onOpen()
                                    }}
                                    mr={3}
                                  />
                                  <ActionIconButton
                                    icon={<FaArchive />}
                                    aria-label="Move to drafts"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setIdToDelete(id)
                                      deleteDialog.onOpen()
                                    }}
                                  />
                                </Box>
                              )}
                            </Flex>
                            <TextPreview>{content}</TextPreview>
                            <Spacer height={4} />
                          </Postcard>
                        </DraggablePost>
                      ),
                    )}
                    {timeslotIsInFuture && (
                      <SchedulePostDropTarget
                        canDrop={timeslotIsInFuture}
                        timeslotId={timeslot.id}
                      >
                        <SchedulePostButton
                          onClick={() => {
                            postModal.onOpen()
                            setActiveTimeslotId(timeslot.id)
                          }}
                        />
                      </SchedulePostDropTarget>
                    )}
                  </>
                )}
              </Grid>
            </Box>
          )
        })}
    </Box>
  )
}
