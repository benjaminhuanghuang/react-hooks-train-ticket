import React, { ReactText } from "react";
import classnames from "classnames";
import { Header } from "../header/Header";

import "../date-selector/DateSelector.css";

import {Month} from './Month'

interface DateSelectorProps {
  show?: boolean;
  onSelect: (key: ReactText) => void;
  onBack: () => void;
}

export function DateSelector(props: DateSelectorProps) {
  const { show, onSelect, onBack } = props;

  const now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  now.setDate(1);   // now is the 1 day 00:00 of crrent month

  const monthSequence = [now.getTime()];

  // push the 1 day 00:00 of next month (month + 1), year + 1 if curren month is 12
  now.setMonth(now.getMonth() + 1);    
  monthSequence.push(now.getTime());

  // push the 1 day 00:00 of next month (month + 1), year + 1 if curren month is 12
  now.setMonth(now.getMonth() + 1);  
  monthSequence.push(now.getTime());

  return (
    <div className={classnames("date-selector", { hidden: !show })}>
      <Header title="日期选择" onBack={onBack} />
      <div className="date-selector-tables">
        {monthSequence.map(month => {
          return (
            <Month
              key={month}
              onSelect={onSelect}
              startingTimeInMonth={month}  
            />
          );
        })}
      </div>
    </div>
  );
}
