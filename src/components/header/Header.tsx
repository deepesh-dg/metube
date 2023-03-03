import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleSidebar } from "../../state/collapseSidebarSlide";
import SearchBar from "./SearchBar";

const Header = () => {
    const dispatch = useDispatch();

    const toggle = () => {
        dispatch(toggleSidebar());
    };

    return (
        <header className="header sticky-top py-3" id="header" style={{ backgroundColor: "#fff" }}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 mb-3 mb-sm-0 col-sm-6 col-md-4 col-lg-2">
                        <div className="logo">
                            <button className="btn me-2" onClick={toggle}>
                                <svg
                                    viewBox="0 0 24 24"
                                    preserveAspectRatio="xMidYMid meet"
                                    focusable="false"
                                    style={{
                                        pointerEvents: "none",
                                        display: "block",
                                        width: "28px",
                                        height: "100%",
                                    }}
                                >
                                    <g>
                                        <path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"></path>
                                    </g>
                                </svg>
                            </button>
                            <Link to="/" className="navbar-brand">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1KChstctwL8AFPU4BCMdznfWhaTGO9uC6Gw&usqp=CAU"
                                    alt="Logo"
                                    className="img-fluid"
                                    width="125px"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="d-none d-lg-block col-lg-1"></div>
                    <div className="col-12 col-sm-6 col-md-8 col-lg-6">
                        <div className="searchBar">
                            <SearchBar />
                        </div>
                    </div>
                    <div className="d-none d-lg-block col-lg-1"></div>
                    <div className="d-none d-lg-block col-lg-2"></div>
                </div>
            </div>
        </header>
    );
};

export default Header;
