import React, { useState } from "react";
import style from "./Description.module.scss";

const Description = ({ description }: { description: string }) => {
    const [collapsed, setCollapsed] = useState<boolean>(true);

    return (
        <div
            className={`${style.description} ${collapsed ? `btn btn-light ${style.collapsed}` : ""}`}
            onClick={() => collapsed && setCollapsed(false)}
        >
            {description}
            {!collapsed && (
                <>
                    <br />
                    <button className="btn btn-light mt-2" onClick={() => setCollapsed(true)}>
                        show less
                    </button>
                </>
            )}
        </div>
    );
};

export default Description;
