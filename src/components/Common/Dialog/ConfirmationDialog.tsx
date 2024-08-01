import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { useConfirmDialog } from '@/utils/hooks/useConfirmDialogContext'

export const ConfirmationDialog = () => {
  const { isDialogOpen, dialogTitle, dialogContent, dialogOnSubmit, dialogOnCancel, closeDialog } = useConfirmDialog()

  return (
    <Dialog
      open={isDialogOpen}
      onClose={closeDialog}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            dialogOnCancel()
            closeDialog()
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            dialogOnSubmit()
            closeDialog()
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
