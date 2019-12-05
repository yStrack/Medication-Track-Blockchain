import React from "react";
import { Switch, Route } from "react-router-dom";
import PharmacyDashboard from './pages/pharmacy/index';

export default function Routes() {
  return (
    <Switch>
      <Route path="/pharmacy" exact component={PharmacyDashboard} /> 
    </Switch>
  );
}
