import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { TabPanel } from "@/components/Common/Tabs/TabPanel"
import { Box, Button, Input, Paper } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { FaAngleDoubleRight } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa6'

interface FormDepotProps {
    depotId?: number

}

export const FormDepot = (props: FormDepotProps) => {
    const isDetailPage = !!props.depotId

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
                                    </FormGrid>

                                </FormGrid>
                                {!isDetailPage && (
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                                        <Button
                                            size={'small'}
                                            endIcon={<FaAngleDoubleRight />}
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
                    }
                ]}

            />
            {isDetailPage && (
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
            )}

        </>
    )
}