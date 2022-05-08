import { Box, BoxProps } from '@chakra-ui/react'
import Image, { ImageProps } from 'next/image'

type ImagePreviewProps = Pick<ImageProps, 'src' | 'alt'> &
  Pick<BoxProps, 'onClick'>

export const ImagePreview = ({ src, onClick, alt }: ImagePreviewProps) => (
  <Box
    rounded="lg"
    height="220px"
    position="relative"
    cursor="pointer"
    overflow="hidden"
    onClick={onClick}
  >
    <Image
      src={src}
      alt={alt}
      layout="fill"
      objectFit="cover"
      draggable="false"
    />
  </Box>
)
