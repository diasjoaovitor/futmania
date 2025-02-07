export type TParamsCreate<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>

export type TParamsUpdate<T> = Omit<T, 'updatedAt'>
