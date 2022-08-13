import { ReactNode } from 'react'
import { Container, useDisclosure } from '@chakra-ui/react'
import { Spacer } from './Spacer'
import { PostEditorModal } from './PostEditorModal'
import { Topbar } from './Topbar'

type Props = {
  children: ReactNode
}
export const WorkspaceLayout = ({ children }: Props) => {
  const {
    isOpen: isEditorOpen,
    onClose: onEditorClose,
    onOpen: onEditorOpen,
  } = useDisclosure()

  return (
    <Container width="100%" maxW={1060} px={4} margin="0 auto">
      {isEditorOpen && (
        <PostEditorModal isOpen={isEditorOpen} onClose={onEditorClose} />
      )}
      <Spacer height={5} />
      <Topbar onNewPostClick={onEditorOpen} />
      <Spacer height={10} />
      {children}
    </Container>
  )
}
