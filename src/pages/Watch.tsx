import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Sidebar from "../components/video-details-sidebar/Sidebar";
import VideoDetails from "../components/video-details/VideoDetails";
import conf from "../conf/conf";
import useFetch from "../hooks/useFetch";
import useTitle from "../hooks/useTitle";
import { IVideoList } from "../interfaces/IVideoList";
import { closeSidebar, openSidebar } from "../state/collapseSidebarSlide";
import { add } from "../state/historySlide";

const Watch = () => {
    const [urlSearchParam] = useSearchParams();
    const navigate = useNavigate();
    const vId = urlSearchParam.get("v") || "";

    const { data, loader, error } = useFetch<IVideoList>(conf.api.segment.videoList, {
        query: [
            ["id", vId],
            ["part", "snippet,contentDetails,statistics"],
        ],
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (!vId || (data && data?.items.length === 0)) {
            navigate("/");
            return;
        }
        dispatch(closeSidebar());

        return () => {
            dispatch(openSidebar());
        };
    });

    useEffect(() => {
        if (data) dispatch(add(data.items[0]));
    }, [data]);

    useTitle(data?.items[0].snippet?.title || "");

    if (loader) return <h2>Loading</h2>;

    if (error) return <h2>Error Fetching Videos</h2>;

    return data && data?.items.length > 0 ? (
        <div className="container-fluid">
            <div className="row g-3">
                <div className="col-12 col-xl-8 col-xxl-9">
                    <VideoDetails videoDetails={data.items[0]} />
                </div>
                <div className="col-12 col-xl-4 col-xxl-3">
                    <Sidebar />
                </div>
            </div>
        </div>
    ) : null;
};

export default Watch;
