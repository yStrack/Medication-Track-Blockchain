import React from "react";
import { Switch, Route } from "react-router-dom";
import PharmacyDashboard from "./pages/pharmacy/index";
import DoctorDashboard from "./pages/doctor/index";
import PatientDashboard from "./pages/patient/index";

export default function Routes() {
  return (
    <Switch>
      <Route path="/pharmacy" exact component={PharmacyDashboard} />
      <Route path="/doctor" exact component={DoctorDashboard} />
      <Route path="/patient" exact component={PatientDashboard} />
    </Switch>
  );
}
