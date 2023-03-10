import VideoCard from "../components/videocard/VideoCard";
import conf from "../conf/conf";
import useFetch from "../hooks/useFetch";
import useTitle from "../hooks/useTitle";
import { IVideoList } from "../interfaces/IVideoList";

const Index = () => {
    const { data, loader, error } = useFetch<IVideoList>(conf.api.segment.videoList, {
        query: [
            ["maxResults", "50"],
            ["part", "snippet,contentDetails,statistics"],
            ["chart", "mostPopular"],
            ["regionCode", "IN"],
        ],
    });

    useTitle("Home");

    if (loader) return <h2>Loading</h2>;

    if (error) return <h2>Error Fetching Videos</h2>;

    return data ? (
        <div className="row g-3">
            {data.items.map((videoDetails) => (
                <div key={videoDetails.id} className="col-12 col-sm-6 col-lg-4 col-xxl-3">
                    <VideoCard videoDetails={videoDetails} watchLater />
                </div>
            ))}
        </div>
    ) : null;
};

export default Index;
