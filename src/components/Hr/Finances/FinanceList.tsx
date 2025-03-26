import { BaseTable } from '@/components/Common/Table/BaseTable'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { PaymentType } from '@/components/Hr/Finances/typesFinance'
import { useTranslation } from 'react-i18next'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { DateRangeForm } from '@/components/Hr/Finances/components/DateRangeForm'
import { FilterOperators } from '@/utils/filterOperators'
import * as yup from 'yup'
import { enumToOptions } from '@/utils/transformers'
import { EmployeePaymentProps } from '@/components/Hr/typesHr'
import { t } from 'i18next'
import { InferType } from 'yup'

const validationSchema = yup.object({
  reportStartDate: yup.string().required(),
  reportEndDate: yup.string().required()
})

export type ReportDateRange = InferType<typeof validationSchema>

const initialDateRange: ReportDateRange = {
  reportStartDate: '',
  reportEndDate: ''
}

export const FinanceList = () => {
  const { t: nav } = useTranslation('nav')
  const [reportRange, setReportRange] = useState('')

  const paymentTypeOptions = enumToOptions(PaymentType)

  const columns = useMemo<ColumnDef<EmployeePaymentProps>[]>(
    () => [
      {
        header: t('common:name'),
        accessorKey: 'employee.name'
      },
      {
        header: t('common:surname'),
        accessorKey: 'employee.surname'
      },
      {
        header: t('common:department'),
        accessorKey: 'employee.department',
        accessorFn: (row) => row.employee?.department.name,
        meta: {
          filterVariant: 'select',
          filterOptionsEndpoint: 'departments'

        }
      },
      {
        header: t('common:companyBranch'),
        accessorKey: 'companyBranch',
        accessorFn: (row) => row.employee?.companyBranch.name,
        meta: {
          filterVariant: 'select',
          filterOptionsEndpoint: 'branches'
        }
      },
      {
        header: t('common:paymentType'),
        accessorKey: 'paymentType',
        accessorFn: (row) => t(`common:${row.paymentType}`),
        enableSorting: false,
        meta: {
          filterVariant: 'enum',
          filterOptions: paymentTypeOptions
        }
      },
      {
        header: t('common:date'),
        accessorKey: 'paymentDate',
        enableColumnFilter: false,
        enableSorting: false
      },
      {
        header: t('common:amount'),
        accessorKey: 'amount',
        cell: ({ row }) => {
          const { amount, amountCurrency } = row.original
          return `${amount} ${amountCurrency}`
        },
        enableColumnFilter: false
      },
      {
        header: t('common:description'),
        accessorKey: 'description',
        enableSorting: false
      }
    ],
    [paymentTypeOptions]
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
