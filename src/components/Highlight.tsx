import { connectHighlight } from 'react-instantsearch-dom';

const CustomHighlight = ({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  });

  return (
    <span>
      {parsedHit.map(
        (part, index) =>
          part.isHighlighted ? (
            <em className="part-highlighted" key={index}>{part.value}</em>
          ) : (
            <span key={index}>{part.value}</span>
          )
      )}
    </span>
  );
};

export const Highlight = connectHighlight(CustomHighlight);