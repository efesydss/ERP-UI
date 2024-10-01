import { useNavigate } from "@tanstack/react-router";
import { Currency } from "../Hr/Employees/typesEmployee";
import { CashAccountResponse } from "./typesCashAccount";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/utils/apiDefaults";
import { values } from "lodash";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Route } from '@/routes/_authenticated/hr/employees'
import { capitalizeFirstLetter } from "@/utils/transformers";
import { PageTitle } from "../Common/PageTitle/PageTitle";
import { BaseForm } from "../Common/Form/BaseForm";
import { Container } from "@mui/material";

/*id?: number
    code: string
    name: string
    currency: Currency*/
const initialCashAccount: CashAccountResponse = {
  id: 0,
  code: '',
  name: '',
  currency: Currency.TRY
}

export const CashAccountAdd = () => {

  const navigate = useNavigate()

  const { mutateAsync } = useMutation({
    mutationFn: (value: CashAccountResponse) =>
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
        toast.error('exists')
      } else {
        toast.error('error')
      }
    }
  })

  const onFormSubmit = async (values: CashAccountResponse) => {
    await mutateAsync({
      ...values,
      name: capitalizeFirstLetter(values.name),
      code: capitalizeFirstLetter(values.code)

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