import { Checkbox } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Close from '@material-ui/icons/Close'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Autocomplete from '@material-ui/lab/Autocomplete'
import * as React from 'react'
import { Checked, RemoveTag, Unchecked } from '../../icons/Icons'
import { MaterialStyles } from '../../styles/material/material.styles'
import { countries } from './countries'

const countryOptions: { label: string; value: string }[] = countries.map(country => ({
  label: country.name,
  value: country.alphaThree
}))

const countryOption = (country?: string) => {
  const found = countries.filter(({ alphaThree }) => alphaThree === country)[0]
  return {
    label: found?.name ?? '',
    value: found?.alphaThree ?? ''
  }
}

type CountryValue = string | string[]

interface CountrySelectProps<T extends CountryValue> {
  value?: T
  onChange?: (value: T) => void | undefined
  multiple?: boolean
}

interface CountrySelectSingleProps {
  value?: string
  onChange?: (value: string) => void | undefined
  multiple?: false
}

interface CountrySelectMultipleProps {
  value?: string[]
  onChange?: (value: string[]) => void | undefined
  multiple: true
}

export const CountrySelect: <T extends CountryValue>(props: CountrySelectProps<T>) => JSX.Element = ({
  value,
  onChange,
  multiple
}) => (
  <>
    <MaterialStyles />
    {multiple ? (
      <CountrySelectMultiple
        value={value as string[]}
        onChange={onChange as (value: string[]) => void | undefined}
        multiple
      />
    ) : (
      <CountrySelectSingle value={value as string} onChange={onChange as (value: string) => void | undefined} />
    )}
  </>
)

export const CountrySelectSingle: React.FC<CountrySelectSingleProps> = ({ value, onChange }) => (
  <Autocomplete
    value={countryOption(value)}
    autoHighlight
    onChange={(event: any, value: any) => {
      if (!!onChange) onChange(value?.value ?? '')
    }}
    options={countryOptions}
    getOptionLabel={option => option.label}
    getOptionSelected={(option, value) => option.value === value.value}
    renderInput={params => <TextField {...params} fullWidth />}
    popupIcon={<ExpandMore />}
    closeIcon={<Close />}
  />
)

export const CountrySelectMultiple: React.FC<CountrySelectMultipleProps> = ({ value, onChange }) => (
  <Autocomplete
    multiple
    disableCloseOnSelect
    value={value?.map(countryOption)}
    onChange={(event, value) => {
      if (!!onChange) onChange(value.map(({ value }: { value: string }) => value))
    }}
    options={countryOptions}
    getOptionLabel={option => option.label}
    getOptionSelected={(option, value) => option.value === value.value}
    renderOption={(option, { selected }) => (
      <>
        <Checkbox icon={Unchecked} checkedIcon={Checked} style={{}} checked={selected} />
        {option.label}
      </>
    )}
    renderInput={params => <TextField {...params} fullWidth />}
    popupIcon={<ExpandMore />}
    closeIcon={<Close />}
    ChipProps={{
      deleteIcon: RemoveTag
    }}
    classes={{ option: 'multiple', inputRoot: 'multiple' }}
  />
)
