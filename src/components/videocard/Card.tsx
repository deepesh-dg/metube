import React from "react";
import { IThumbnails } from "../../interfaces/IVideoList";
import WatchLink from "../watch-link/WatchLink";
import style from "./VideoCard.module.scss";
import moment from "moment";
import { useAppSelector } from "../../state/store";
import { useDispatch } from "react-redux";
import { add, remove } from "../../state/watchLaterSlide";

export type TVideoDetails = {
    id: string;
    thumbnails: IThumbnails;
    title: string;
    duration: string;
    channelTitle: string;
    viewCount: number;
    publishedAt: Date;
    description: string;
};

type Props = {
    orientation?: "landscape" | "portrait";
    channelIcon?: boolean;
    channelName?: boolean;
    watchLater?: boolean;
    description?: boolean;
    videoDetails: TVideoDetails;
    original: any;
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

const Card = ({
    videoDetails,
    orientation = "portrait",
    channelIcon = true,
    channelName = true,
    watchLater = false,
    description = false,
    original,
}: Props) => {
    const watchLaterList = useAppSelector((store) => store.watchLater);

    const isWatchLater: boolean = watchLaterList.filter((video) => video.id === videoDetails.id).length > 0;

    const dispatch = useDispatch();

    const toggleWatchList = () => {
        if (isWatchLater) dispatch(remove(videoDetails.id));
        else dispatch(add(original));
    };

    return (
        <div className={style.videocard}>
            <div className="row gx-2">
                <div className={orientation === "portrait" ? "col-12" : "col-5"}>
                    <div className={style.thumbnail}>
                        <WatchLink vId={videoDetails.id}>
                            <div className={style.image}>
                                <img
                                    src={getThumbnail(videoDetails.thumbnails, "standard").url}
                                    alt={videoDetails.title}
                                    width={getThumbnail(videoDetails.thumbnails, "standard").width}
                                    height={getThumbnail(videoDetails.thumbnails, "standard").height}
                                    className="img-fluid"
                                />
                            </div>
                            <div className={style.duration}>{getDuration(videoDetails.duration)}</div>
                        </WatchLink>
                        {original.kind === "youtube#video" && watchLater ? (
                            <div className={style.watchLater}>
                                <button
                                    className="reset"
                                    title={isWatchLater ? "remove from watch later" : "add to watch later"}
                                    onClick={toggleWatchList}
                                >
                                    {isWatchLater ? (
                                        <svg
                                            viewBox="0 0 24 24"
                                            preserveAspectRatio="xMidYMid meet"
                                            focusable="false"
                                            style={{ pointerEvents: "none", display: "block", width: "24px" }}
                                        >
                                            <g>
                                                <path d="M9,18.7l-5.4-5.4l0.7-0.7L9,17.3L20.6,5.6l0.7,0.7L9,18.7z"></path>
                                            </g>
                                        </svg>
                                    ) : (
                                        <svg
                                            viewBox="0 0 24 24"
                                            preserveAspectRatio="xMidYMid meet"
                                            focusable="false"
                                            style={{ pointerEvents: "none", display: "block", width: "24px" }}
                                        >
                                            <g>
                                                <path d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z"></path>
                                            </g>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className={orientation === "portrait" ? "col-12" : "col-7"}>
                    <div className={style.content}>
                        <div className={`row gx-2 h-100 ${orientation === "portrait" ? "py-2" : ""}`}>
                            <div className={`col-2 ${!channelIcon ? "d-none" : ""}`}></div>
                            <div className={`${channelIcon ? "col-10" : "col-12"}`}>
                                <div className={style.textContent}>
                                    <h6 className={style.title} title={videoDetails.title}>
                                        <WatchLink vId={videoDetails.id}>{videoDetails.title}</WatchLink>
                                    </h6>
                                    <div className="">
                                        <p className={`mb-0 ${style.channelName} ${!channelName ? "d-none" : ""}`}>
                                            {videoDetails.channelTitle}
                                        </p>
                                        <p className={`${style.viewsAndTime} mb-0`}>
                                            {getCount(Number(videoDetails?.viewCount))}&nbsp;views&nbsp;-&nbsp;
                                            {publishedAt(videoDetails.publishedAt)}&nbsp;ago
                                        </p>
                                    </div>
                                    <p className={`${style.description} ${description ? "" : "d-none"}`}>
                                        {videoDetails.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
