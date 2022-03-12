import { Text } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

export const Loading = () => (
  <Text
    p={4}
    display="inline-block"
    sx={{ animation: `${spin} 1s ease infinite` }}
  >
    (ಠ.ಠ)
  </Text>
)

export const Failed = () => <Text p={4}>(ノ°Д°）ノ︵ ┻━┻</Text>

export const NotFound = () => <Text p={4}>┐(￣ヘ￣;)┌</Text>
