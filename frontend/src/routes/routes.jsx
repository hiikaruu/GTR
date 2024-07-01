import Login from '../pages/Login.jsx';
import Register from "../pages/Register.jsx";
import Gtr from "../pages/Gtr.jsx";
import Library from "../pages/Library.jsx";
import Book from "../pages/Book.jsx";
import BookDetails from "../pages/BookDetails.jsx";
import Profile from "../pages/Profile.jsx";

export const privateRoutes = [
    { path:'/gtr', element: <Gtr/>},
    { path:'/library', element: <Library/>},
    { path:'/new_book', element: <Book/>},
    { path:'/book/:bookId', element: <BookDetails/>},
    { path:'/profile', element: <Profile/>},

]
export const publicRoutes = [
    { path:'/login', element: <Login/>, },
    { path:'/register', element: <Register/>}
]


