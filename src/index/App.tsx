import React, { useCallback, useMemo } from "react";
import { bindActionCreators , Dispatch, AnyAction} from "redux";
import { connect } from "react-redux";

import "./App.css";

import { Header, CitySelector, DateSelector } from "../components/";

import {DepartDate} from "./depart-date/DepartDate";
import {HighSpeed} from "./high-speed/HighSpeed";
import {Journey} from "./journey/Journey";
import {Submit} from "./submit/Submit";

import { h0 } from "../utilities";

// import action creator, will be passed to dispatch
import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
  setDepartDate,
  toggleHighSpeed
} from "./redux/actions";

interface AppProps {
  from?: any;
  to?: any;
  isCitySelectorVisible?: boolean;
  isDateSelectorVisible?: boolean;
  cityData?: any;
  isLoadingCityData?: any;
  highSpeed: boolean;
  dispatch: Dispatch<AnyAction>;
  departDate?: any;
}

function App(props: AppProps) {
  const {
    from,
    to,
    isCitySelectorVisible,
    isDateSelectorVisible,
    cityData,
    isLoadingCityData,
    highSpeed,
    dispatch,
    departDate
  } = props;


  /*
    This method will return a new function when App component refresh, 
    that will case Header component refresh
  */
  const onBack_bad = () => {
    window.history.back();
  };

  const onBack = useCallback(() => {
    window.history.back();
  }, []);


  /* solution 1 */
  // const doExchangeFromTo = useCallback(()=>{
  //   dispatch(exchangeFromTo());
  // }, []);
  // const doShowCitySelector = useCallback((m)=>{
  //   dispatch(showCitySelector(m));
  // }, []);

  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo,
        showCitySelector
      },
      dispatch
    );
  }, []);

  const citySelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideCitySelector,
        fetchCityData,
        onSelect: setSelectedCity
      },
      dispatch
    );
  }, []);

  const departDateCbs = useMemo(() => {
    return bindActionCreators(
      {
        onClick: showDateSelector
      },
      dispatch
    );
  }, []);

  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideDateSelector
      },
      dispatch
    );
  }, []);

  const highSpeedCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggle: toggleHighSpeed
      },
      dispatch
    );
  }, []);

  const onSelectDate = useCallback(day => {
    if (!day) {
      return;
    }

    if (day < h0()) {
      return;
    }

    dispatch(setDepartDate(day));
    dispatch(hideDateSelector());
  }, []);

  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack} />
      </div>
      <form action="./query.html" className="form">
        <Journey from={from} to={to} {...cbs} />
        <DepartDate time={departDate} {...departDateCbs} />
        <HighSpeed highSpeed={highSpeed} {...highSpeedCbs} />
        <Submit />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      />
      <DateSelector
        show={isDateSelectorVisible}
        {...dateSelectorCbs}
        onSelect={onSelectDate}
      />
    </div>
  );
}

export default connect(
  // Import to, from .... from state
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch };
  }
)(App);
