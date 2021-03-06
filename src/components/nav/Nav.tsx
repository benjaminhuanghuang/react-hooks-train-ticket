/*
  Used in Query.html. query prev day and next day
*/
import React, { useMemo, memo } from "react";
import classnames from "classnames";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "./Nav.css";

interface NavProps {
  date: number;
  prev: () => void;
  next: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

export const Nav = memo(function Nav(props: NavProps) {
  const { date, prev, next, isPrevDisabled, isNextDisabled } = props;

  const currentString = useMemo(() => {
    const d = dayjs(date);
    return d.format("M月D日 ") + d.locale("zh-cn").format("ddd");
  }, [date]);

  return (
    <div className="nav">
      <span
        onClick={prev}
        className={classnames("nav-prev", {
          "nav-disabled": isPrevDisabled
        })}
      >
        前一天
      </span>
      <span className="nav-current">{currentString}</span>
      <span
        onClick={next}
        className={classnames("nav-next", {
          "nav-disabled": isNextDisabled
        })}
      >
        后一天
      </span>
    </div>
  );
});
