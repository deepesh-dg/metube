import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import conf from "../../conf/conf";
import useFetch from "../../hooks/useFetch";
import { IVideoList } from "../../interfaces/IVideoList";
import { openSidebar } from "../../state/collapseSidebarSlide";
import VideoCard from "../videocard/VideoCard";
import style from "./Trending.module.scss";

const Trending = () => {
    const { data, loader, error } = useFetch<IVideoList>(conf.api.segment.videoList, {
        query: [
            ["maxResults", "50"],
            ["part", "snippet,contentDetails,statistics"],
            ["chart", "mostPopular"],
            ["regionCode", "IN"],
        ],
    });

    const dispatch = useDispatch();

    // Opening Sicebar
    useEffect(() => {
        dispatch(openSidebar());
    });

    if (loader) return <h2>Loading</h2>;

    if (error) return <h2>Error Fetching Videos</h2>;

    return data ? (
        <div className={style.trending}>
            <div className="container-fluid">
                <div className="row g-3">
                    {data.items.map((videoDetails) => (
                        <div key={videoDetails.id} className="col-12">
                            <VideoCard
                                videoDetails={videoDetails}
                                orientation="landscape"
                                description
                                channelIcon={false}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : null;
};

export default Trending;
