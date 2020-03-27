import React, { memo } from "react";
import "./Component.css";

interface ComonentProps {}

export const Comonent = memo(function Comonent(props: ComonentProps) {
  return <div className="city-list"></div>;
});
