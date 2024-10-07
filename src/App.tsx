import Registration from "./pages/Authentication/Registration";
import Login from "./pages/Authentication/Login";
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from "./common/Loader";
import { useEffect, useState } from "react";

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
        <Route path="/register" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
