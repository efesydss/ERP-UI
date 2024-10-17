import { Route as RouteDetail } from '@/routes/_authenticated/accounting/cashAccounts/$id'
import { Route as RouteList } from '@/routes/_authenticated/accounting/cashAccounts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { CashAccountResponse } from './typesCashAccount'
import { apiRequest } from '@/utils/apiDefaults'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { Container } from '@mui/material'
import { BaseForm } from '../Common/Form/BaseForm'
import { FormCashAccount } from './FormCashAccount'

export const CashAccountDetail = () => {
    const { id } = RouteDetail.useParams()
    const data = RouteDetail.useLoaderData()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
  
    const updateCashAccount = async (cashAccount: CashAccountResponse) => {
      return await apiRequest<CashAccountResponse>({
        endpoint: 'cashAccount',
        method: 'PUT',
        id,
        payload: cashAccount
      })
    }
  
    const { mutateAsync } = useMutation({
      mutationFn: updateCashAccount,
      onError: (err: AxiosError) => {
        console.log('mutateAsync', err)
      },
      onSuccess: () => {
        navigate({ to: RouteList.fullPath })
        queryClient.invalidateQueries({ queryKey: ['cashAccount'], refetchType: 'all' })
        toast.success('Cash Account Updated')
      }
    })
    
  
    const onFormSubmit = async (values: CashAccountResponse) => {
      await mutateAsync(values)
    }
  
    return (
      <Container>
        <BaseForm
          initialValues={data}
          component={<FormCashAccount cashAccountId={id} />}
          onSubmit={onFormSubmit}
        />
      </Container>
    )
  }