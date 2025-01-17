import { Icon, Tooltip } from '@jupisky/jupisky-react-components'
import { MultisigExecutionInfo } from '@gnosis.pm/safe-react-gateway-sdk'
import { default as MuiIconButton } from '@material-ui/core/IconButton'
import { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { currentSafeNonce } from 'src/logic/safe/store/selectors'
import { Transaction } from 'src/logic/safe/store/models/types/gateway.d'
import { useActionButtonsHandlers } from './hooks/useActionButtonsHandlers'

const IconButton = styled(MuiIconButton)`
  padding: 8px !important;

  &.Mui-disabled {
    opacity: 0.4;
  }
`

type TxCollapsedActionsProps = {
  transaction: Transaction
}

export const TxCollapsedActions = ({ transaction }: TxCollapsedActionsProps): ReactElement => {
  const {
    canCancel,
    handleConfirmButtonClick,
    handleCancelButtonClick,
    handleOnMouseEnter,
    handleOnMouseLeave,
    isPending,
    disabledActions,
  } = useActionButtonsHandlers(transaction)
  const nonce = useSelector(currentSafeNonce)

  const getTitle = () => {
    if (transaction.txStatus === 'AWAITING_EXECUTION') {
      return (transaction.executionInfo as MultisigExecutionInfo)?.nonce === nonce
        ? 'Execute'
        : `Transaction with nonce ${nonce} needs to be executed first`
    }
    return 'Confirm'
  }

  return (
    <>
      <Tooltip title={getTitle()} placement="top">
        <span>
          <IconButton
            size="small"
            type="button"
            onClick={handleConfirmButtonClick}
            disabled={disabledActions}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          >
            <Icon type={transaction.txStatus === 'AWAITING_EXECUTION' ? 'rocket' : 'check'} color="primary" size="sm" />
          </IconButton>
        </span>
      </Tooltip>
      {canCancel && (
        <Tooltip title="Reject" placement="top">
          <span>
            <IconButton size="small" type="button" onClick={handleCancelButtonClick} disabled={isPending}>
              <Icon type="circleCross" color="error" size="sm" />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </>
  )
}
