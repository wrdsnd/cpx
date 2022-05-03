import { Button, Heading, Input, VStack } from '@chakra-ui/react'

const LoginPage = () => {
  return (
    <VStack align="left" mx="auto" maxW="360px">
      <Heading mt="16" mb="4">
        Sign-in
      </Heading>
      <Input type="password" placeholder="Token" />
      <Button colorScheme="blue" variant="solid">
        Submit
      </Button>
    </VStack>
  )
}

export default LoginPage
