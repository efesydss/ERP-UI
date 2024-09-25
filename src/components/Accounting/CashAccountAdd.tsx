import { useTranslation } from "react-i18next"
import { FormGrid } from "../Common/Form/FormGrid/FormGrid"
import { Box, Button, Input } from "@mui/material"
import { Route } from '@/routes/_authenticated/accounting/cashAccounts'
import { useNavigate } from '@tanstack/react-router'

export const FormCashAccountAdd = ()=>{
    const { t:common } = useTranslation('common')
    const navigate = useNavigate()

    return (
        <>
        <FormGrid>

        <FormGrid widths={'half'}>
        <Input
        name={'code'}
        type={'string'}
        />
        
            <Input
              name={'name'}
              type={'string'}
            />
              <Input
              name={'currency'}
              type={'string'}
            />
           
        </FormGrid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button
          type={'button'}
          variant={'outlined'}
          onClick={() => {
            navigate({ to: Route.fullPath })
          }}
        >
          {common('cancel')}
        </Button>
        <Button
          type={'submit'}
          color={'primary'}
          variant={'contained'}
        >
          {common('save')}
        </Button>
      </Box>
        </FormGrid>
        </>
    )
}