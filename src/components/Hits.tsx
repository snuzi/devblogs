import React from "react";
import { connectHits } from 'react-instantsearch-dom';
import { Hit } from './Hit';

const CustomHits = ({ hits }) => 
    hits.map(hit => (
        <Hit hit={hit}/>
    ))
  
export const Hits = connectHits(CustomHits);
