import React from "react";
import { connectHits } from 'react-instantsearch-dom';
import { Hit } from './Hit';

const MyHits = ({ hits }) => 
    hits.map(hit => (
        <Hit hit={hit}/>
    ))
  
export const Hits = connectHits(MyHits);
