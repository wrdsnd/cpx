import { useRouter } from 'next/router'
import { PersistableUserInfo } from 'providers/User'
import { DependencyList, useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'

type UseAccessConfig = {
  isReadyToCheck: boolean
  checkAccess: () => boolean
  onSuccess?: () => void
  onReject?: () => void
}

export const useAccess = (
  { isReadyToCheck, checkAccess, onSuccess, onReject }: UseAccessConfig,
  deps: DependencyList,
) => {
  const [accessGranted, setAccessIsGranted] = useState(false)

  useEffect(() => {
    if (isReadyToCheck) {
      if (checkAccess()) {
        setAccessIsGranted(true)
        onSuccess && onSuccess()
      } else {
        onReject && onReject()
      }
    }
  }, [isReadyToCheck, ...deps])

  return accessGranted
}

export const useAuthAccess = ({
  onSuccess,
}: Omit<UseAccessConfig, 'checkAccess' | 'isReadyToCheck'> = {}) => {
  const router = useRouter()
  const [user] = useLocalStorage<PersistableUserInfo>('user')

  const isAuthenticated = useAccess(
    {
      onSuccess,
      isReadyToCheck: typeof window !== 'undefined',
      checkAccess: () => user?.isLoggedIn,
      onReject: () => {
        router.push('/auth/login')
      },
    },
    [user],
  )

  return [isAuthenticated]
}
