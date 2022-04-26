import React, { useEffect, useState } from 'react'
import { CombinedError } from 'urql'

import { SpinningLoader } from 'blockchain-info-components'
import LazyLoadContainer from 'components/LazyLoadContainer'
import { TableWrapper } from 'components/Table'
import { EventFilter, EventsQuery, InputMaybe } from 'generated/graphql'

import { Centered } from '../components'
import NftPageLazyLoadWrapper from '../components/NftPageLazyLoadWrapper'
import EventsResults from './Events.results'
import EventsTable from './Events.table'

const Events: React.FC<Props> = ({ filters, isFetchingParent }) => {
  const [events, setEvents] = useState([] as EventsQuery['events'])
  const [pageVariables, setPageVariables] = useState([{ page: 0 }])
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(true)
  const [errorFetchingNextPage, setNextPageFetchError] = useState<CombinedError | undefined>(
    undefined
  )

  useEffect(() => {
    setIsFetchingNextPage(true)
    setPageVariables([])
    setEvents([])
    setTimeout(() => {
      setPageVariables([{ page: 0 }])
    }, 100)
  }, [filters])

  return (
    <LazyLoadContainer
      triggerDistance={50}
      onLazyLoad={() =>
        isFetchingNextPage
          ? null
          : setPageVariables((pages) => [...pages, { page: pages.length + 1 }])
      }
    >
      {pageVariables.length
        ? pageVariables.map(({ page }) => (
            <EventsResults
              page={page}
              key={page}
              filters={filters}
              setEvents={setEvents}
              setNextPageFetchError={setNextPageFetchError}
              setIsFetchingNextPage={setIsFetchingNextPage}
            />
          ))
        : null}
      <TableWrapper height='auto'>
        {events.length ? <EventsTable onLazyLoad={() => null} events={events} /> : null}
        <Centered>
          {isFetchingNextPage || isFetchingParent ? (
            <SpinningLoader width='14px' height='14px' borderWidth='3px' />
          ) : null}
        </Centered>
      </TableWrapper>
    </LazyLoadContainer>
  )
}

type Props = {
  address?: never
  filters: InputMaybe<InputMaybe<EventFilter> | InputMaybe<EventFilter>[]> | undefined
  isFetchingParent: boolean
}

export default Events