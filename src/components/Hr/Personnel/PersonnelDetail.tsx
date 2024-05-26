import { Box, Tab, Tabs } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { FormPersonnelDetail } from '@/components/Hr/Personnel/FormPersonnelDetail'
import { personnelSchema } from '@/components/Hr/Personnel/schemaPersonnel'
import { useMutation } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { apiRoutes } from '@/utils/apiRoutes'
import { PersonnelData } from '@/components/Hr/Personnel/typesPersonnel'

const personnel = {
  fullName: '',
  email: '',
  address: '',
  title: '',
  startDate: null
}

export const PersonnelDetail = () => {
  const { t: hr } = useTranslation('hr')
  const [value, setValue] = useState(0)

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const { mutateAsync } = useMutation({
    mutationFn: (values: PersonnelData) => apiRequest<PersonnelData>(apiRoutes.personnelCrud, 'POST', values)
  })

  const onFormSubmit = async (values: PersonnelData) => {
    console.log('values -->', values)
    await mutateAsync(values)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
        >
          <Tab label={hr('infoGeneral')} />
          <Tab label={hr('infoIdentity')} />
          <Tab label={hr('infoPayroll')} />
        </Tabs>
      </Box>
      <BaseForm
        initialValues={personnel}
        validationSchema={personnelSchema}
        component={<FormPersonnelDetail value={value} />}
        onSubmit={onFormSubmit}
      />
    </Box>
  )
}
