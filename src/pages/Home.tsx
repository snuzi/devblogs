import React from 'react';
import { 
    InstantSearch,
    SearchBox,
    Hits,
    Highlight,
    Pagination,
    ClearRefinements,
    RefinementList,
    Configure,
    Snippet
} from 'react-instantsearch-dom';
import "instantsearch.css/themes/algolia-min.css";
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

const searchClient = instantMeiliSearch(
    process.env.REACT_APP_HOST_NAME ?? '',
    process.env.REACT_APP_HOST_KEY ?? ''
);

const Home = () => (
    <div className="ais-InstantSearch">
        <h1>Engineering blogs</h1>
        <InstantSearch indexName={process.env.REACT_APP_INDEX_NAME} searchClient={searchClient}>
          <div className="left-panel">
            <ClearRefinements />
            <h2>Blogs</h2>
            <RefinementList attribute="blogName" />
            <Configure hitsPerPage={40} />
          </div>
          <div className="right-panel">
            <SearchBox />
            <Hits hitComponent={Hit} />
            <Pagination />
          </div>
        </InstantSearch>
      </div>
);


  function Hit(props) {
    return (
        <div key={props.hit.id}>
            <div className="hit-name">
                <Highlight attribute="title" hit={props.hit} />
            </div>
            <img src={props.hit.image} alt={props.hit.name} />
            <div className="hit-description">
                <Snippet attribute="description" hit={props.hit} />
            </div>
            <div className="hit-info">Blog: {props.hit.blogName}</div>
            <div className="hit-info">Published: {props.hit.publish_date}</div>
        </div>
    );
  }

export default Home;
