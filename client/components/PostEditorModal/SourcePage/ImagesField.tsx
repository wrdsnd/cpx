import { remove } from 'lodash'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import { Image, Box } from '@chakra-ui/react'
import { move } from './utils'
import { useCallback } from 'react'
import { useField } from 'react-final-form'
import { CloseIcon } from '@chakra-ui/icons'
import { Lightbox } from 'components/Lightbox'

export const ImagesField = () => {
  const { input } = useField('images')
  const { value, onChange } = input

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return
      }

      const res = move(value, result.source.index, result.destination.index)
      onChange(res)
    },
    [value],
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="images">
        {(provided) => (
          <div ref={provided.innerRef}>
            {value.map((image, index) => (
              <Draggable key={image.src} draggableId={image.src} index={index}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{
                      position: 'relative',
                      marginBottom: index !== value.length && 2,
                      width: 150,
                    }}
                  >
                    <Lightbox images={value}>
                      {({ open }) => (
                        <Image
                          onClick={() => open(index)}
                          src={image.src}
                          borderRadius="sm"
                          userSelect="none"
                          alt=""
                        />
                      )}
                    </Lightbox>
                    <CloseIcon
                      onClick={() => {
                        onChange(
                          remove(
                            value,
                            (_, imageIndex) => index !== imageIndex,
                          ),
                        )
                      }}
                      color="white"
                      backgroundColor="gray.900"
                      position="absolute"
                      top={2}
                      borderRadius="sm"
                      opacity={0.8}
                      right={2}
                      p={1}
                      height={5}
                      width={5}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          opacity: 1,
                        },
                      }}
                    />
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
