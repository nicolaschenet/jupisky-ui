import { Icon } from '@jupisky/jupisky-react-components'
import { ListItemType } from 'src/components/List'
import Layout from '.'

export default {
  title: 'Layout',
  component: Layout,
  parameters: {
    componentSubtitle: 'It provides a custom layout used in Safe Multisig',
  },
}

const items: ListItemType[] = [
  {
    label: 'Assets',
    icon: <Icon size="md" type="assets" />,
    href: '#',
  },
  {
    label: 'Settings',
    icon: <Icon size="md" type="settings" />,
    href: '#',
    subItems: [
      {
        label: 'Jupisky Details',
        href: '#',
      },
      {
        label: 'Owners',
        href: '#',
      },
      {
        label: 'Policies',
        href: '#',
      },
      {
        label: 'Advanced',
        href: '#',
      },
    ],
  },
]

export const Base = (): React.ReactElement => {
  return (
    <Layout
      sidebarItems={items}
      safeAddress="0xEE63624cC4Dd2355B16b35eFaadF3F7450A9438B"
      safeName="someName"
      granted={true}
      balance={undefined}
      onToggleSafeList={() => console.log}
      onReceiveClick={() => console.log}
      onNewTransactionClick={() => console.log}
    >
      <div>The content goes here</div>
    </Layout>
  )
}
