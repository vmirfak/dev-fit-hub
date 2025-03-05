import { Outlet } from "react-router";
import { AuthProvider } from "./context/useAuth";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AuthProvider>
        <Outlet />
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;
