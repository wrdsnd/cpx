import { Box, BoxProps } from '@chakra-ui/react'

export const Postcard = (p: BoxProps) => (
  <Box
    rounded="lg"
    p={3}
    pb={5}
    height={346}
    bg="gray.50"
    border="1px solid"
    borderColor="transparent"
    _hover={{
      border: '1px solid',
      borderColor: 'gray.400',
    }}
    {...p}
  />
)
