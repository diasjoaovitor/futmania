type TStorageKey = 'futmania_baba_user' | 'futmania_app_theme'

export const getLocalStorage = <T>(key: TStorageKey) =>
  JSON.parse(localStorage.getItem(key) || 'null') as T | null

export const setLocalStorage = (key: TStorageKey, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}
