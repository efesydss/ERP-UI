import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { Divider } from '@mui/material'

export const FormEmployeeTimeKeeping = () => {
  return (
    <>
      <FormGrid widths={'forth'}>
        <Input
          name={'netSalary'}
          nameSpace={'hr'}
        />
        <Input
          name={'normalWorkingDays'}
          nameSpace={'hr'}
        />
        <Input
          name={'weekendWorkingDays'}
          nameSpace={'hr'}
        />
        <Input
          name={'unpaidTimeOffHours'}
          nameSpace={'hr'}
        />
      </FormGrid>
      <Divider sx={{ my: 4 }} />
    </>
  )
}
