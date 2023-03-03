import React from "react";
import { NavLink } from "react-router-dom";

export type NavItem = {
    name: string;
    to?: string;
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
        },
        {
            name: "Subscriptions",
        },
        {
            name: "Originals",
        },
        {
            name: "MeTube Music",
        },
    ];

    return (
        <div className="list-group text-center list-group-flush">
            {navItems.map((item, index) =>
                item.to ? (
                    <NavLink
                        className={({ isActive }) => {
                            const append = isActive ? "active" : "";

                            return `list-group-item list-group-item-action rounded-3 ${append}`;
                        }}
                        key={index}
                        to={item.to}
                    >
                        {item.name}
                    </NavLink>
                ) : (
                    <div className="list-group-item list-group-item-action rounded-3" key={index}>
                        {item.name}
                    </div>
                )
            )}
        </div>
    );
};

export default Sidebar;
