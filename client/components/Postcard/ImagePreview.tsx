import { Image, ImageProps } from '@chakra-ui/react'

export const ImagePreview = (p: ImageProps) => (
  <Image
    w="100%"
    height="220px"
    rounded="lg"
    objectFit="cover"
    draggable={false}
    fallbackSrc="https://via.placeholder.com/150"
    {...p}
  />
)
