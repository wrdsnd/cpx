import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wrap } from 'popmotion'
import {
  Box,
  BoxProps,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Modal,
  ModalHeader,
  Text,
} from '@chakra-ui/react'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'
import { useKeyPressEvent } from 'react-use'

type Props = {
  images: ReadonlyArray<{ src: string }>
  children: any
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
}

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export const Lightbox = ({ images = [], children }: Props) => {
  const scrollIsEnabled = images.length > 1

  const [[page, direction], setPage] = useState([0, 0])

  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = (index: number) => {
    setPage([index, 0])
    setIsOpen(true)
  }
  const handleClose = () => setIsOpen(false)

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page)

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  useKeyPressEvent('ArrowRight', () => {
    scrollIsEnabled && paginate(1)
  })

  useKeyPressEvent('ArrowLeft', () => {
    scrollIsEnabled && paginate(-1)
  })

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="full">
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent
          onClick={handleClose}
          background="none"
          overflow="hidden"
          my={0}
          border="none"
          height="100vh"
        >
          <ModalHeader color="white" fontSize="xl">
            <Text display="inline" sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {imageIndex + 1}
            </Text>{' '}
            of{' '}
            <Text display="inline" sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {images.length}
            </Text>
          </ModalHeader>
          <ModalCloseButton color="white" zIndex={1} />
          <Box
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100vw"
            height="100vh"
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={page}
                src={images[imageIndex]?.src}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                onClick={(e) => {
                  e.stopPropagation()
                }}
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag={scrollIsEnabled ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x)

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1)
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1)
                  }
                }}
                style={{
                  position: 'absolute',
                  maxWidth: '95vw',
                  maxHeight: '95%',
                }}
              />
            </AnimatePresence>
            {scrollIsEnabled && (
              <>
                <NavControl
                  boxShadow="lg"
                  right={4}
                  onClick={(e) => {
                    e.stopPropagation()
                    paginate(1)
                  }}
                >
                  <FaChevronRight />
                </NavControl>
                <NavControl
                  boxShadow="lg"
                  left={4}
                  onClick={(e) => {
                    e.stopPropagation()
                    paginate(-1)
                  }}
                >
                  <FaChevronLeft />
                </NavControl>
              </>
            )}
          </Box>
        </ModalContent>
      </Modal>
      {children({ open: handleOpen })}
    </>
  )
}

const NavControl = ({ children, ...rest }: BoxProps) => (
  <Box
    top="calc(50% - 20px)"
    position="absolute"
    background="white"
    borderRadius="30px"
    width="40px"
    height="40px"
    display="flex"
    justifyContent="center"
    alignItems="center"
    userSelect="none"
    cursor="pointer"
    fontWeight="bold"
    zIndex="2"
    {...rest}
  >
    {children}
  </Box>
)
