import { Loader } from '@jupisky/jupisky-react-components'
import { ReactElement, ReactNode } from 'react'

import { INFINITE_SCROLL_CONTAINER, InfiniteScroll } from 'src/components/InfiniteScroll'
import { HorizontallyCentered, ScrollableTransactionsContainer } from './styled'

type TxsInfiniteScrollProps = {
  children: ReactNode
  next: () => Promise<void>
  hasMore: boolean
  isLoading: boolean
}

export const TxsInfiniteScroll = ({ children, next, hasMore, isLoading }: TxsInfiniteScrollProps): ReactElement => {
  return (
    <InfiniteScroll next={next} hasMore={hasMore}>
      <ScrollableTransactionsContainer id={INFINITE_SCROLL_CONTAINER}>
        {children}
        <HorizontallyCentered isVisible={isLoading}>
          <Loader size="md" />
        </HorizontallyCentered>
      </ScrollableTransactionsContainer>
    </InfiniteScroll>
  )
}

export { InfiniteScrollContext as TxsInfiniteScrollContext } from 'src/components/InfiniteScroll'
