import React, { Component } from 'react';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import { Hit } from './HitListItem';

class InfiniteHits extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    hasMore: PropTypes.bool.isRequired,
    refine: PropTypes.func.isRequired,
  };

  sentinel!: Element;
  observer!: IntersectionObserver;

  onSentinelIntersection = entries => {
    // @ts-ignore
    const { hasMore, refineNext } = this.props;

    entries.forEach(entry => {
      if (entry.isIntersecting && hasMore) {
        refineNext();
      }
    });
  };

  componentDidMount() {
    this.observer = new IntersectionObserver(this.onSentinelIntersection);
    this.observer.observe(this.sentinel);
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  render() {
    // @ts-ignore
    const { hits } = this.props;

    return (
      <div className="">
          {hits.map(hit => (
              <Hit key={hit.link} hit={hit} />
          ))}
          <span className="ais-InfiniteHits-sentinel"
            // @ts-ignore
            ref={c => (this.sentinel = c)}
          />
      </div>
    );
  }
}

export default connectInfiniteHits(InfiniteHits);
