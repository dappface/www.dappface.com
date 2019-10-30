export * from './raw'
export * from './get-balance'

declare global {
  interface Window {
    ethereum: any
  }
}
