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

    return (
        <div className="col-sm-4">
            <div className="blog-grid">
                <div className="blog-img">
                    <div style={{display:"none"}} className="date">
                        <span>04</span>
                        <label>FEB</label>
                    </div>
                    {
                        props.hit.image && 
                        <a target={"_blank"} href={props.hit.link}>
                            <img src={hit.image} title="" alt={props.hit.title}/>
                        </a>
                    }
                </div>
                <div className="blog-info">
                    <h5><a href={hit.link}><Highlight attribute="title" hit={props.hit} /></a></h5>
                    <p>{truncateWithEllipses(hit.description, 120)}</p>
                    <div className="btn-bar">
                        <span>
                            <a target={"_blank"} href={hit.blog.link} className="px-btn-arrow">
                                {hit.blogName}
                            </a> - 
                        </span>
                        <span key={hit.link}> <ReactTimeAgo date={publishDate} locale="en-US"/> - </span>
                        <a target={"_blank"} href={hit.link} className="px-btn-arrow">
                            <span>Read More</span> 
                            <i className="arrow"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
