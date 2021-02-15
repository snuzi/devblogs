import React from 'react';
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

const searchClient = instantMeiliSearch(
    process.env.HOST_NAME ?? '',
    process.env.HOST_KEY ?? ''
);

const Home = () => (
  <InstantSearch
    indexName={process.env.INDEX_NAME}
    searchClient={searchClient}
  >
    <SearchBox />
    <Hits hitComponent={Hit} />
  </InstantSearch>
);

function Hit(props: any) {
  return <Highlight attribute="name" hit={props.hit} />;
}

export default Home;
