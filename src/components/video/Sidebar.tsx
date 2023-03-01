import React from "react";
import conf from "../../conf/conf";
import useFetch from "../../hooks/useFetch";
import { IVideoList } from "../../interfaces/IVideoList";
import VideoCard from "../videocard/VideoCard";

const Sidebar = () => {
    const { data, loader, error } = useFetch<IVideoList>(conf.api.segment.videoList, {
        query: [
            ["maxResults", "10"],
            ["part", "snippet,contentDetails,statistics"],
            ["chart", "mostPopular"],
            ["regionCode", "IN"],
        ],
    });

    if (loader) return <h3>Loading</h3>;
    if (error) return <h3>error while fetching</h3>;

    return data ? (
        <div className="row gy-3">
            {data.items.map((video) => (
                <div className="col-12 col-md-6 col-xl-12" key={video.id}>
                    <VideoCard videoDetails={video} orientation="landscape" channelIcon={false} />
                </div>
            ))}
        </div>
    ) : null;
};

export default Sidebar;
