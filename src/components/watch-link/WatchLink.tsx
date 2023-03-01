import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

const Watch = ({ vId, children }: PropsWithChildren & { vId: string }) => {
    return <Link to={"/watch?v=" + vId}>{children}</Link>;
};

export default Watch;
