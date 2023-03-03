import React from "react";
import { IVideoItem } from "../../interfaces/IVideoList";
import VideoCard from "../videocard/VideoCard";
import style from "./Feed.module.scss";

const Feed = ({ videos }: { videos: IVideoItem[] }) => {
    return (
        <div className={style.feed}>
            <div className="container-fluid">
                <div className="row g-3">
                    {videos.map((video) => (
                        <div key={video.id} className="col-12">
                            <VideoCard videoDetails={video} orientation="landscape" description channelIcon={false} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Feed;