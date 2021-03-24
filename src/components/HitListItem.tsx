import React from "react";
import { Highlight} from 'react-instantsearch-dom';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago'

TimeAgo.addLocale(en)

export const Hit = (props) => {
    const timeAgo = new TimeAgo('en-US');
    const { hit } = props; 
    const truncateWithEllipses = (text, max) => {
        return text.substr(0,max-1)+(text.length>max ? '...' : ''); 
    }
    const publishDate = new Date(hit.publish_timestamp * 1000);

    const blogImage =  'https://avatars.githubusercontent.com/' + hit.blog.githubUsername + '?s=64';

    return (
        <div className="col-sm-12 blog-item">
                <div className="flex justify-start items-center">
                    <img className="flex-initial h-5 rounded" src={blogImage} />
                    <a target={"_blank"} href={hit.blog.link} className="flex-initial font-medium has-text-dark mx-2 text-sm">
                        {hit.blogName}
                    </a>
                </div>
                <h2><a href={hit.link}><Highlight attribute="title" hit={props.hit} /></a></h2>
                    <p className="post_link text-2xl font-semibold text-gray-900">{truncateWithEllipses(hit.description, 120)}</p>
                    <div className="flex mt-2 flex-wrap -ml-1">
                        <div className="mr-2">
                            <a className="text-gray-600 text-sm">
                                <ReactTimeAgo date={publishDate} locale="en-US"/>
                            </a>
                        </div>
                    <div>
                    <div>
                        {
                            hit.categories.map(cat => {
                                return <span className="text-gray-600 text-sm mx-1 bg-gray-100 rounded px-2 py-1">{cat}</span>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
