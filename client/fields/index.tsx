import { Field } from 'react-final-form'
import {
  Textarea,
  InputProps,
  SelectProps,
  Select,
  SwitchProps,
  Switch,
} from '@chakra-ui/react'

type TextareaFieldProps = { name: string } & InputProps

export const TextareaField = ({ name }: TextareaFieldProps) => (
  <Field name={name}>{({ input }) => <Textarea {...input} />}</Field>
)

type SelectFieldProps = { name: string } & SelectProps

export const SelectField = ({ name, ...rest }: SelectFieldProps) => (
  <Field name={name}>{({ input }) => <Select {...input} {...rest} />}</Field>
)

type SwitchFieldProps = { name: string } & SwitchProps

export const SwitchField = ({ name, ...rest }: SwitchFieldProps) => (
  <Field type="checkbox" name={name}>
    {({ input }) => <Switch isChecked={input.checked} {...input} {...rest} />}
  </Field>
)
