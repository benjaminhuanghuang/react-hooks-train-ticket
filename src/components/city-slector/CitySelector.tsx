import React, { useState, useCallback, useEffect, useMemo, memo, ReactText } from "react";
import classnames from "classnames";
import "./CitySelector.css";

interface CityItemProps {
  name: string;
  onSelect: (key: ReactText) => void;
}
const CityItem = memo(function CityItem(props: CityItemProps) {
  const { name, onSelect } = props;

  return (
    <li className="city-li" onClick={() => onSelect(name)}>
      {name}
    </li>
  );
});
interface City {
  name: string;
}
interface CitySelectionProps {
  title: string;
  cities: City[];
  onSelect: (key: ReactText) => void;
}

export const CitySection = memo(function CitySection(
  props: CitySelectionProps
) {
  const { title, cities = [], onSelect } = props;

  return (
    <ul className="city-ul">
      <li className="city-li" key="title" data-cate={title}>
        {title}
      </li>
      {cities.map(city => {
        return (
          <CityItem key={city.name} name={city.name} onSelect={onSelect} />
        );
      })}
    </ul>
  );
});

interface AlphaIndexProps {
  alpha: string;
  onClick: (name: string) => void;
}

const AlphaIndex = memo(function AlphaIndex(props: AlphaIndexProps) {
  const { alpha, onClick } = props;

  return (
    <i className="city-index-item" onClick={() => onClick(alpha)}>
      {alpha}
    </i>
  );
});

const alphabet = Array.from(new Array(26), (ele, index) => {
  return String.fromCharCode(65 + index);
});

interface Selection {
  title: string;
  citys: City[];
}

interface CityListProp {
  sections: Selection[];
  onSelect: (key: ReactText) => void;
  toAlpha: (alpha:any) => void;
}

const CityList = memo(function CityList(props: CityListProp) {
  const { sections, toAlpha, onSelect } = props;

  return (
    <div className="city-list">
      <div className="city-cate">
        {sections.map(section => {
          return (
            <CitySection
              key={section.title}
              title={section.title}
              cities={section.citys}
              onSelect={onSelect}
            />
          );
        })}
      </div>
      <div className="city-index">
        {alphabet.map(alpha => {
          return <AlphaIndex key={alpha} alpha={alpha} onClick={toAlpha} />;
        })}
      </div>
    </div>
  );
});

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

const Suggest = memo(function Suggest(props: SuggestProps) {
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
interface CitySelectorProps {
  show?: boolean;
  cityData: any;
  isLoading: boolean;
  onBack: () => void;
  fetchCityData: () => void;
  onSelect: (key: ReactText) => void;
}

export const CitySelector = memo(function CitySelector(props:CitySelectorProps) {
  const { show, cityData, isLoading, onBack, fetchCityData, onSelect } = props;

  const [searchKey, setSearchKey] = useState("");

  const key = useMemo(() => searchKey.trim(), [searchKey]);

  useEffect(() => {
    if (!show || cityData || isLoading) {
      return;
    }

    fetchCityData();
  }, [show, cityData, isLoading]);

  const toAlpha = useCallback(alpha => {
    document.querySelector(`[data-cate='${alpha}']`)?.scrollIntoView();
  }, []);

  const outputCitySections = () => {
    if (isLoading) {
      return <div>loading</div>;
    }

    if (cityData) {
      return (
        <CityList
          sections={cityData.cityList}
          onSelect={onSelect}
          toAlpha={toAlpha}
        />
      );
    }

    return <div>error</div>;
  };

  return (
    <div className={classnames("city-selector", { hidden: !show })}>
      <div className="city-search">
        <div className="search-back" onClick={() => onBack()}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchKey}
            className="search-input"
            placeholder="城市、车站的中文或拼音"
            onChange={e => setSearchKey(e.target.value)}
          />
        </div>
        <i
          onClick={() => setSearchKey("")}
          className={classnames("search-clean", {
            hidden: key.length === 0
          })}
        >
          &#xf063;
        </i>
      </div>
      {Boolean(key) && (
        <Suggest searchKey={key} onSelect={key => onSelect(key)} />
      )}
      {outputCitySections()}
    </div>
  );
});

