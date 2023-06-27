import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import NotFound from "../pages/NotFound";

const token = localStorage.getItem('authToken')

const router = createBrowserRouter([
    {
        path: "/",
        element: token ? <Profile/> : <Navigate to={"/login"} />,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/register",
        element: <Register/>,
    },
    {
        path: "/forgotpassword",
        element: <ForgotPassword/>,
    },
    {
        path: "/passwordreset/:resetToken",
        element: <ResetPassword/>,
    },
    {
        path: '*',
        element: <NotFound/>,
    }
]);

export default router