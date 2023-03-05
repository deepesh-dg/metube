import React from "react";
import VideoCard from "../components/videocard/VideoCard";
import useTitle from "../hooks/useTitle";
import { useAppSelector } from "../state/store";

const WatchLater = () => {
    const watchLater = useAppSelector((state) => state.watchLater);

    useTitle("Watch later");

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", maxWidth: "900px" }}>
            <div className="row gy-3">
                {watchLater.map((video) => (
                    <div className="col-12" key={video.id}>
                        <VideoCard
                            videoDetails={video}
                            orientation="landscape"
                            description
                            channelIcon={false}
                            watchLater
                        />
                    </div>
                ))}
                {watchLater.length === 0 && (
                    <div className="col-12">
                        <div className="text-center">No Videos Found</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WatchLater;
