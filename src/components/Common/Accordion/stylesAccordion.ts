import { Accordion as MuiAccordion, AccordionSummary as MuiAccordionSummary, styled } from '@mui/material'

export const Accordion = styled(MuiAccordion)(({ theme }) => ({
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper
}))

export const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  fontWeight: 600,
  backgroundColor: theme.palette.muted.main
}))
