import React from "react";
import { NavLink } from "react-router-dom";

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
        <div className="list-group text-center list-group-flush">
            {navItems.map((item, index) => (
                <NavLink
                    className={({ isActive, isPending }) => {
                        const append = isActive ? "active" : "";

                        return `list-group-item list-group-item-action rounded-3 ${append}`;
                    }}
                    key={index}
                    to={item.to}
                >
                    {item.name}
                </NavLink>
            ))}
        </div>
    );
};

export default Sidebar;
