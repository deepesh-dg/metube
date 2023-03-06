import { IThumbnails } from "./IVideoList";

export interface ISnippet {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: Date;
    thumbnails: IThumbnails;
    defaultLanguage: string;
    localized: {
        title: string;
        description: string;
    };
    country: string;
}

export interface IContentDetails {
    relatedPlaylists: {
        likes: string;
        favorites: string;
        uploads: string;
    };
}

export interface IStatus {
    privacyStatus: string;
    isLinked: boolean;
    longUploadsStatus: string;
    madeForKids: boolean;
    selfDeclaredMadeForKids: boolean;
}

export interface IStatistics {
    viewCount: number;
    subscriberCount: number; // this value is rounded to three significant figures
    hiddenSubscriberCount: boolean;
    videoCount: number;
}

export interface IBrandingSettings {
    channel: {
        title: string;
        description: string;
        keywords: string;
        trackingAnalyticsAccountId: string;
        moderateComments: boolean;
        unsubscribedTrailer: string;
        defaultLanguage: string;
        country: string;
    };
    watch: {
        textColor: string;
        backgroundColor: string;
        featuredPlaylistId: string;
    };
}

export interface IAuditDetails {
    overallGoodStanding: boolean;
    communityGuidelinesGoodStanding: boolean;
    copyrightStrikesGoodStanding: boolean;
    contentIdClaimsGoodStanding: boolean;
}

export interface IContentOwnerDetails {
    contentOwner: string;
    timeLinked: Date;
}

export interface IChannelDetails {
    kind: "youtube#channel";
    etag: string;
    id: string;
    snippet?: ISnippet;
    contentDetails?: IContentDetails;
    statistics?: IStatistics;
    topicDetails?: {
        topicIds: [string];
        topicCategories: [string];
    };
    status?: IStatus;
    brandingSettings?: IBrandingSettings;
    auditDetails?: IAuditDetails;
    contentOwnerDetails?: IContentOwnerDetails;
    localizations?: {
        [key: string]: {
            title: string;
            description: string;
        };
    };
}

export interface IChannelList {
    kind: "youtube#channelListResponse";
    etag: string;
    nextPageToken?: string;
    prevPageToken?: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: IChannelDetails[];
}

export default IChannelList;
