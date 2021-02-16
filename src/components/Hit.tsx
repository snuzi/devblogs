import React from "react";
import { Highlight} from 'react-instantsearch-dom';

export const Hit = (props) => {
    const { hit } = props; 
    const truncateWithEllipses = (text, max) => {
        return text.substr(0,max-1)+(text.length>max ? '...' : ''); 
    }

    return (
        <div className="col-sm-6">
            <div className="blog-grid">
                <div className="blog-img">
                    <div style={{display:"none"}} className="date">
                        <span>04</span>
                        <label>FEB</label>
                    </div>
                    <a target={"_blank"} href={props.hit.link}>
                        <img src={props.hit.image} title="" alt={props.hit.title}/>
                    </a>
                </div>
                <div className="blog-info">
                    <h5><a href={props.hit.link}><Highlight attribute="title" hit={props.hit} /></a></h5>
                    <p>{truncateWithEllipses(props.hit.description, 220)}</p>
                    <div className="btn-bar">
                        <span>{hit.blogName} - </span>
                        <a target={"_blank"} href={props.hit.link} className="px-btn-arrow">
                            <span>Read More</span> 
                            <i className="arrow"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
