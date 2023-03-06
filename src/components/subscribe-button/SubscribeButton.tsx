import React from "react";
import { useDispatch } from "react-redux";
import { IChannelDetails } from "../../interfaces/IChannelList";
import { useAppSelector } from "../../state/store";
import { add, remove } from "../../state/subscriptionSlide";

const SubscribeButton = ({ channelDetails }: { channelDetails: IChannelDetails }) => {
    const subscriptionList = useAppSelector((store) => store.subscription);

    const isSubscribed: boolean = subscriptionList.filter((channel) => channel.id === channelDetails.id).length > 0;

    const dispatch = useDispatch();

    const toggleSubscription = () => {
        if (isSubscribed) dispatch(remove(channelDetails.id));
        else dispatch(add(channelDetails));
    };

    return (
        <button
            className={`btn btn-${isSubscribed ? "light" : "primary"} rounded-pill`}
            onClick={() => toggleSubscription()}
        >
            {isSubscribed ? "Subscribed" : "Subscribe"}
        </button>
    );
};

export default SubscribeButton;
