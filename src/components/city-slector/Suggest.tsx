/*
  Response user input in the search input, filter the city
*/
import React, { memo, useMemo, useState, useEffect } from "react";

interface SuggestItemProps {
  name: string;
  onClick: (name: string) => void;
}
const SuggestItem = memo(function SuggestItem(props: SuggestItemProps) {
  const { name, onClick } = props;

  return (
    <li className="city-suggest-li" onClick={() => onClick(name)}>
      {name}
    </li>
  );
});

interface SuggestProps {
  searchKey: string;
  onSelect: (name: string) => void;
}

export const Suggest = memo(function Suggest(props: SuggestProps) {
  const { searchKey, onSelect } = props;

  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch("/rest/search?key=" + encodeURIComponent(searchKey))
      .then(res => res.json())
      .then(data => {
        const { result, searchKey: sKey } = data;

        if (sKey === searchKey) {
          setResult(result);
        }
      });
  }, [searchKey]);

  // No match
  const fallBackResult = useMemo(() => {
    if (!result.length) {
      return [
        {
          display: searchKey
        }
      ];
    }

    return result;
  }, [result, searchKey]);

  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {fallBackResult.map(item => {
          return (
            <SuggestItem
              key={item.display}
              name={item.display}
              onClick={onSelect}
            />
          );
        })}
      </ul>
    </div>
  );
});