import {Route, Routes, useNavigate} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./routes/routes.jsx";
import AuthService from "./api/auth.service.jsx";

const AppRouter= () => {

    const isLog = AuthService.isLoggedIn();

    return (
        <Routes>
            {isLog ? (
                privateRoutes.map(({ path, element }, index) => (
                    <Route key={index} path={path} element={element} />
                ))
            ) : (
                publicRoutes.map(({ path, element }, index) => (
                    <Route key={index} path={path} element={element} />
                ))
            )}
        </Routes>
    );
};
 export default AppRouter;