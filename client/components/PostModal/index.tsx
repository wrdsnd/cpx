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
  BoxProps,
} from '@chakra-ui/react'
import { Spacer } from 'components/Spacer'
import { Fragment, useState } from 'react'
import { Lightbox } from 'components/Lightbox'
import gql from 'graphql-tag'
import { MediaType, PostModalDataFragment } from 'types/graphql/schema'
import { ImageProps } from 'next/image'

type Props = {
  post: PostModalDataFragment
} & Pick<ModalProps, 'onClose'>

export const PostModal = ({ onClose, post }: Props) => {
  const [selectedMediaIndex, setSelectedImageIndex] = useState(0)
  const moreThanOneImage = post.media.length > 1

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
                  {post.media.map((image, index) => (
                    <Fragment key={index}>
                      <Image
                        cursor="pointer"
                        w="100%"
                        objectFit="cover"
                        h="3.75rem"
                        minW="3.75rem"
                        rounded="lg"
                        src={image.url}
                        onClick={() => setSelectedImageIndex(index)}
                        alt=""
                      />
                      {index !== post.media.length && (
                        <Spacer flexShrink={0} h={3} w={3} />
                      )}
                    </Fragment>
                  ))}
                </Flex>
              )}
              {moreThanOneImage && (
                <Spacer flexShrink={0} h="1.875rem" w="1.875rem" />
              )}
              <Lightbox images={post.media}>
                {({ open }) => {
                  const commonProps: BoxProps | ImageProps = {
                    w: '100%',
                    rounded: 'lg',
                    onClick: () => open(selectedMediaIndex),
                    objectFit: 'contain',
                    bg: 'gray.300',
                    minH: '21.25rem',
                    maxH: '21.25rem',
                    overflow: 'hidden',
                  }

                  switch (post.media[selectedMediaIndex].type) {
                    case MediaType.IMAGE: {
                      return (
                        <Image
                          alt=""
                          src={post.media[selectedMediaIndex].url}
                          {...commonProps}
                        />
                      )
                    }
                    case MediaType.VIDEO: {
                      return (
                        <Box
                          as="video"
                          loop
                          autoPlay
                          muted
                          playsInline
                          disablePictureInPicture
                          src={post.media[selectedMediaIndex].url}
                          {...commonProps}
                        />
                      )
                    }
                  }
                }}
              </Lightbox>
            </Flex>
          </Box>
          <Spacer h={4} />
          <Text color="gray.700">{post.content}</Text>
          <Spacer h={4} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

PostModal.fragments = {
  data: gql`
    fragment PostModalData on Post {
      content
      media {
        id
        url
        type
        createdAt
      }
    }
  `,
}
