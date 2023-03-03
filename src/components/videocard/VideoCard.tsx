import React from "react";
import { ISearchVideoItem } from "../../interfaces/ISearchVideoList";
import { IVideoItem } from "../../interfaces/IVideoList";
import Card, { TVideoDetails } from "./Card";

type Props<T> = {
    videoDetails: T;
    orientation?: "landscape" | "portrait";
    channelIcon?: boolean;
    channelName?: boolean;
    description?: boolean;
};

const instanceOfVideoItem = (data: any): data is IVideoItem => {
    if (typeof data.id === "string") return true;

    return false;
};

function VideoCard(options: Props<IVideoItem>): JSX.Element;
function VideoCard(options: Props<ISearchVideoItem>): JSX.Element;
function VideoCard({ videoDetails, ...props }: Props<IVideoItem | ISearchVideoItem>) {
    let videoInfo: TVideoDetails = {
        id: "",
        title: "",
        duration: "",
        channelTitle: "",
        viewCount: 0,
        publishedAt: new Date(),
        description: "",
        thumbnails: {},
    };

    if (instanceOfVideoItem(videoDetails)) {
        const { snippet, statistics, contentDetails } = videoDetails;

        videoInfo = {
            id: videoDetails.id,
            title: snippet?.title ?? "",
            description: snippet?.description ?? "",
            duration: contentDetails?.duration ?? "",
            channelTitle: snippet?.channelTitle ?? "",
            viewCount: Number(statistics?.viewCount) ?? 0,
            publishedAt: snippet?.publishedAt ?? new Date(),
            thumbnails: snippet?.thumbnails ?? {},
        };
    } else {
        const { snippet } = videoDetails;

        videoInfo = {
            id: videoDetails.id.videoId || "",
            title: snippet?.title ?? "",
            description: snippet?.description ?? "",
            // duration: snippet?.duration ?? "",
            duration: "",
            channelTitle: snippet?.channelTitle ?? "",
            // viewCount: Number(snippet?.viewCount) ?? 0,
            viewCount: 0,
            publishedAt: snippet?.publishedAt ?? new Date(),
            thumbnails: snippet?.thumbnails ?? {},
        };
    }

    return <Card {...props} videoDetails={videoInfo} />;
}

export default VideoCard;
