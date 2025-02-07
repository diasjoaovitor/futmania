export const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
