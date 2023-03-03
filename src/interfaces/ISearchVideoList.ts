import { IThumbnails } from "./IVideoList";

export interface ISearchVideoItem {
    kind: string;
    etag: string;
    id: {
        kind: "youtube#video" | "youtube#movie" | "youtube#channel" | "youtube#playlist";
        videoId?: string;
        channelId?: string;
        playlistId?: string;
    };
    snippet: {
        publishedAt: Date;
        channelId: string;
        title: string;
        description: string;
        thumbnails: IThumbnails;
        channelTitle: string;
        liveBroadcastContent: string;
        publishTime: Date;
    };
}

export interface ISearchVideoList {
    kind: string;
    etag: string;
    nextPageToken: string;
    regionCode: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: ISearchVideoItem[];
}
