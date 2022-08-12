import { Text, Link, LinkProps } from '@chakra-ui/react'

type SourceLinkProps = {
  href: string
} & LinkProps

export const SourceLink = ({ children, href }: SourceLinkProps) => (
  <Link
    as="a"
    href={href}
    onClick={(e) => e.stopPropagation()}
    color="blue.400"
    target="_blank"
    _hover={{ cursor: 'pointer', color: 'pink.300' }}
  >
    <Text fontSize="md" maxW="160" isTruncated>
      {children}
    </Text>
  </Link>
)
