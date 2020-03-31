import React, { useState, useCallback, useEffect, useMemo, memo, ReactText } from "react";
import classnames from "classnames";
import "./CitySelector.css";

import {AlphaIndex} from "./AlphaIndex"

import {Suggest} from "./Suggest"

/*
   Render one city in the city list for selection
*/
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

/*
  Render cities grouped by first character for selection
*/
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


interface Selection {
  title: string;
  citys: City[];
}


/*
  Whole city list
*/
interface CityListProp {
  sections: Selection[];
  onSelect: (key: ReactText) => void;
  toAlpha: (alpha:any) => void;
}

const CityList = memo(function CityList(props: CityListProp) {
  const { sections, toAlpha, onSelect } = props;

  const alphabet = Array.from(new Array(26), (ele, index) => {
    return String.fromCharCode(65 + index);
  });
  
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



/*
  City Selector
*/
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

  // response user click on character, scholl city group into view
  // Pass this function to AlphaIndex component
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
      {/* Show Suggest if user input search key */}
      {Boolean(key) && (
        <Suggest searchKey={key} onSelect={key => onSelect(key)} />
      )}
      {outputCitySections()}
    </div>
  );
});

