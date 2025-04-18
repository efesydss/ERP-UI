import { styled } from '@mui/material'
import { contentWidthMap, ContentWidths } from '@/components/Common/Form/FormGrid/typesFormGrid'

export const FormWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'elementWidth' && prop !== 'isContainer'
})<{ elementWidth: ContentWidths; isContainer?: boolean }>(({ theme, elementWidth, isContainer }) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${contentWidthMap[elementWidth]}, 1fr)`,
  columnGap: theme.spacing(2),
  rowGap: theme.spacing(2),
  alignItems: isContainer ? 'flex-start' : 'flex-end',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: `repeat(1, 1fr)`
  }
}))
