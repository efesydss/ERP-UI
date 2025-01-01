import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Row } from '@tanstack/react-table'
import { DepotResponse } from './typesDepot'
import { apiRequest } from '@/utils/apiDefaults'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { FormDepot } from './FormDepot'
import { Route } from '@/routes'

interface DetailsSubRowProps<TData> {
  depotId?: number
  row?: Row<TData>
  handleExpandRow?: (e: MouseEvent | null, rowId: string) => void
}

export const DetailsSubRow = <TData, >(props: DetailsSubRowProps<TData>) => {
  const { depotId, handleExpandRow, row } = props
  const queryClient = useQueryClient()
  console.log(queryClient.getQueryData(['depots']))
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['depotDetails', depotId],
    queryFn: () =>
      apiRequest<DepotResponse>({
        endpoint: 'depot',
        method: 'GET',
        id: depotId
      }),
    enabled: !!depotId


  })
  console.log('API Response:', data)
  const updateDepot = async (depot: DepotResponse) => {
    console.log(depot)
    return await apiRequest<DepotResponse>({
      endpoint: 'depot',
      method: 'PUT',
      id: depotId,
      payload: depotId
    })
  }

  const { mutateAsync } = useMutation({
    mutationFn: updateDepot,
    onError: (err: AxiosError) => {
      console.log('mutateAsync', err)
    },
    onSuccess: (data) => {
      navigate({ to: Route.fullPath })
      queryClient.invalidateQueries({ queryKey: ['depots'], refetchType: 'all' })
      toast.success(`${data.name} ${data.id} güncellendi`)
      if (row && handleExpandRow) {
        handleExpandRow(null, row.id)
      }
    }
  })

  const onFormSubmit = async (values: DepotResponse) => {
    console.log('values -->', values)

    await mutateAsync(values)
  }

  if (!data) {
    return null
  }

  return (
    <>
      <BaseForm<DepotResponse>
        initialValues={data}
        //validationSchema={depotValidationScheme}
        component={<FormDepot />}
        onSubmit={onFormSubmit}
      />
    </>
  )
}
