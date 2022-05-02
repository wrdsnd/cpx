import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalProps,
  Image,
  Flex,
  Text,
  Box,
} from '@chakra-ui/react'
import { Spacer } from 'components/Spacer'
import { Fragment, useState } from 'react'
import { Lightbox } from 'components/Lightbox'
import { PostMediaFragment } from 'types/graphql/schema'
import gql from 'graphql-tag'

type Props = {
  sourceMeta: PostMediaFragment
} & Pick<ModalProps, 'onClose'>

export const PostModal = ({ onClose, sourceMeta }: Props) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const moreThanOneImage = sourceMeta.media.length > 1

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg={['gray.50', 'white']}
        mt={[0, '8.75rem']}
        mb={[0, '3.75rem']}
        minH={['100vh', 'initial']}
        rounded={[null, 'lg']}
      >
        <ModalCloseButton right={2} />
        <Spacer h={10} />
        <ModalBody>
          <Box>
            <Flex flexDirection={['column-reverse', 'row']}>
              {moreThanOneImage && (
                <Flex
                  flexShrink={0}
                  w="3.75rem"
                  flexDirection={['row', 'column']}
                >
                  {sourceMeta.media.map((image, index) => (
                    <Fragment key={index}>
                      <Image
                        cursor="pointer"
                        w="100%"
                        objectFit="cover"
                        h="3.75rem"
                        minW="3.75rem"
                        rounded="lg"
                        src={image.src}
                        onClick={() => setSelectedImageIndex(index)}
                        alt=""
                      />
                      {index !== sourceMeta.media.length && (
                        <Spacer flexShrink={0} h={3} w={3} />
                      )}
                    </Fragment>
                  ))}
                </Flex>
              )}
              {moreThanOneImage && (
                <Spacer flexShrink={0} h="1.875rem" w="1.875rem" />
              )}
              <Lightbox images={sourceMeta.media}>
                {({ open }) => (
                  <Image
                    w="100%"
                    onClick={() => open(selectedImageIndex)}
                    rounded="lg"
                    src={sourceMeta.media[selectedImageIndex].src}
                    objectFit="contain"
                    bg="gray.300"
                    minH="21.25rem"
                    maxH="21.25rem"
                    overflow="hidden"
                    alt=""
                  />
                )}
              </Lightbox>
            </Flex>
          </Box>
          <Spacer h={4} />
          <Text color="gray.700">{sourceMeta.text}</Text>
          <Spacer h={4} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

PostModal.fragments = {
  media: gql`
    fragment PostMedia on SourceMeta {
      id
      media {
        src
      }
      text
    }
  `,
}
