import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import "./assets/scss/style.scss";
import { Provider } from "react-redux";
import store from "./state/store";
import Index from "./pages/Index";
import Watch from "./pages/Watch";
import Trending from "./pages/Trending";
import Error from "./pages/Error";
import Results from "./pages/Results";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Index />,
            },
            {
                path: "/watch",
                element: <Watch />,
            },
            {
                path: "/trending",
                element: <Trending />,
            },
            {
                path: "/results",
                element: <Results />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
