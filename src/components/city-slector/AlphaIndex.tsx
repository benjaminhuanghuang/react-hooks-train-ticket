/*
  One item in the A to Z list, locate the cities when user click the it
*/

import React, { memo } from "react";

interface AlphaIndexProps {
  alpha: string;
  // scholl city group into view
  onClick: (name: string) => void;
}

export const AlphaIndex = memo(function AlphaIndex(props: AlphaIndexProps) {
  const { alpha, onClick } = props;

  return (
    <i className="city-index-item" onClick={() => onClick(alpha)}>
      {alpha}
    </i>
  );
});
