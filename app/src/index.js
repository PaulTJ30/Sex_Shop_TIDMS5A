import React from "react";
import ReactDOM from "react-dom/client"
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { Header } from "./components/Header";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
])
const user = localStorage.user ? JSON.parse(localStorage.user) : undefined


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <>
            {
                user?.logined == true && (
                    <Header />
                )
            }
            <RouterProvider router={router} />
        </>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();