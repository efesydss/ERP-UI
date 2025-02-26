import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem

} from '@material-ui/core'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { apiRequest } from '@/utils/apiDefaults'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'


interface FormMaterialGroupProps {
  materialGroupId?: number
}

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1)
  }
}))
const initialValues = {
  materialCode: '1.01.10',
  materialName: 'Efe Form Material',
  materialGroup: { id: 1 },  // materialGroup artık nesne olarak tanımlandı
  defaultUnit: 'KG',
  materialType: 'MAIN_MATERIAL',
  optimalLevel: 5,
  minimumLevel: 5,
  specialCode: 'SPEC525',
  shelfLocation: 'A1-001',
  materialCardUnits: [
    {
      id: 1,
      unit: 'KG',
      multiplier: 0
    }
  ]
}
const validationSchema = Yup.object().shape({
  materialCode: Yup.string().required('Required'),
  materialName: Yup.string().required('Required'),
  defaultUnit: Yup.string().required('Required'),
  materialType: Yup.string().required('Required'),
  optimalLevel: Yup.number().positive().required('Required'),
  minimumLevel: Yup.number().positive().required('Required'),
  specialCode: Yup.string().required('Required'),
  shelfLocation: Yup.string().required('Required')
})
export const MaterialGroupForm = (props: FormMaterialGroupProps) => {
  console.log(props)
  const classes = useStyles()

  const materialGroups = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' }
  ]


  const { mutateAsync } = useMutation({
    mutationFn: (values) =>
      apiRequest({
        endpoint: 'materialCardAdd',
        payload: values,
        method: 'POST'
      }),
    onSuccess: () => {
      toast.success('Material Created Successfully')
    },
    onError: (error) => {
      toast.error('Error Creating Material')
      console.error('Error:', error)
    }
  })

  const onSubmit = async (values: void) => {
    await mutateAsync(values)
    console.log('Payload:', values)
  }


  return (
    <Grid container justifyContent="center">
      <Grid item md={6}>
        <Card className={classes.padding}>
          <CardHeader title="Material Form" />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ dirty, isValid, values, handleChange, handleBlur }) => (
              <Form>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        label="Material Code"
                        variant="outlined"
                        fullWidth
                        name="materialCode"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        label="Material Name"
                        variant="outlined"
                        fullWidth
                        name="materialName"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Material Group</InputLabel>
                        <Field
                          name="materialGroup"
                          component={Select}
                          label="Material Group"
                        >
                          {materialGroups.map((group) => (
                            <MenuItem key={group.id} value={group.id}>
                              {group.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <Field
                        label="Default Unit"
                        variant="outlined"
                        fullWidth
                        name="defaultUnit"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        label="Material Type"
                        variant="outlined"
                        fullWidth
                        name="materialType"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        label="Optimal Level"
                        variant="outlined"
                        fullWidth
                        name="optimalLevel"
                        type="number"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        label="Minimum Level"
                        variant="outlined"
                        fullWidth
                        name="minimumLevel"
                        type="number"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        label="Special Code"
                        variant="outlined"
                        fullWidth
                        name="specialCode"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        label="Shelf Location"
                        variant="outlined"
                        fullWidth
                        name="shelfLocation"
                        component={TextField}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button
                    disabled={!dirty || !isValid}
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.button}
                  >
                    Submit
                  </Button>
                </CardActions>
              </Form>
            )}
          </Formik>
        </Card>
      </Grid>
    </Grid>
  )
}