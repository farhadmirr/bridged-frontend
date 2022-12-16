import Register from "./pages/Register"
import Login from "./pages/Login";
import React from 'react'
import Feed from "./pages/Feed";
import Unauthorized from "./components/Unauthorized";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import UserLayout from "./components/UserLayout";
import { Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*   Public Routes   */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/*   Private Routes(Need Auth)  */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<UserLayout />}>

          </Route>
        </Route>
        {/* Missing page */}
        <Route path="*" element={<NotFound />} />

      </Route>
      <Route path="/panel" element={<UserLayout />}>
        <Route path="home" element={<Feed />} />
      </Route>
    </Routes>
  );
}

export default App