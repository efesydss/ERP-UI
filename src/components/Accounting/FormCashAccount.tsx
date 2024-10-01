import { useTranslation } from "react-i18next"
import { Box, Button, Input, Paper } from "@mui/material"
import { FormGrid } from "../Common/Form/FormGrid/FormGrid"
import { FaCheck } from "react-icons/fa6"
import { enumToOptions } from "@/utils/transformers"
import { BaseSelect } from "../Common/Form/Select/BaseSelect"
import { Currency } from "../Hr/Employees/typesEmployee"
interface FormCashAccountProps {
    cashAccountId?: number
}

export const FormCashAccount = (props: FormCashAccountProps) => {
    const { t } = useTranslation()

    return (
        <>
            <Paper sx={{ p: 2 }}>
                <FormGrid
                    widths={'half'}
                    isContainer>
                    <Input name={'name'} />
                    <Input name={'code'} />
                    <BaseSelect
                        name={'currency'}
                        selectLabel={t('common:currency')}
                        isEnum
                        options={enumToOptions(Currency)}
                    />
                </FormGrid>

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
            </Paper>
        </>
    )
}