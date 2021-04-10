import { Highlight, connectMenu } from 'react-instantsearch-dom';

const Menu = ({ items, isFromSearch, refine, createURL }) => (
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
                    )}
                </a>
            </div>
        ))}
  </div>
);

const CustomMenu = connectMenu(Menu);

export default CustomMenu;
