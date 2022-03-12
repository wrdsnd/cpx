import { ReactNode } from 'react'
import { Container, useDisclosure } from '@chakra-ui/react'
import { Spacer } from './Spacer'
import { EditorModal } from './EditorModal'
import { Topbar } from './Topbar'

type Props = {
  children: ReactNode
  editorDefaultMode?: 'DRAFT' | 'QUEUE'
}
export const WorkspaceLayout = ({
  editorDefaultMode = 'QUEUE',
  children,
}: Props) => {
  const {
    isOpen: isEditorOpen,
    onClose: onEditorClose,
    onOpen: onEditorOpen,
  } = useDisclosure()

  return (
    <Container width="100%" maxW={1060} px={4} margin="0 auto">
      {isEditorOpen && (
        <EditorModal
          isDraft={editorDefaultMode === 'DRAFT'}
          isOpen={isEditorOpen}
          onClose={onEditorClose}
        />
      )}
      <Spacer height={5} />
      <Topbar onNewPostClick={onEditorOpen} />
      <Spacer height={10} />
      {children}
    </Container>
  )
}
