import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import conf from "../../conf/conf";
import useFetch from "../../hooks/useFetch";
import IChannelList from "../../interfaces/IChannelList";
import SubscribeButton from "../subscribe-button/SubscribeButton";
import { getCount, getThumbnail } from "../videocard/Card";
import style from "./ChannelDetails.module.scss";

const ChannelDetails = ({ channelId }: { channelId: string }) => {
    const { data, loader, error } = useFetch<IChannelList>(conf.api.segment.channels, {
        query: [
            ["id", channelId],
            ["part", "brandingSettings,contentDetails,id,localizations,snippet,statistics,status,topicDetails"],
        ],
    });

    const channelInfo = data ? data.items[0] : undefined;

    const navigate = useNavigate();

    useEffect(() => {
        if (data && data.items.length === 0) navigate({ pathname: "/" });
    }, [data]);

    if (loader) return <p>Loader</p>;

    if (error) return <p>Error getting channel details</p>;

    return channelInfo ? (
        <div className="d-flex align-items-center">
            <div className={style.profile}>
                <div className={style.image}>
                    <img
                        src={getThumbnail(channelInfo.snippet?.thumbnails || {}, "default").url}
                        alt={channelInfo.snippet?.title}
                        className="img-fluid"
                    />
                </div>
            </div>
            <div className={style.details}>
                <h2 className={style.title}>{channelInfo.snippet?.title}</h2>
                <p className={style.subscriber}>{getCount(channelInfo.statistics?.subscriberCount || 0)} subscribers</p>
            </div>
            <div className={style.subscriptionBtn}>
                <SubscribeButton channelDetails={channelInfo} />
            </div>
        </div>
    ) : null;
};

export default ChannelDetails;
