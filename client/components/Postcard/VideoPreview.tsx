import { Box, BoxProps } from '@chakra-ui/react'
import { DetailedHTMLProps, VideoHTMLAttributes } from 'react'

type VideoPreviewProps = Pick<
  DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>,
  'src'
> &
  Pick<BoxProps, 'onClick'>

export const VideoPreview = ({ src, onClick }: VideoPreviewProps) => (
  <Box
    rounded="lg"
    height="220px"
    position="relative"
    cursor="pointer"
    overflow="hidden"
    onClick={onClick}
    dangerouslySetInnerHTML={{
      // React's <video /> doesn't output "muted" attribute in HTML and it causes issues with autoplay in Safari
      __html: `
        <video
          loop
          muted
          autoplay
          playsinline
          preload="auto"
          src=${src}
          style="width: 100%; height: 100%; object-fit: cover;"
        />
    `,
    }}
  ></Box>
)
