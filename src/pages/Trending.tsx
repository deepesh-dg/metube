import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import TrendingComponent from "../components/feed/Feed";
import conf from "../conf/conf";
import useFetch from "../hooks/useFetch";
import useTitle from "../hooks/useTitle";
import { IVideoList } from "../interfaces/IVideoList";
import { openSidebar } from "../state/collapseSidebarSlide";

const Trending = () => {
    const { data, loader, error } = useFetch<IVideoList>(conf.api.segment.videoList, {
        query: [
            ["maxResults", "50"],
            ["part", "snippet,contentDetails,statistics"],
            ["chart", "mostPopular"],
            ["regionCode", "IN"],
        ],
    });

    const dispatch = useDispatch();

    // Opening Sidebar
    useEffect(() => {
        dispatch(openSidebar());
    });

    useTitle("Trending");

    if (loader) return <h2>Loading</h2>;

    if (error) return <h2>Error Fetching Videos</h2>;

    return data ? <TrendingComponent videos={data.items} /> : null;
};

export default Trending;
