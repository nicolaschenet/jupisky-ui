import { EthHashInfo } from '@jupisky/jupisky-react-components'
import { KeyboardEvent, ReactElement, useEffect, useState } from 'react'
import { useForm, useFormState } from 'react-final-form'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { ScanQRWrapper } from 'src/components/ScanQRModal/ScanQRWrapper'
import { getExplorerInfo } from 'src/config'
import { currentNetworkAddressBook } from 'src/logic/addressBook/store/selectors'
import { AddressBookInput } from 'src/routes/safe/components/Balances/SendModal/screens/AddressBookInput'
import { sameString } from 'src/utils/strings'
import { sameAddress } from 'src/logic/wallets/ethAddresses'

const BeneficiaryInput = styled.div`
  grid-area: beneficiaryInput;
`

const BeneficiaryScan = styled.div`
  grid-area: beneficiaryScan;
`

const Beneficiary = (): ReactElement => {
  const { initialValues } = useFormState()
  const { mutators } = useForm()

  const [selectedEntry, setSelectedEntry] = useState<{ address?: string; name?: string } | null>({
    address: initialValues?.beneficiary || '',
    name: '',
  })

  const [pristine, setPristine] = useState<boolean>(!initialValues?.beneficiary)

  useEffect(() => {
    if (selectedEntry === null) {
      mutators?.setBeneficiary?.('')

      if (pristine) {
        setPristine(false)
      }
    }
  }, [mutators, pristine, selectedEntry])

  const addressBook = useSelector(currentNetworkAddressBook)

  const handleScan = (value, closeQrModal) => {
    const scannedAddress = value.startsWith('ethereum:') ? value.replace('ethereum:', '') : value
    const scannedName = addressBook.find(({ address }) => {
      return sameAddress(scannedAddress, address)
    })?.name

    mutators?.setBeneficiary?.(scannedAddress)

    setSelectedEntry({
      name: scannedName,
      address: scannedAddress,
    })

    closeQrModal()
  }

  const handleOnKeyDown = (e: KeyboardEvent<HTMLElement>): void => {
    if (sameString(e.key, 'Tab')) {
      return
    }
    setSelectedEntry(null)
  }

  const handleOnClick = () => {
    setSelectedEntry(null)
  }

  return selectedEntry?.address ? (
    <BeneficiaryInput
      role="button"
      aria-pressed="false"
      tabIndex={0}
      onKeyDown={handleOnKeyDown}
      onClick={handleOnClick}
    >
      <EthHashInfo
        hash={selectedEntry.address}
        name={selectedEntry.name}
        showCopyBtn
        showAvatar
        textSize="lg"
        explorerUrl={getExplorerInfo(selectedEntry.address)}
      />
    </BeneficiaryInput>
  ) : (
    <>
      <BeneficiaryInput>
        <AddressBookInput
          fieldMutator={mutators?.setBeneficiary}
          pristine={pristine}
          setSelectedEntry={setSelectedEntry}
          setIsValidAddress={() => {}}
          label="Beneficiary"
        />
      </BeneficiaryInput>
      <BeneficiaryScan>
        <ScanQRWrapper handleScan={handleScan} />
      </BeneficiaryScan>
    </>
  )
}

export default Beneficiary
