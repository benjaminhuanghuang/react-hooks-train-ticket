import React, { ReactText } from "react";
import classnames from "classnames";
import { h0 } from "../../utilities";
//
import {Day} from './Day'

interface WeekProps {
  days: number[];
  onSelect: (key: ReactText) => void;
}

export function Week(props: WeekProps) {
  const { days, onSelect } = props;

  return (
    <tr className="date-table-days">
      {days.map((day, idx) => {
        return <Day key={idx} day={day} onSelect={onSelect} />;
      })}
    </tr>
  );
}