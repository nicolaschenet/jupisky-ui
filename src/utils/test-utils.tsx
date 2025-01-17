import { ReactElement } from 'react'
import { Map } from 'immutable'
import { render, RenderResult } from '@testing-library/react'
import { theme as styledTheme } from '@jupisky/jupisky-react-components'
import Providers from 'src/components/Providers'
import { createCustomStore, store } from 'src/store'
import { history } from 'src/routes/routes'
import theme from 'src/theme/mui'
import { makeProvider } from 'src/logic/wallets/store/model/provider'
import { SafeReducerMap } from 'src/logic/safe/store/reducer/types/safe'
import makeSafe from 'src/logic/safe/store/models/safe'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function renderWithProviders(Components: ReactElement, customState?: any): RenderResult {
  const customStore = {
    ...customState,
    providers: makeProvider(customState?.providers),
    safes: Map({
      safes: Map(buildSafesState(customState?.safes?.safes)),
      latestMasterContractVersion: customState?.safes?.latestMasterContractVersion || '1.3.0',
    }) as SafeReducerMap,
  }
  const testStore = customState ? createCustomStore(customStore) : store
  return render(
    <Providers store={testStore} history={history} styledTheme={styledTheme} muiTheme={theme}>
      {Components}
    </Providers>,
  )
}

export * from '@testing-library/react'
export { renderWithProviders as render }

function buildSafesState(safes) {
  if (!safes) {
    return
  }

  return Object.keys(safes).reduce((safes, safe) => {
    return {
      ...safes,
      [safe]: makeSafe(safes[safe]),
    }
  }, safes)
}
