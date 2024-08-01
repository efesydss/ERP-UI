import { createContext } from 'react'

export interface ConfirmDialogContextProps {
  isDialogOpen: boolean
  dialogTitle: string
  dialogContent: string
  dialogOnSubmit: () => void
  dialogOnCancel: () => void
  openDialog: (title: string, content: string, onSubmit: () => void, onCancel: () => void) => void
  closeDialog: () => void
}

export const confirmDialogInitials: ConfirmDialogContextProps = {
  isDialogOpen: false,
  dialogTitle: '',
  dialogContent: '',
  dialogOnSubmit: () => {},
  dialogOnCancel: () => {},
  openDialog: () => {},
  closeDialog: () => {}
}

export const ConfirmDialogContext = createContext<ConfirmDialogContextProps>(confirmDialogInitials)
