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
        <header className="header sticky-top" id="header" style={{ backgroundColor: "#fff" }}>
            <nav className="navbar navbar-light">
                <div className="container-fluid">
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
                    <div className="searchBar">
                        <SearchBar />
                    </div>
                    <div className="profile">Profile</div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
