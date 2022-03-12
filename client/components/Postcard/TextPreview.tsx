import { Text, BoxProps } from '@chakra-ui/react'

export const TextPreview = (p: BoxProps) => (
  <Text
    style={{
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      display: '-webkit-box',
      textOverflow: 'ellipsis',
    }}
    {...p}
  />
)
