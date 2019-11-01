export * from './raw'
export * from './eth-get-balance'
export * from './eth-sign'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any
  }
}
