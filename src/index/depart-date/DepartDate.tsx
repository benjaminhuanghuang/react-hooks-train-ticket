/*
  Show depart date of the train ticket
*/
import React, { useMemo } from "react";
import { h0 } from "../../utilities";  
import dayjs from "dayjs";
import "./DepartDate.css";

interface DepartDateProps {
  time: number;  // Unix timestamp
  onClick: () => void;  // Pop the date select
}

export const DepartDate = (props: DepartDateProps) => {
  const { time, onClick } = props;
  // Cut the hour, minute, second, millisecond from timestamp
  const h0OfDepart = h0(time);
  const departDate = new Date(h0OfDepart);

  const departDateString = useMemo(() => {
    return dayjs(h0OfDepart).format("YYYY-MM-DD");
  }, [h0OfDepart]);   // avoid refresh in one day

  const isToday = h0OfDepart === h0();

  const weekString =
    "周" +
    ["日", "一", "二", "三", "四", "五", "六"][departDate.getDay()] +
    (isToday ? "(今天)" : "");

  return (
    <div className="depart-date" onClick={onClick}>
      <input type="hidden" name="date" value={departDateString} />
      {departDateString} <span className="depart-week">{weekString}</span>
    </div>
  );
};