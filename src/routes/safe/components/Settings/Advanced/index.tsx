import { Text, theme, Title } from '@jupisky/jupisky-react-components'
import { ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import semverSatisfies from 'semver/functions/satisfies'

import { getModuleData } from './dataFetcher'
import { useStyles } from './style'
import { ModulesTable } from './ModulesTable'

import Block from 'src/components/layout/Block'
import { currentSafe } from 'src/logic/safe/store/selectors'
import { useAnalytics, SAFE_NAVIGATION_EVENT } from 'src/utils/googleAnalytics'
import { TransactionGuard } from './TransactionGuard'

const InfoText = styled(Text)`
  margin-top: 16px;
`

const Bold = styled.strong`
  color: ${theme.colors.text};
`

const NoModuleLegend = (): ReactElement => (
  <InfoText color="secondaryLight" size="xl">
    No modules enabled
  </InfoText>
)

const NoTransactionGuardLegend = (): ReactElement => (
  <InfoText color="secondaryLight" size="xl">
    No transaction guard set
  </InfoText>
)

const Advanced = (): ReactElement => {
  const classes = useStyles()
  const { nonce, modules, guard, currentVersion } = useSelector(currentSafe) ?? {}

  const moduleData = modules ? getModuleData(modules) ?? null : null
  const isVersionWithGuards = semverSatisfies(currentVersion, '>=1.3.0')
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    trackEvent({ category: SAFE_NAVIGATION_EVENT, action: 'Settings', label: 'Advanced' })
  }, [trackEvent])

  return (
    <>
      {/* Nonce */}
      <Block className={classes.container}>
        <Title size="xs" withoutMargin>
          Jupisky Nonce
        </Title>
        <InfoText size="lg">
          For security reasons, transactions made with Jupisky need to be executed in order. The nonce shows you
          which transaction will be executed next. You can find the nonce for a transaction in the transaction details.
        </InfoText>
        <InfoText color="secondaryLight" size="xl">
          Current Nonce: <Bold data-testid={'current-nonce'}>{nonce}</Bold>
        </InfoText>
      </Block>

      {/* Modules */}
      <Block className={classes.container}>
        <Title size="xs" withoutMargin>
          Jupisky Modules
        </Title>
        <InfoText size="lg">
          Modules allow you to customize the access-control logic of your Jupisky. Modules are potentially risky, so make
          sure to only use modules from trusted sources.
        </InfoText>

        {!moduleData || !moduleData.length ? <NoModuleLegend /> : <ModulesTable moduleData={moduleData} />}
      </Block>

      {/* Transaction guard */}
      {isVersionWithGuards && (
        <Block className={classes.container}>
          <Title size="xs" withoutMargin>
            Transaction Guard
          </Title>
          <InfoText size="lg">
            Transaction guards impose additional constraints that are checked prior to executing a Jupisky transaction.
            Transaction guards are potentially risky, so make sure to only use modules from trusted sources. 
          </InfoText>

          {!guard ? <NoTransactionGuardLegend /> : <TransactionGuard address={guard} />}
        </Block>
      )}
    </>
  )
}

export default Advanced
