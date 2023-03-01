import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import conf from "../../conf/conf";
import useFetch from "../../hooks/useFetch";
import { IVideoList } from "../../interfaces/IVideoList";
import { closeSidebar } from "../../state/collapseSidebarSlide";
import Sidebar from "./Sidebar";

const Video = () => {
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
        if (!vId || (data && data?.items.length === 0)) navigate("/");
        dispatch(closeSidebar());
    });

    if (loader) return <h2>Loading</h2>;

    if (error) return <h2>Error Fetching Videos</h2>;

    return data && data?.items.length > 0 ? (
        <div className="container-fluid">
            <div className="row g-3">
                <div className="col-12 col-xl-8 col-xxl-9">
                    <div className="videoContainer position-relative w-100" style={{ paddingTop: "56.25%" }}>
                        <div
                            className="video position-absolute overflow-hidden"
                            style={{ top: 0, left: 0, bottom: 0, right: 0, borderRadius: "0.75rem" }}
                        >
                            <iframe
                                width="100%"
                                height="100%"
                                src={"https://www.youtube.com/embed/" + vId + "?autoplay=1"}
                                title={data.items[0].snippet?.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-xl-4 col-xxl-3">
                    <Sidebar />
                </div>
            </div>
        </div>
    ) : null;
};

export default Video;
