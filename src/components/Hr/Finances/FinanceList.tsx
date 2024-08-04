import { BaseTable } from '@/components/Common/Table/BaseTable'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { EmployeePayment, PaymentTypes } from '@/components/Hr/Finances/typesFinance'
import { useTranslation } from 'react-i18next'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { DateRangeForm } from '@/components/Hr/Finances/components/DateRangeForm'
import { FilterOperators } from '@/utils/filterOperators'
import * as yup from 'yup'
import { enumToOptions } from '@/utils/transformers'

export interface ReportDateRange {
  reportStartDate: string
  reportEndDate: string
}

const initialDateRange: ReportDateRange = {
  reportStartDate: '',
  reportEndDate: ''
}

const validationSchema = yup.object({
  reportStartDate: yup.string().required(),
  reportEndDate: yup.string().required()
})

export const FinanceList = () => {
  const { t: hr } = useTranslation('hr')
  const { t: common } = useTranslation('common')
  const { t: nav } = useTranslation('nav')
  const [reportRange, setReportRange] = useState('')

  const paymentTypeOptions = enumToOptions(PaymentTypes)

  const columns = useMemo<ColumnDef<EmployeePayment>[]>(
    () => [
      {
        header: hr('paymentType'),
        accessorKey: 'paymentType',
        enableSorting: false,
        meta: {
          filterVariant: 'enum',
          filterOptions: paymentTypeOptions
        }
      },
      {
        header: common('date'),
        accessorKey: 'paymentDate',
        enableColumnFilter: false
      },
      {
        header: common('amount'),
        accessorKey: 'amount',
        cell: ({ row }) => {
          const { amount, amountCurrency } = row.original
          return `${amount} ${amountCurrency}`
        },
        enableColumnFilter: false
      },
      {
        header: common('description'),
        accessorKey: 'description',
        enableSorting: false
      }
    ],
    [common, hr, paymentTypeOptions]
  )
  return (
    <>
      <PageTitle title={nav('finances')} />
      <BaseForm
        initialValues={initialDateRange}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const rangeFilter = `paymentDate${FilterOperators.between}(${values.reportStartDate},${values.reportEndDate})`
          setReportRange(rangeFilter)
        }}
        component={<DateRangeForm onResetForm={setReportRange} />}
      />
      <BaseTable
        endpoint={'employeePayments'}
        columns={columns}
        customFilter={reportRange}
      />
    </>
  )
}
