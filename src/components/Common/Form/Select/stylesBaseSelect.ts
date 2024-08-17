import { StylesConfig } from 'react-select'
import { OptionType } from '@/components/Common/Form/Select/BaseSelect'
import { Theme } from '@mui/material'

export const getSelectStyles = (theme: Theme, hasError: boolean): StylesConfig<OptionType, boolean> => ({
  control: (provided) => ({
    ...provided,
    cursor: 'pointer',
    borderColor: hasError ? theme.palette.error.main : theme.palette.divider,
    fontSize: '.9rem',
    minHeight: 34,
    height: 34,
    '&:hover': {
      borderColor: hasError ? theme.palette.error.main : theme.palette.primary.main
    }
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: theme.spacing(0, 1),
    height: 34
  }),
  placeholder: (provided) => ({
    ...provided,
    color: hasError ? theme.palette.error.main : provided.color
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: 34
  }),
  singleValue: (provided) => ({
    ...provided,
    color: hasError ? theme.palette.error.main : provided.color
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 1001,
    padding: theme.spacing(0, 1)
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? theme.palette.primary.main
      : state.isFocused
        ? theme.palette.action.hover
        : undefined,
    color: state.isSelected ? theme.palette.primary.contrastText : provided.color,
    padding: theme.spacing(1),
    margin: theme.spacing(0.5, 0),
    cursor: 'pointer',
    borderRadius: theme.shape.borderRadius,
    fontSize: '.9rem'
  })
})
