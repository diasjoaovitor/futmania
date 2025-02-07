import { yupResolver } from '@hookform/resolvers/yup'
import { Button, FormControl, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import * as S from './styles'
import { TAuthFormInput } from './types'

type TFormProps = {
  inputs: TAuthFormInput[]
  buttonText: string
  schema: yup.AnyObjectSchema
  handleSubmit(data: any): void
}

export const Form = ({
  inputs,
  buttonText,
  schema,
  handleSubmit
}: TFormProps) => {
  const form = useForm({
    resolver: yupResolver(schema)
  })
  return (
    <FormControl
      sx={S.Form}
      component="form"
      role="form"
      onSubmit={form.handleSubmit(handleSubmit)}
      noValidate
      fullWidth
    >
      {inputs.map((props) => {
        const { name, ...rest } = props
        return (
          <TextField
            key={name}
            {...rest}
            {...form.register(name)}
            error={!!form.formState.errors[name]}
            helperText={form.formState.errors[name]?.message?.toString()}
          />
        )
      })}
      <Button type="submit" variant="contained" fullWidth>
        {buttonText}
      </Button>
    </FormControl>
  )
}
