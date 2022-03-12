import * as React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Flex, Box, BoxProps, Text, forwardRef } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useInterval } from 'react-use'
import { UrlObject } from 'url'
import { DateTime } from 'luxon'
import { Spacer } from './Spacer'

type TopbarProps = {
  onNewPostClick: BoxProps['onClick']
}

export const Topbar = ({ onNewPostClick }: TopbarProps) => {
  const router = useRouter()
  const currentDate = React.useRef<string>(DateTime.local().toISODate())

  useInterval(() => {
    currentDate.current = DateTime.local().toISODate()
  }, 5000)

  const menuOptions = React.useMemo(
    (): {
      label: string
      href: UrlObject | string
      isActive: boolean
    }[] => [
      {
        label: 'Feed',
        href: '/feed',
        isActive: router.pathname === '/feed',
      },
      {
        label: 'Queue',
        href: {
          pathname: '/queue/[date]',
          query: { date: currentDate.current },
        },
        isActive: router.pathname === '/queue/[date]',
      },
      {
        label: 'Drafts',
        href: '/drafts',
        isActive: router.pathname === '/drafts',
      },
    ],
    [currentDate, router.pathname],
  )

  return (
    <Box>
      <Spacer height={5} />
      <Box as="nav" justifyContent="center">
        <Flex justify="space-between">
          <Flex align="center">
            {menuOptions.map((menuOption, index) => (
              <Link href={menuOption.href} passHref key={index}>
                <Box
                  as="a"
                  lineHeight="none"
                  minWidth="6.25rem"
                  textAlign="center"
                  fontSize="md"
                  key={menuOption.label}
                  py={3}
                  px={2}
                  color="gray.700"
                  cursor="pointer"
                  borderBottom="1px solid"
                  borderBottomColor={
                    menuOption.isActive ? 'pink.300' : 'transparent'
                  }
                  _hover={{
                    color: 'pink.300',
                  }}
                >
                  <MenuItemLabel>{menuOption.label}</MenuItemLabel>
                </Box>
              </Link>
            ))}
          </Flex>
          <NewPostButton onClick={onNewPostClick} />
        </Flex>
      </Box>
    </Box>
  )
}

const NewPostButton = ({ onClick }: BoxProps) => (
  <Box
    onClick={onClick}
    cursor="pointer"
    bg="red.100"
    color="gray.700"
    rounded="lg"
    py={3}
    px={5}
    _hover={{
      bg: 'red.200',
    }}
  >
    <Flex align="center">
      <AddIcon boxSize="1rem" color="pink.300" />
      <Box width="23px" display={['none', 'initial']} />
      <Text
        display={['none', 'initial']}
        textTransform="uppercase"
        fontSize="md"
        lineHeight="none"
      >
        New post
      </Text>
    </Flex>
  </Box>
)

type MenuItemLabelProps = {
  isActive?: boolean
  children: React.ReactNode
} & BoxProps

const MenuItemLabel = forwardRef(
  ({ isActive = false, ...rest }: MenuItemLabelProps, ref) => (
    <Box
      ref={ref}
      fontSize="md"
      textDecoration="none"
      textTransform="uppercase"
      lineHeight="none"
      {...rest}
    />
  ),
)
