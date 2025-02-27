import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader
} from '@material-ui/core'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { apiRequest } from '@/utils/apiDefaults'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

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
  name: '',
  code: '',
  parent: { id: '' }
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  code: Yup.string().required('Required'),
  parent: Yup.object().shape({
    id: Yup.number().optional() // parent ID optional
  })
})

export const MaterialGroupForm = (props: FormMaterialGroupProps) => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  // API isteği için mutate
  const { mutateAsync } = useMutation({
    mutationFn: (values) =>
      apiRequest({
        endpoint: 'materialGroupAdd',
        payload: values,
        method: 'POST'
      }),
    onSuccess: () => {
      toast.success(t('Material Group Created Successfully'))
    },
    onError: (error) => {
      toast.error(t('Error Creating Material Group'))
      console.error('Error:', error)
    }
  })

  const onSubmit = async (values: any) => {
    const payload = { ...values }

    const parentId = values.parent.id ? Number(values.parent.id) : undefined

    if (!parentId) {
      delete payload.parent
    } else {
      payload.parent = { id: parentId }
    }
    await mutateAsync(payload)
  }

  return (
    <Grid container justifyContent="center">
      <Grid item md={6}>
        <Card className={classes.padding}>
          <CardHeader title="Material Group Form" />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ dirty, isValid }) => (
              <Form>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        label="Name"
                        variant="outlined"
                        fullWidth
                        name="name"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        label="Code"
                        variant="outlined"
                        fullWidth
                        name="code"
                        component={TextField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {/* Parent optional alanı */}
                      <Field
                        label="Parent ID"
                        variant="outlined"
                        fullWidth
                        name="parent.id"
                        component={TextField}
                        type="number"
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