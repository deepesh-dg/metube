import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { useAppSelector } from "../state/store";

function App() {
    const collapsed = useAppSelector((state) => state.collapseSidebar.collapsed);

    return (
        <Fragment>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    {!collapsed && (
                        <div className="col-12 col-md-4 col-lg-3 col-xxl-2">
                            <Sidebar />
                        </div>
                    )}
                    <div className="col">
                        <Outlet />
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </Fragment>
    );
}

export default App;
