import { yupResolver } from '@hookform/resolvers/yup'
import { Button, FormControl, TextField } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { Layout } from '@/components'
import { useAppContext } from '@/contexts'

import { inputs } from './inputs'
import { schema, TFormData } from './schema'

export const Settings = () => {
  const { babaUser, userMutationUpdateMutate } = useAppContext()

  const defaultValues: TFormData = useMemo(
    () => ({
      displayName: babaUser?.displayName ?? ''
    }),
    [babaUser]
  )

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues
  })

  const { reset } = form

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const handleSubmit = (data: TFormData) => {
    if (!babaUser) return
    userMutationUpdateMutate({ ...babaUser, ...data })
  }

  return (
    <Layout title="Configurações do Baba">
      <FormControl
        component="form"
        role="form"
        onSubmit={form.handleSubmit(handleSubmit)}
        noValidate
        fullWidth
      >
        {inputs.map((props) => {
          const { name, ...rest } = props
          const key = name as keyof TFormData
          return (
            <TextField
              key={name}
              {...rest}
              {...form.register(key)}
              error={!!form.formState.errors[key]}
              helperText={form.formState.errors[key]?.message?.toString()}
            />
          )
        })}

        <Button sx={{ mt: 2 }} type="submit" variant="contained" fullWidth>
          Salvar
        </Button>
      </FormControl>
    </Layout>
  )
}
