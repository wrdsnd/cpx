import { IconButton, IconButtonProps } from '@chakra-ui/react'

export const ActionIconButton = (p: IconButtonProps) => (
  <IconButton
    color="gray.400"
    variant="link"
    height={5}
    minWidth="unset"
    width={5}
    _hover={{
      color: 'pink.300',
    }}
    title={p['aria-label']}
    {...p}
  />
)
