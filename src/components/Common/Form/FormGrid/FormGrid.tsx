import { ReactNode } from 'react'
import { ContentWidths } from '@/components/Common/Form/FormGrid/typesFormGrid'
import { FormWrapper } from '@/components/Common/Form/FormGrid/stylesFormGrid'

interface FormGridProps {
  children: ReactNode | ReactNode[]
  widths?: ContentWidths
}

export const FormGrid = (props: FormGridProps) => {
  const { children, widths = 'full' } = props
  return <FormWrapper elementWidth={widths}>{children}</FormWrapper>
}
