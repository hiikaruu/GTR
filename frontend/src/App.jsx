
import AppRouter from "./AppRouter.jsx";
import {BrowserRouter} from "react-router-dom";
const App = () => {
    return(
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
};

export default App;