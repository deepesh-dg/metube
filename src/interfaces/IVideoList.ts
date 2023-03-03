export interface IThumbnails {
    default?: {
        url: string;
        width: 120;
        height: 90;
    };
    medium?: {
        url: string;
        width: 320;
        height: 180;
    };
    high?: {
        url: string;
        width: 480;
        height: 360;
    };
    standard?: {
        url: string;
        width: 640;
        height: 480;
    };
    maxres?: {
        url: string;
        width: 1280;
        height: 720;
    };
}

export interface ISnippet {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: IThumbnails;
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    localized: {
        title: string;
        description: string;
    };
    defaultAudioLanguage: string;
}

export interface IVideoItem {
    kind: "youtube#video" | "youtube#movie" | "youtube#channel" | "youtube#playlist";
    etag: string;
    id: string;
    snippet?: ISnippet;
    contentDetails?: {
        duration: string;
        dimension: string;
        definition: string;
        caption: string;
        licensedContent: boolean;
        regionRestriction: {
            allowed: string[];
        };
        contentRating: {};
        projection: string;
    };
    statistics?: {
        viewCount: string;
        likeCount: string;
        favoriteCount: string;
        commentCount: string;
    };
}

export interface IVideoList {
    kind: string;
    etag: string;
    items: IVideoItem[];
    nextPageToken: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
}
