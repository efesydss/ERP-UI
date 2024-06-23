import { ErrorMessage, LabelWrapper } from '@/components/Common/Form/stylesForm'
import { useTranslation } from 'react-i18next'

interface LabelProps {
  name: string
  hasError: boolean
  errorMessage?: string
  nameSpace?: string
  label?: string
}

export const Label = (props: LabelProps) => {
  const { name, nameSpace, errorMessage, label, hasError = false } = props
  const { t } = useTranslation(nameSpace || 'common')
  return (
    <LabelWrapper>
      <label htmlFor={name}>{label || t(name)}</label>
      {hasError && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </LabelWrapper>
  )
}
