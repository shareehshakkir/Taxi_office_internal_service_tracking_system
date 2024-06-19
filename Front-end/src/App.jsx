import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "@driver/Login";
import { Dashboard } from "@driver/Dashboard";
import { Layout } from "@components";
import { AuthProvider } from "@context/AuthContext.jsx";
import { RequireLogin } from "@components/RequireLogin";
import { RideRequests } from "@driver/RideRequests";
import { Ongoing } from "@driver/Ongoing";
import { Completed } from "@driver/Completed";
import { Canceled } from "@driver/Canceled";
import { Earnings } from "@driver/Earnings";
import { ViewRideRequests } from "@components/ViewRideRequests";
import { Profile } from "@driver/Profile";

import { AdminLogin } from "@admin/AdminLogin";
import { CarsAndDrivers } from "./admin/CarsAndDrivers";
import { CarsAndDriversDetails } from "./admin/CarAndDriverDetails";
import { AdminDashboard } from "@admin/Dashboard";

import { AdminRideRequests } from "@admin/RideRequests";
import { AdminOngoing } from "@admin/Ongoing";
import { AdminCompleted } from "@admin/Completed";
import { AdminCanceled } from "@admin/Canceled";
import { AdminEarnings } from "@admin/Earnings";
import { SignUp } from "./driver/SignUp";
import { AdminViewRideRequests } from "@admin/ViewRideRequests";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <RequireLogin role="driver">
                    <Dashboard />
                  </RequireLogin>
                }
              />

              <Route
                path="received_rides"
                element={
                  <RequireLogin role="driver">
                    <RideRequests />
                  </RequireLogin>
                }
              />
              <Route
                path="received_rides/:id"
                element={
                  <RequireLogin role="driver">
                    <ViewRideRequests />
                  </RequireLogin>
                }
              />
              <Route
                path="Ongoing_rides"
                element={
                  <RequireLogin role="driver">
                    <Ongoing />
                  </RequireLogin>
                }
              />
              <Route
                path="ongoing_rides/:id"
                element={
                  <RequireLogin role="driver">
                    <ViewRideRequests />
                  </RequireLogin>
                }
              />
              <Route
                path="completed_rides"
                element={
                  <RequireLogin role="driver">
                    <Completed />
                  </RequireLogin>
                }
              />
              <Route
                path="completed_rides/:id"
                element={
                  <RequireLogin role="driver">
                    <ViewRideRequests />
                  </RequireLogin>
                }
              />
              <Route
                path="canceled_rides"
                element={
                  <RequireLogin role="driver">
                    <Canceled />
                  </RequireLogin>
                }
              />
              <Route
                path="earnings"
                element={
                  <RequireLogin role="driver">
                    <Earnings />
                  </RequireLogin>
                }
              />
              <Route
                path="profile"
                element={
                  <RequireLogin role="driver">
                    <Profile />
                  </RequireLogin>
                }
              />
            </Route>
          </Routes>

          {/* Admin */}
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="admin" element={<Layout />}>
              <Route
                index
                element={
                  <RequireLogin role="admin">
                    <AdminDashboard />
                  </RequireLogin>
                }
              />

              <Route
                path="received_rides"
                element={
                  <RequireLogin role="admin">
                    <AdminRideRequests />
                  </RequireLogin>
                }
              />
              <Route
                path="received_rides/:id"
                element={
                  <RequireLogin role="admin">
                    <AdminViewRideRequests />
                  </RequireLogin>
                }
              />
              <Route
                path="cars_and_drivers"
                element={
                  <RequireLogin role="admin">
                    <CarsAndDrivers />
                  </RequireLogin>
                }
              />
              <Route
                path="cars_and_drivers/:id"
                element={
                  <RequireLogin role="admin">
                    <CarsAndDriversDetails />
                  </RequireLogin>
                }
              />
              <Route
                path="Ongoing_rides"
                element={
                  <RequireLogin role="admin">
                    <AdminOngoing />
                  </RequireLogin>
                }
              />
              <Route
                path="ongoing_rides/:id"
                element={
                  <RequireLogin role="admin">
                    <AdminViewRideRequests />
                  </RequireLogin>
                }
              />
              <Route
                path="completed_rides"
                element={
                  <RequireLogin role="admin">
                    <AdminCompleted />
                  </RequireLogin>
                }
              />
              <Route
                path="completed_rides/:id"
                element={
                  <RequireLogin role="admin">
                    <AdminViewRideRequests />
                  </RequireLogin>
                }
              />
              <Route
                path="canceled_rides"
                element={
                  <RequireLogin role="admin">
                    <AdminCanceled />
                  </RequireLogin>
                }
              />
              <Route
                path="earnings"
                element={
                  <RequireLogin role="admin">
                    <AdminEarnings />
                  </RequireLogin>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
