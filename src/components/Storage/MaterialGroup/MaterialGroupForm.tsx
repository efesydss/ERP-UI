import React, { useEffect } from 'react'
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
import { Formik, Form, Field, useFormikContext } from 'formik'
import { TextField } from 'formik-material-ui'
import { apiRequest } from '@/utils/apiDefaults'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { BaseSelect } from '@/components/Common/Form/Select/BaseSelect'

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
  parent: { id: 0 }
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  code: Yup.string().required('Required')
})

export const MaterialGroupForm = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')
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

  interface FormValues {
    parent?: {
      id?: {
        id?: string;
      };
    };
  }

  const handleSubmit = async (values: FormValues) => {
    const fixedData = {
      ...values,
      parent: values.parent?.id?.id
        ? { id: values.parent.id.id }
        : { id: values.parent?.id }
    }

    console.log('Fixed Payload:', fixedData)
    const response = await mutateAsync(fixedData)
    console.log('API Response:', response)

  }

  const ValueHandler = () => {
    const { values, setFieldValue } = useFormikContext<FormValues>()

    useEffect(() => {
      if (values.parent) {
        setFieldValue('parent.id', values.parent.id)
      }
    }, [values.parent, setFieldValue])

    return null
  }

  return (
    <Grid container justifyContent="center">
      <Grid item md={6}>
        <Card className={classes.padding}>
          <CardHeader title="Material Group Form" />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ dirty, isValid }) => (
              <Form>
                <ValueHandler />
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

                      <BaseSelect name="parent.id" endpoint="materialGroupFlat" isGET />

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