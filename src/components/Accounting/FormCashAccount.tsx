import { useState } from "react"
import { useTranslation } from "react-i18next"
import { TabPanel } from "../Common/Tabs/TabPanel"
import { Box, Button, Input, Paper } from "@mui/material"
import { FormGrid } from "../Common/Form/FormGrid/FormGrid"
import { FaAngleRight } from "react-icons/fa6"

interface FormCashAccountProps {
    cashAccountId?: number
}

export const FormCashAccount = (props: FormCashAccountProps) => {
    const isDetailPage = !!props.cashAccountId
    const { t } = useTranslation()
    const [activeTab, setActiveTab] = useState(0)
    const handleTabChange = (newValue: number) => {
        setActiveTab(newValue)
    }

    return (
        <>
            <TabPanel
                activeTab={activeTab}
                onTabChange={handleTabChange}
                tabs={[
                    {
                        label: t('common:infoGeneral'),
                        content: (
                            <Paper sx={{ p: 2 }}>
                                <FormGrid
                                    widths={'half'}
                                    isContainer
                                >
                                    <FormGrid>
                                        <Input name={'name'} />
                                        <Input name={'code'} />
                                        <Input name={'currency'} />
                                    </FormGrid>

                                </FormGrid>
                                {!isDetailPage && (
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                                        <Button
                                            size={'small'}
                                            endIcon={<FaAngleRight />}
                                            type={'button'}
                                            color={'primary'}
                                            variant={'outlined'}
                                            onClick={() => setActiveTab(1)}
                                        >
                                            {t('common:continue')}
                                        </Button>
                                    </Box>
                                )}
                            </Paper>
                        )
                    },
                    {
                        label: t('common:infoIdentity'),
                        content: (
                            <Paper sx={{ p: 2 }}>
                                <FormGrid widths={'half'}>
                                    <Input
                                        name={'identificationNumber'}
                                        type={'number'}
                                    />
                                    <Input
                                        name={'name'}

                                    />
                                    <Input
                                        name={'code'}

                                    />

                                </FormGrid>
                                {!isDetailPage && (
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                                        <Button
                                            size={'small'}
                                            endIcon={<FaAngleRight />}
                                            type={'button'}
                                            color={'primary'}
                                            variant={'outlined'}
                                            onClick={() => setActiveTab(2)}
                                        >
                                            {t('common:continue')}
                                        </Button>
                                    </Box>
                                )}
                            </Paper>
                        )
                    },
                ]}
            />
        </>
    )
}