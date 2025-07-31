import React, { useEffect } from 'react';
import {
  InstantSearch,
  SearchBox,
  Pagination,
  ClearRefinements,
  RefinementList,
  Configure,
} from 'react-instantsearch-dom';
import 'instantsearch.css/themes/algolia-min.css';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { Hits } from '../components/Hits';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

// Initialize Google Analytics once (outside of component)
const trackingId = process.env.REACT_APP_GANALYTICS_ID ?? '';
if (trackingId) {
  ReactGA.initialize(trackingId);
}

const searchClient = instantMeiliSearch(
  process.env.REACT_APP_HOST_NAME ?? '',
  process.env.REACT_APP_HOST_KEY ?? ''
);

const Home = () => {
  const location = useLocation();

  // Track GA page views on route changes
  useEffect(() => {
    const pagePath = location.pathname + location.search;
    ReactGA.set({ page: pagePath });
    ReactGA.pageview(pagePath);
  }, [location]);

  return (
    <section className="blog-listing gray-bg">
      <div className="container">
        <InstantSearch
          indexName={process.env.REACT_APP_INDEX_NAME ?? ''}
          searchClient={searchClient}
        >
          <div className="row align-items-start">
            <div className="col-lg-12">
              <SearchBox />
            </div>

            <div className="col-lg-3 m-15px-tb blog-aside">
              <div className="widget">
                <div className="widget-title">
                  <ClearRefinements />
                </div>
              </div>
              <div className="widget">
                <div className="widget-title">
                  <h3>Blogs</h3>
                </div>
                <div className="widget-body">
                  <RefinementList attribute="blogName" />
                  <Configure hitsPerPage={40} />
                </div>
              </div>
              <div className="widget">
                <div className="widget-title">
                  <h3>Categories</h3>
                </div>
                <div className="widget-body">
                  <RefinementList
                    limit={7}
                    showMoreLimit={20}
                    showMore={true}
                    attribute="categories"
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-9 m-15px-tb">
              <div className="row">
                <Hits />
                <div className="col-12">
                  <Pagination />
                </div>
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </section>
  );
};

export default Home;
