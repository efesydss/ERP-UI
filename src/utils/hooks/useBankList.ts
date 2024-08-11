import { useQuery } from '@tanstack/react-query'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { Bank } from '@/components/Hr/Finances/typesFinance'

export const useBankList = () => {
  const { data: bankList, isLoading: isBankListLoading } = useQuery({
    queryKey: ['bankList'],
    queryFn: () =>
      apiRequest<ApiResponse<Bank>>({
        endpoint: 'banks',
        payload: {
          filter: '',
          page: 0,
          pageSize: 200
        }
      }),
    select: (res) => res.data
  })

  return { bankList, isBankListLoading }
}
