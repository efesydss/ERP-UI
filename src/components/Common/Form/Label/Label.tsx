import { ErrorMessage, LabelWrapper } from '@/components/Common/Form/stylesForm'
import { useTranslation } from 'react-i18next'

interface LabelProps {
  name: string
  hasError: boolean
  errorMessage?: string
  nameSpace?: string
  label?: string
  isOptional?: boolean
}

export const Label = (props: LabelProps) => {
  const { name, nameSpace, errorMessage, label, hasError = false, isOptional = false } = props
  const { t } = useTranslation(nameSpace || 'common')

  console.log('name -->', name, label)

  return (
    <LabelWrapper>
      <label htmlFor={name}>
        {label || t(name)} {!isOptional && '*'}
      </label>
      {hasError && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </LabelWrapper>
  )
}
