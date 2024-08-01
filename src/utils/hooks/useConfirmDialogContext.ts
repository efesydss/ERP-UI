import { useContext } from 'react'
import { ConfirmDialogContext, ConfirmDialogContextProps } from '@/utils/providers/ConfirmDialogContext/ConfirmDialogContext'

export const useConfirmDialog = (): ConfirmDialogContextProps => useContext(ConfirmDialogContext)
