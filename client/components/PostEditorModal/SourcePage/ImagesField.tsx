import { useCallback, useRef } from 'react'
import { useField } from 'react-final-form'
import { useDrag, useDrop } from 'react-dnd'
import type { Identifier, XYCoord } from 'dnd-core'
import remove from 'lodash/remove'
import { Image, Box, BoxProps } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { Lightbox } from 'components/Lightbox'
import { move } from './utils'
import { MediaType, TwitterMedia } from 'types/graphql/schema'

export const ImagesField = () => {
  const { input } = useField<TwitterMedia[]>('images')
  const { value, onChange } = input

  const renderImage = useCallback(
    (_, index) => {
      return (
        <DraggableImage
          onChange={onChange}
          media={value}
          index={index}
          key={index}
          sx={{
            position: 'relative',
            marginBottom: index !== value.length && 2,
            width: 150,
          }}
        />
      )
    },
    [value, onChange],
  )

  return <div>{value.map((image, index) => renderImage(image, index))}</div>
}

interface DragItem {
  index: number
  id: string
  type: string
}

type DraggableImageProps = {
  index: number
  media: TwitterMedia[]
  onChange: (v: any) => void
} & BoxProps
const DraggableImage = ({
  index,
  media,
  onChange,
  ...rest
}: DraggableImageProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const [handlerId, drop] = useDrop<
    any,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'image',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      // alert(dragIndex, hoverIndex)
      console.log(
        media,
        move(media, dragIndex, hoverIndex),
        dragIndex,
        hoverIndex,
      )
      onChange(move(media, dragIndex, hoverIndex))

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'image',
    item: () => {
      return { index }
    },
    canDrag: media.length > 1,
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.9 : 1
  drag(drop(ref))

  const mediaItem = media[index]

  return (
    <Box
      ref={ref}
      cursor={media.length > 1 && 'grab'}
      opacity={opacity}
      data-handler-id={handlerId}
      {...rest}
    >
      <Lightbox images={media}>
        {({ open }) => (
          <>
            {mediaItem.type === MediaType.VIDEO && (
              <video
                onClick={() => open(index)}
                src={mediaItem.url}
                autoPlay
                loop
                muted
              />
            )}
            {mediaItem.type === MediaType.IMAGE && (
              <Image
                onClick={() => open(index)}
                src={mediaItem.url}
                borderRadius="md"
                userSelect="none"
                alt=""
              />
            )}
            {media.length > 1 && (
              <CloseIcon
                onClick={() => {
                  onChange(
                    remove(media, (_, imageIndex) => index !== imageIndex),
                  )
                }}
                color="white"
                backgroundColor="gray.900"
                position="absolute"
                top={2}
                borderRadius="sm"
                right={2}
                p={1}
                height={5}
                width={5}
                cursor="pointer"
                _hover={{
                  opacity: 1,
                }}
              />
            )}
          </>
        )}
      </Lightbox>
    </Box>
  )
}
