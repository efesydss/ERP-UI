import { PropsWithChildren, useMemo, useState } from 'react'
import { ConfirmDialogContext, confirmDialogInitials } from '@/utils/providers/ConfirmDialogContext/ConfirmDialogContext'

export const ConfirmDialogProvider = (props: PropsWithChildren) => {
  const [isDialogOpen, setIsDialogOpen] = useState(confirmDialogInitials.isDialogOpen)
  const [dialogTitle, setDialogTitle] = useState(confirmDialogInitials.dialogTitle)
  const [dialogContent, setDialogContent] = useState(confirmDialogInitials.dialogContent)
  const [dialogOnSubmit, setDialogOnSubmit] = useState<() => void>(confirmDialogInitials.dialogOnSubmit)
  const [dialogOnCancel, setDialogOnCancel] = useState<() => void>(confirmDialogInitials.dialogOnCancel)

  const openDialog = (title: string, content: string, onSubmit: () => void, onCancel: () => void) => {
    setDialogTitle(title)
    setDialogContent(content)
    setDialogOnSubmit(() => onSubmit)
    setDialogOnCancel(() => onCancel)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  const value = useMemo(
    () => ({
      isDialogOpen,
      dialogTitle,
      dialogContent,
      dialogOnSubmit,
      dialogOnCancel,
      openDialog,
      closeDialog
    }),
    [dialogContent, dialogOnCancel, dialogOnSubmit, dialogTitle, isDialogOpen]
  )

  return <ConfirmDialogContext.Provider value={value}>{props.children}</ConfirmDialogContext.Provider>
}
