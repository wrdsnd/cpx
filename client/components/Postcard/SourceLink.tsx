import { Text, Link, LinkProps } from '@chakra-ui/react'

type SourceLinkProps = {
  href: string
} & LinkProps

export const SourceLink = ({ children, href }: SourceLinkProps) => (
  <Link
    as="a"
    href={href}
    color="blue.400"
    _hover={{ cursor: 'pointer', color: 'pink.300' }}
  >
    <Text fontSize="md" maxW="160" isTruncated>
      {children}
    </Text>
  </Link>
)
