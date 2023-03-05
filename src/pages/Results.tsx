import React from "react";
import { useSearchParams } from "react-router-dom";
import VideoCard from "../components/videocard/VideoCard";
import conf from "../conf/conf";
import useFetch from "../hooks/useFetch";
import { ISearchVideoList } from "../interfaces/ISearchVideoList";

const Results = () => {
    const [urlSearchParam] = useSearchParams();
    const query = urlSearchParam.get("search_query") || "";

    const { data, loader, error } = useFetch<ISearchVideoList>(conf.api.segment.search, {
        query: [
            ["q", query],
            ["part", "snippet"],
            ["maxResults", "20"],
        ],
    });

    if (loader) return <h2>Loading</h2>;

    if (error) return <h2>Error Fetching Videos</h2>;

    return data ? (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: "900px",
            }}
        >
            <div className="py-3">
                <div className="row g-3">
                    {data.items.map((videoDetails) => {
                        if (videoDetails.id.kind === "youtube#video")
                            return (
                                <div key={videoDetails.id.videoId} className="col-12">
                                    <VideoCard
                                        videoDetails={videoDetails}
                                        orientation="landscape"
                                        description
                                        channelIcon={false}
                                    />
                                </div>
                            );
                        else if (videoDetails.id.kind === "youtube#channel")
                            return <div key={videoDetails.id.channelId}></div>;

                        return null;
                    })}
                </div>
            </div>
        </div>
    ) : null;
};

export default Results;
