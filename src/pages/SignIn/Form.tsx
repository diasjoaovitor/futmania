import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, FormControl, TextField } from '@mui/material'
import { inputs } from './inputs'
import { schema, TFormData } from './schema'
import * as S from './styles'

type TFormProps = {
  handleSubmit(data: TFormData): void
}

export const Form = ({ handleSubmit }: TFormProps) => {
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
      {inputs.map((inputProps) => {
        const { name, ...rest } = inputProps
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
        Entrar
      </Button>
    </FormControl>
  )
}
