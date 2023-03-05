import React from "react";
import VideoCard from "../components/videocard/VideoCard";
import useTitle from "../hooks/useTitle";
import { useAppSelector } from "../state/store";

const History = () => {
    const history = useAppSelector((state) => state.history);

    useTitle("History");

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", maxWidth: "900px" }}>
            <div className="row gy-3 flex-column-reverse">
                {history.map((video) => (
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
                {history.length === 0 && (
                    <div className="col-12">
                        <div className="text-center">No Videos Found</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
