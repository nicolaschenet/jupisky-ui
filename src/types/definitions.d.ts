import 'styled-components'
import { theme } from '@jupisky/jupisky-react-components'

type Theme = typeof theme

export {}
declare global {
  interface Window {
    isDesktop?: boolean
    ethereum?: {
      autoRefreshOnNetworkChange: boolean
      isMetaMask: boolean
    }
  }
}
declare module '@openzeppelin/contracts/build/contracts/ERC721'
declare module 'currency-flags/dist/currency-flags.min.css'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {} // eslint-disable-line
}
