import Registration from "./pages/Authentication/Registration";
import Login from "./pages/Authentication/Login";
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from "./common/Loader";
import PageTitle from './components/PageTitle';
import { useEffect, useState } from "react";
import MyDashboard from "./pages/Dashboard/Dashboard";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Login setLoading={setLoading} />} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard" />
              <MyDashboard />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
