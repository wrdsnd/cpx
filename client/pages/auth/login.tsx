import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react'
import { Spacer } from 'components'
import Head from 'next/head'
import { useUser } from 'providers/User'
import { useState } from 'react'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const user = useUser()

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Flex justify="center" mt="24">
        <VStack minW="sm" align="left">
          <Heading>Login</Heading>
          <Spacer h={4} />
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e: any) => {
                setEmail(e.target.value)
              }}
            />
          </FormControl>
          <Spacer h={2} />
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e: any) => {
                setPassword(e.target.value)
              }}
            />
          </FormControl>
          <Spacer h={2} />
          <Button
            colorScheme="pink"
            onClick={() => {
              user.login(email, password)
            }}
          >
            Sign in
          </Button>
        </VStack>
      </Flex>
    </>
  )
}

export default LoginPage
