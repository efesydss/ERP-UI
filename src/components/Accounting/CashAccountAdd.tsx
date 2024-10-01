import { useNavigate } from "@tanstack/react-router";
import { Currency } from "../Hr/Employees/typesEmployee";
import { CashAccountResponse } from "./typesCashAccount";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/utils/apiDefaults";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Route } from '@/routes/_authenticated/accounting/cashAccounts'
import { capitalizeFirstLetter } from "@/utils/transformers";
import { PageTitle } from "../Common/PageTitle/PageTitle";
import { BaseForm } from "../Common/Form/BaseForm";
import { Container } from "@mui/material";
import { FormCashAccount } from "./FormCashAccount";
import { t } from "i18next";


const initialCashAccount: CashAccountResponse = {
  id: 0,
  code: '',
  name: '',
  currency: Currency.TRY
}

export const CashAccountAdd = () => {

  const navigate = useNavigate()

  const { mutateAsync } = useMutation({
    mutationFn: (values: CashAccountResponse) =>
      apiRequest({
        endpoint: 'cashAccount',
        payload: values
      }),
    onSuccess: () => {
      navigate({ to: Route.fullPath })
      toast.success('Cash Account Created')
    },
    onError: (
      err: AxiosError<{
        err?: string
      }>
    ) => {
      if (err.response?.status === 409) {
        console.log(err.response)
        console.log(err.cause)
        toast.error('exist')
      } else {
        toast.error('error'+err.cause)
        console.log(err.response)
        console.log(err.request)
        console.log(err.code)
        console.log(err.message)
        console.log(err.status)

      }
    }
  })

  const onFormSubmit = async (values: CashAccountResponse) => {
    console.log('Form values before mutation:', values);

    //TODO ef : buraya değerler boş geliyor.
    await mutateAsync({
      ...values,
      name: capitalizeFirstLetter(values.name),
      code: capitalizeFirstLetter(values.code),
      currency: values.currency,

    })
  }
  return (
    <>
      <PageTitle title={t('common:newCashAccount')} />
      <Container>
        <BaseForm
          initialValues={initialCashAccount}
          component={<FormCashAccount />}
          onSubmit={onFormSubmit}
        />
      </Container>
    </>
  )
}