import { gql } from '@apollo/client'
import { useLoginMutation } from 'hooks/graphql'
import Router from 'next/router'
import { createContext, useContext, ReactNode } from 'react'
import { useLocalStorage } from 'react-use'

gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      result
    }
  }
`

export type PersistableUserInfo = {
  isLoggedIn: boolean
}

type Login = (email: string, password: string) => void

type AuthActions = {
  login: Login
  logout: () => void
}

type UserInfo = PersistableUserInfo & AuthActions

type UserProviderProps = {
  children: ReactNode
}

export const UserContext = createContext<UserInfo | undefined>(undefined)

export const UserConsumer = ({
  children,
}: {
  children: (context: PersistableUserInfo) => ReactNode
}) => {
  return (
    <UserContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error('UserConsumer must be used within a UserProvider')
        }
        return children(context)
      }}
    </UserContext.Consumer>
  )
}

export const useUser = () => {
  const User = useContext(UserContext)

  if (typeof User === 'undefined') {
    throw new Error('useUser must be used within a UserProvider')
  }

  return User
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useLocalStorage<PersistableUserInfo>('user', {
    isLoggedIn: false,
  })

  const [runLogin] = useLoginMutation()

  const login: Login = async (email, password) => {
    runLogin({
      onCompleted: (data) => {
        const { result: isLoggedIn } = data.login
        if (isLoggedIn) {
          setUser({ isLoggedIn })
          Router.push('/')
        }
      },
      variables: { input: { email, password } },
    })
  }

  const logout = () => {
    setUser({ ...user, isLoggedIn: false })
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: user.isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
