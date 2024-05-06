import Login from '../pages/Login.jsx';
import Register from "../pages/Register.jsx";
import Gtr from "../pages/Gtr.jsx";
import Library from "../pages/Library.jsx";

export const privateRoutes = [
    { path:'/gtr', element: <Gtr/>},
    { path:'/library', element: <Library/>}
]
export const publicRoutes = [
    { path:'/login', element: <Login/>, },
    { path:'/register', element: <Register/>}
]


