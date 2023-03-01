import moment from "moment";
import React from "react";
import { IThumbnails, IVideoItem } from "../../interfaces/IVideoList";
import WatchLink from "../watch-link/WatchLink";
import style from "./VideoCard.module.scss";

type Props = {
    videoDetails: IVideoItem;
    orientation?: "landscape" | "portrait";
    channelIcon?: boolean;
    channelName?: boolean;
    description?: boolean;
};

export const getCount = (count: number): string => {
    if (isNaN(count)) return "0";

    const BILLION = 1_000_000_000,
        MILLION = 1_000_000,
        THOUSAND = 1_000;

    if (count / BILLION >= 1) {
        const value = count / BILLION;
        return value.toFixed(2) + "B";
    }
    if (count / MILLION >= 1) {
        const value = count / MILLION;
        return value.toFixed(1) + "M";
    }
    if (count / THOUSAND >= 1) {
        const value = count / THOUSAND;
        return value.toFixed(0) + "K";
    }

    return count.toString();
};

export const getDuration = (duration: string): string => {
    const d = moment.duration(duration);

    const prepend = (digit: number, by: number = 2) => {
        return digit.toLocaleString("en-US", { minimumIntegerDigits: by, useGrouping: false });
    };

    return `${d.hours() !== 0 ? prepend(d.hours()) + ":" : ""}${prepend(d.minutes())}:${prepend(d.seconds())}`;
};

export const publishedAt = (date: Date): string => {
    return moment(date).toNow().replace("in ", "");
};

export const getThumbnail = (
    data: IThumbnails,
    preference: keyof IThumbnails
): { url: string; width: number; height: number } => {
    const iterate: Array<keyof IThumbnails> = ["maxres", "standard", "high", "medium", "default"];

    const thumbnail = {
        url: "",
        width: 0,
        height: 0,
    };

    iterate.forEach((type, index) => {
        if (iterate.indexOf(preference) === -1 || index < iterate.indexOf(preference)) return;

        if (data[type] && !thumbnail.url) {
            thumbnail.url = data[type]?.url as string;
            thumbnail.width = data[type]?.width as number;
            thumbnail.height = data[type]?.height as number;
        }
    });

    return thumbnail;
};

const VideoCard = ({
    videoDetails,
    orientation = "portrait",
    channelIcon = true,
    channelName = true,
    description = false,
}: Props) => {
    const { snippet, statistics, contentDetails } = videoDetails;

    return snippet ? (
        <div className={style.videocard}>
            <div className="row gx-2">
                <div className={orientation === "portrait" ? "col-12" : "col-5"}>
                    <div className={style.thumbnail}>
                        <WatchLink vId={videoDetails.id}>
                            <div className={style.image}>
                                <img
                                    src={getThumbnail(snippet.thumbnails, "standard").url}
                                    alt={snippet.title}
                                    width={getThumbnail(snippet.thumbnails, "standard").width}
                                    height={getThumbnail(snippet.thumbnails, "standard").height}
                                    className="img-fluid"
                                />
                            </div>
                            <div className={style.duration}>{getDuration(contentDetails?.duration || "")}</div>
                        </WatchLink>
                    </div>
                </div>
                <div className={orientation === "portrait" ? "col-12" : "col-7"}>
                    <div className={style.content}>
                        <div className={`row gx-2 h-100 ${orientation === "portrait" ? "py-2" : ""}`}>
                            <div className={`col-2 ${!channelIcon ? "d-none" : ""}`}></div>
                            <div className={`${channelIcon ? "col-10" : "col-12"}`}>
                                <div className={style.textContent}>
                                    <h6 className={style.title} title={snippet.title}>
                                        <WatchLink vId={videoDetails.id}>{snippet.title}</WatchLink>
                                    </h6>
                                    <div className="">
                                        <p className={`mb-0 ${style.channelName} ${!channelName ? "d-none" : ""}`}>
                                            {snippet.channelTitle}
                                        </p>
                                        <p className={`${style.viewsAndTime} mb-0`}>
                                            {getCount(Number(statistics?.viewCount))}&nbsp;views&nbsp;-&nbsp;
                                            {publishedAt(snippet.publishedAt)}&nbsp;ago
                                        </p>
                                    </div>
                                    <p className={`${style.description} ${description ? "" : "d-none"}`}>
                                        {snippet.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default VideoCard;
