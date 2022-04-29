import { Text } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { useState } from 'react'
import { useTimeoutFn } from 'react-use'

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

export const Loading = () => {
  const [isVisible, setIsVisible] = useState(false)
  useTimeoutFn(() => setIsVisible(true), 500)
  console.log(isVisible)

  if (!isVisible) {
    return <></>
  }

  return (
    <Text
      p={4}
      display="inline-block"
      sx={{ animation: `${spin} 1s ease infinite` }}
    >
      (ಠ.ಠ)
    </Text>
  )
}

export const Failed = () => <Text p={4}>(ノ°Д°）ノ︵ ┻━┻</Text>

export const NotFound = () => <Text p={4}>┐(￣ヘ￣;)┌</Text>
