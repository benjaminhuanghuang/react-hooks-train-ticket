import { createStore, combineReducers, applyMiddleware } from "redux";

import reducers from "./reducers";
import thunk from "redux-thunk";

export default createStore(
  combineReducers(reducers),
  {
    from: "北京",
    to: "上海",
    isCitySelectorVisible: false,
    //bool indicate the selected value will be set to "from" or "to"
    currentSelectingLeftCity: false,
    // all city will be renderd on city selector
    cityData: null,
    // city data cames from api call
    isLoadingCityData: false,
    isDateSelectorVisible: false,
    departDate: Date.now(),
    highSpeed: false
  },
  applyMiddleware(thunk)
);
