const fs = require('fs');
const path = require('path');
const readline = require('readline');

const targetDir = process.argv[2];

if (!targetDir) {
  console.error('Hedef klasör belirtilmedi. Lütfen betiği doğru şekilde çalıştırın.');
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Lütfen ENTITY adını girin: ', (entityName) => {
  if (!entityName) {
    console.error('ENTITY adı boş bırakılamaz.');
    rl.close();
    process.exit(1);
  }

  const entityDir = path.join(targetDir, entityName);
  const typesDir = path.join(entityDir, 'types');

  try {
    if (!fs.existsSync(entityDir)) {
      fs.mkdirSync(entityDir);
    }

    if (!fs.existsSync(typesDir)) {
      fs.mkdirSync(typesDir);
    }

    // Template kodlar
    const typesTemplate = `export interface ChangeMe {
  id: number;

}`;

    const addTemplate = `import React from 'react';
import { apiRequest } from '@/utils/apiDefaults'
import { t } from 'i18next'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { Container } from '@mui/material'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseForm } from '@/components/Common/Form/BaseForm'

const initialChangeMe: ChangeMe = {
  id: 0,
  
}
  export const ChangeMeAdd = () => {
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
      mutationFn: (values: ChangeMe) =>
        apiRequest({
          endpoint: 'ChangeMeAdd',
          payload: values
        }),
      onSuccess: () => {
        navigate({ to: Route.fullPath })
        toast.success('ChangeMe Created')
      },
      onError: (
        err: AxiosError<{
          err?: string
        }>
      ) => {
        if (err.response?.status === 409) {
          console.log(err.response)
          toast.error('exist')
        } else {
          toast.error('error')
        }
      }
    })
    const onFormSubmit = async (values: ChangeMe) => {
      await mutateAsync({
        ...values
      })
      console.log('Payload: ', values)
    }
    return (
      <>
        <PageTitle title={t('common:ChangeMeAdd')} />
        <Container>
          <BaseForm
            initialValues={initialChangeMe}
            onSubmit={onFormSubmit}
            component={<ChangeMeForm />}
          />
        </Container>
      </>
    )
  }
`;

    const listTemplate = `
import { useTranslation } from 'react-i18next'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'

import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseTable } from '@/components/Common/Table/BaseTable'
import React, { useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useConfirmDialog } from '@/utils/hooks/useConfirmDialogContext'
import { apiRequest } from '@/utils/apiDefaults'
import { useMutation } from '@tanstack/react-query'
import { GridRowId } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'
import { ColumnDef } from '@tanstack/react-table'
export const ChangeMeList = () => {
  const { t } = useTranslation('common')
  const { openDialog } = useConfirmDialog()
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const handleDeleteClick = (id: GridRowId) => () =>
    openDialog(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      () => {
        deleteChangeMe(id.toString())
      },
      () => {
        console.log('Deletion cancelled')
      }
    )
    const safeAccessor = (accessorFn: (row: any) => any, columnName: string) => {
    return (row: any) => {
      try {
        const result = accessorFn(row)
        console.log(columnName, result)
        return result
      } catch (error) {
        console.error(error)
        return 'Error'
      }
    }
  }
  const { mutate: deleteChangeMe } = useMutation({
    mutationFn: async (ChangeMeId: string) => {
      return await apiRequest({
        endpoint: 'ChangeMeDelete',
        method: 'DELETE',
        params: { ChangeMeId: ChangeMeId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ChangeMes'] })
      toast.success('ChangeMe Deleted')
    }
  })
  
  const columns = useMemo<ColumnDef<ChangeMe>[]>(
    () => [
      {
        header: t('name'),
        accessorKey: 'name'
      },
      {
        header: t('code'),
        accessorKey: 'code'
      },
      {
        header: t('actions'),
        id: 'actions',
        cell: ({ row }) => (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleDeleteClick(row.original.id)}
          >
            {t('delete')}
          </Button>
        )
      }
    ],
    [t]
  )

  const ChangeMeListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newChangeMe')}
        </Button>
      </>
    )
  }
  const endpoint = 'ChangeMes'

  return (
    <>
      <PageTitle
        title={t('ChangeMeList')}
        actions={<ChangeMeListActions />}
      />

      <BaseTable<ChangeMe> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}`;

    const formTemplate = `import React from 'react';
import { useTranslation } from 'react-i18next'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { Box, Button, Paper } from '@mui/material'
import { FaCheck } from 'react-icons/fa6'
interface FormChangeMeProps {
  ChangeMeId?: number

}

export const ChangeMeForm = (props: FormChangeMeProps) => {
  console.log(props)
  const { t } = useTranslation()


  return (
    <>
      <Paper sx={{ p: 2 }}>
        <FormGrid
          widths={'half'}
          isContainer
        >
          <FormGrid>
            <Input name={'name'} />
            <Input name={'description'} />
          </FormGrid>

        </FormGrid>

      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          size={'small'}
          endIcon={<FaCheck />}
          type={'submit'}
          color={'primary'}
          variant={'contained'}
        >
          {t('common:save')}
        </Button>

      </Box>
    </>
  )
}`;

    // Dosyaları oluştur
    fs.writeFileSync(path.join(typesDir, `types${entityName}.ts`), typesTemplate.replace(/ChangeMe/g, entityName));
    fs.writeFileSync(path.join(entityDir, `${entityName}Add.tsx`), addTemplate.replace(/ChangeMe/g, entityName));
    fs.writeFileSync(path.join(entityDir, `${entityName}List.tsx`), listTemplate.replace(/ChangeMe/g, entityName));
    fs.writeFileSync(path.join(entityDir, `${entityName}Form.tsx`), formTemplate.replace(/ChangeMe/g, entityName));
    console.log(`Yapı başarıyla oluşturuldu: ${entityDir}`);
  } catch (err) {
    console.error('Bir hata oluştu:', err);
  } finally {
    rl.close();
  }
});