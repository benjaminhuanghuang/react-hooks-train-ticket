import React, { Component, lazy , Suspense} from "react";

import Loading from "./Loading"

const About = lazy(()=>import(/* webpackChunkName: "about"*/'./About'))

export default class LazyDemoApp extends Component {
  render() {
    return (
      <div>
        <Suspense fallback={<Loading/>}>
        <About/>
        </Suspense>
    
      </div>
    )
  }
}
