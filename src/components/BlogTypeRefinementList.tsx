import { Highlight, connectRefinementList } from 'react-instantsearch-dom';

const CustomRefinementList = ({
  items,
  isFromSearch,
  refine,
  createURL,
}) => (
    <div className="blog-type-selectors">
        {items.map(item => (
            <div className="blog-type-selector" key={item.label}>
                <a
                    href={createURL(item.value)}
                    style={{ fontWeight: item.isRefined ? 600 : 400 }}
                    onClick={event => {
                    event.preventDefault();
                    refine(item.value);
                    }}
                >
                    {isFromSearch ? (
                        <Highlight attribute="label" hit={item} />
                    ) : (
                        <span className="capitalize">
                            {item.label}
                        </span>
                    )}{' '}
                    ({item.count})
                </a>
            </div>
        ))}
  </div>
);

const BlogTypeRefinementList = connectRefinementList(CustomRefinementList);

export default BlogTypeRefinementList;
