import React from "react";
import { IVideoItem } from "../../interfaces/IVideoList";

const VideoDetails = ({ videoDetails }: { videoDetails: IVideoItem }) => {
    return (
        <div className="videoContainer position-relative w-100" style={{ paddingTop: "56.25%" }}>
            <div
                className="video position-absolute overflow-hidden"
                style={{ top: 0, left: 0, bottom: 0, right: 0, borderRadius: "0.75rem" }}
            >
                <iframe
                    width="100%"
                    height="100%"
                    src={"https://www.youtube.com/embed/" + videoDetails.id + "?autoplay=1"}
                    title={videoDetails.snippet?.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default VideoDetails;
