import React from 'react';
import { 
    InstantSearch,
    SearchBox,
    ClearRefinements,
    RefinementList,
    Configure,
} from 'react-instantsearch-dom';
import "instantsearch.css/themes/algolia-min.css";
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import InfiniteHits from '../components/InfiniteHits';
import BlogTypeRefinementList from '../components/BlogTypeRefinementList';
import BlogTypeMenu from '../components/BlogTypeMenu';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';

const searchClient = instantMeiliSearch(
    process.env.REACT_APP_HOST_NAME ?? '',
    process.env.REACT_APP_HOST_KEY ?? ''
);
    
const history = createBrowserHistory();

ReactGA.initialize(process.env.REACT_APP_GANALYTICS_ID ?? '');

ReactGA.set({ page: 'Home page' }); // Update the user's current page
ReactGA.pageview('Home page'); // Record a pageview for the given page

// Initialize google analytics page view tracking
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

const HomeInfiniteScroll = () => (
    <section className="blog-listing gray-bg">
        <div className="container">
            <InstantSearch indexName={process.env.REACT_APP_INDEX_NAME} searchClient={searchClient}>
                <BlogTypeMenu
                    //defaultRefinement={['company']}
                    attribute="blogType"
                />
                <div className="row align-items-start">
                    <div className="col-lg-12">
                        <SearchBox />
                    </div>

                    <div className="col-lg-3 m-15px-tb blog-aside">   
                        <div className="widget">
                            <div className="widget-title">
                                <ClearRefinements
                                    transformItems={items =>
                                        items.filter(({ attribute }) => attribute !== 'blogType')
                                    }
                                />
                            </div>
                        </div>
                        <div className="widget">
                            <div className="widget-title">
                                <h3>Blogs</h3>
                            </div>
                            <div className="widget-body">
                                <RefinementList
                                    operator={"or"}
                                    limit={30}
                                    showMoreLimit={100}
                                    showMore={true}
                                    attribute="blogName" />
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
                                    attribute="categories" />
                            </div>
                        </div>
                    
                    </div>
                    <div className="col-lg-9 list-container">
                        <Configure
                            hitsPerPage={12}
                            attributesToSnippet={["description:50"]}
                            snippetEllipsisText={"..."}/>
                        <InfiniteHits />
                    </div>
                </div>
            </InstantSearch>
        </div>
    </section>
);

export default HomeInfiniteScroll;
