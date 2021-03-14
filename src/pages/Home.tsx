import React from 'react';
import { 
    InstantSearch,
    SearchBox,
    Pagination,
    ClearRefinements,
    RefinementList,
    Configure,
} from 'react-instantsearch-dom';
import "instantsearch.css/themes/algolia-min.css";
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import InfiniteHits from '../components/InfinitHits';
import { Hits } from '../components/Hits';

const searchClient = instantMeiliSearch(
    process.env.REACT_APP_HOST_NAME ?? '',
    process.env.REACT_APP_HOST_KEY ?? ''
);


const Home = () => (
    <section className="blog-listing gray-bg">
        <div className="container">
            <InstantSearch indexName={process.env.REACT_APP_INDEX_NAME} searchClient={searchClient}>

                <div className="row align-items-start">
                    <div className="col-lg-12">
                        <h1>Engineering blogs</h1>
                        <SearchBox />
                    </div>

                    <div className="col-lg-4 m-15px-tb blog-aside">   
                        <div className="widget widget-author">
                            <div className="widget-title">
                                 <ClearRefinements/>
                            </div>
                        </div>

                        <div className="widget widget-author">
                            <div className="widget-title">
                                <h3>Blogs</h3>
                            </div>
                            <div className="widget-body">
                                <RefinementList attribute="blogName" />
                                <Configure hitsPerPage={40} />
                            </div>
                        </div>
                        <div className="widget widget-author">
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
                    <div className="col-lg-8 m-15px-tb">
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

export default Home;
