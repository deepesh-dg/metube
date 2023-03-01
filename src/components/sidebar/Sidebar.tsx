import React from "react";
import { Link } from "react-router-dom";

export type NavItem = {
    name: string;
    to: string;
};

const Sidebar = () => {
    const navItems: NavItem[] = [
        {
            name: "Home",
            to: "/",
        },
        {
            name: "Trending",
            to: "/trending",
        },
        {
            name: "Shorts",
            to: "/shorts",
        },
        {
            name: "Subscriptions",
            to: "/subscriptions",
        },
        {
            name: "Originals",
            to: "/originals",
        },
        {
            name: "MeTube Music",
            to: "/music",
        },
    ];

    return (
        <div className="list-group">
            {navItems.map((item, index) => (
                <Link className="list-group-item list-group-item-action" key={index} to={item.to}>
                    {item.name}
                </Link>
            ))}
        </div>
    );
};

export default Sidebar;
