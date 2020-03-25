import React, { memo } from "react";
import "./Component.css";

interface ComonentProps {}

export const Comonent = memo(function Comonent(props: ComonentProps) {
  return <div className="city-list"></div>;
});


export const CitySelector = memo(function CitySelector(props: ComonentProps) {
    return <div className="city-list"></div>;
  });

  
  export const DateSelector = memo(function DateSelector(props: ComonentProps) {
    return <div className="city-list"></div>;
  });

  
  export const Detail = memo(function Detail(props: ComonentProps) {
    return <div className="city-list"></div>;
  });

  
  export const Nav = memo(function Nav(props: ComonentProps) {
    return <div className="city-list"></div>;
  });

  export const Header = memo(function Header(props: ComonentProps) {
    return <div className="city-list"></div>;
  });
  