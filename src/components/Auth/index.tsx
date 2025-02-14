import { ReactNode } from 'react'
import * as yup from 'yup'

import { AuthLayout, Loader } from '@/components'

import { Form } from './Form'
import { TAuthFormInput } from './types'
import { useComponentHandler } from './use-component-handler'

type TAuthProps = {
  title: string
  buttonText: string
  schema: yup.AnyObjectSchema
  inputs: TAuthFormInput[]
  errorMessage: string
  fn: (params: any) => Promise<void>
  LinkGroup: () => ReactNode
}

export const Auth = ({
  title,
  buttonText,
  schema,
  inputs,
  errorMessage,
  fn,
  LinkGroup
}: TAuthProps) => {
  const { isPending, handleSubmit } = useComponentHandler({ errorMessage, fn })

  return (
    <AuthLayout title={title}>
      <>
        <Form
          buttonText={buttonText}
          schema={schema}
          inputs={inputs}
          handleSubmit={handleSubmit}
        />
        <LinkGroup />
        <Loader open={isPending} />
      </>
    </AuthLayout>
  )
}
