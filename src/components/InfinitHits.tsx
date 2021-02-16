import React, { Component } from 'react';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import { Hit } from './Hit';

class InfiniteHits extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    hasMore: PropTypes.bool.isRequired,
    refine: PropTypes.func.isRequired,
  };

  sentinel = null;

  onSentinelIntersection = entries => {
    // @ts-ignore
    const { hasMore, refine } = this.props;

    entries.forEach(entry => {
      if (entry.isIntersecting && hasMore) {
        refine();
      }
    });
  };

  componentDidMount() {
    // @ts-ignore
    this.observer = new IntersectionObserver(this.onSentinelIntersection);
    // @ts-ignore
    this.observer.observe(this.sentinel);
  }

  componentWillUnmount() {
    // @ts-ignore
    this.observer.disconnect();
  }

  render() {
    // @ts-ignore
    const { hits } = this.props;

    return (
      <div className="row">
          {hits.map(hit => (
              <Hit hit={hit} />
          ))}
          <span
            className="ais-InfiniteHits-sentinel"
            // @ts-ignore
            ref={c => (this.sentinel = c)}
          />
      </div>
    );
  }
}

export default connectInfiniteHits(InfiniteHits);
