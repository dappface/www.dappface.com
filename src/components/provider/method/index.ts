export * from './raw'
export * from './get-balance'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any
  }
}
