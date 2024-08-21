import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { useConfirmDialog } from '@/utils/hooks/useConfirmDialogContext'
import { useTranslation } from 'react-i18next'

export const ConfirmationDialog = () => {
  const { isDialogOpen, dialogTitle, dialogContent, dialogOnSubmit, dialogOnCancel, closeDialog } = useConfirmDialog()

  const { t } = useTranslation()

  return (
    <Dialog
      open={isDialogOpen}
      onClose={closeDialog}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          size='small'
          onClick={() => {
            dialogOnCancel()
            closeDialog()
          }}
        >
          {t('common:cancel')}
        </Button>
        <Button
          variant={'contained'}
          size='small'
          color={'error'}
          onClick={() => {
            dialogOnSubmit()
            closeDialog()
          }}
        >
          {t('common:confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
