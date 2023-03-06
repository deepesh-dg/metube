import React from "react";
import { useDispatch } from "react-redux";
import { IVideoItem } from "../../interfaces/IVideoList";
import { useAppSelector } from "../../state/store";
import { add, remove } from "../../state/watchLaterSlide";
import style from "./VideoDetails.module.scss";
import { getCount } from "../videocard/Card";
import Description from "./Description";
import ChannelDetails from "./ChannelDetails";

const VideoDetails = ({ videoDetails }: { videoDetails: IVideoItem }) => {
    const watchLaterList = useAppSelector((store) => store.watchLater);

    const isWatchLater: boolean = watchLaterList.filter((video) => video.id === videoDetails.id).length > 0;

    const dispatch = useDispatch();

    const toggleWatchList = () => {
        if (isWatchLater) dispatch(remove(videoDetails.id));
        else dispatch(add(videoDetails));
    };

    return (
        <>
            <div className="videoContainer position-relative w-100 mb-3" style={{ paddingTop: "56.25%" }}>
                <div
                    className="video position-absolute overflow-hidden"
                    style={{ top: 0, left: 0, bottom: 0, right: 0, borderRadius: "0.75rem" }}
                >
                    <iframe
                        width="100%"
                        height="100%"
                        src={"https://www.youtube.com/embed/" + videoDetails.id + "?autoplay=1"}
                        title={videoDetails.snippet?.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
            <div className={`${style.metadata}`}>
                <h1 className={style.title}>{videoDetails.snippet?.title}</h1>
                <div className="row mb-3 gy-3">
                    <div className="col-12 col-md-6">
                        <ChannelDetails channelId={videoDetails.snippet?.channelId || ""} />
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="d-flex justify-content-md-end">
                            <button className="btn btn-light me-3 rounded-pill d-inline-flex align-items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 270 270"
                                    width="270"
                                    height="270"
                                    preserveAspectRatio="xMidYMid meet"
                                    style={{
                                        width: "28px",
                                        height: "28px",
                                        transform: "translate3d(0px, 0px, 0px) scale(2.5)",
                                    }}
                                >
                                    <defs>
                                        <clipPath id="__lottie_element_2">
                                            <rect width="270" height="270" x="0" y="0"></rect>
                                        </clipPath>
                                        <clipPath id="__lottie_element_4">
                                            <path d="M0,0 L120,0 L120,120 L0,120z"></path>
                                        </clipPath>
                                        <clipPath id="__lottie_element_18">
                                            <path d="M0,0 L128,0 L128,128 L0,128z"></path>
                                        </clipPath>
                                    </defs>
                                    <g clip-path="url(#__lottie_element_2)">
                                        <g
                                            clip-path="url(#__lottie_element_4)"
                                            transform="matrix(1.0880000591278076,0,0,1.0880000591278076,69.95299530029297,67.9433822631836)"
                                            opacity="1"
                                        >
                                            <g transform="matrix(1,0,0,1,60,60)" opacity="1">
                                                <path
                                                    stroke-linecap="butt"
                                                    stroke-linejoin="miter"
                                                    fill-opacity="0"
                                                    stroke-miterlimit="4"
                                                    stroke="rgb(0,0,0)"
                                                    stroke-opacity="1"
                                                    stroke-width="4"
                                                    d=" M25.025999069213867,-4.00600004196167 C25.025999069213867,-4.00600004196167 5.992000102996826,-3.996999979019165 5.992000102996826,-3.996999979019165 C5.992000102996826,-3.996999979019165 11.012999534606934,-22.983999252319336 11.012999534606934,-22.983999252319336 C12.230999946594238,-26.90399932861328 13,-31.94300079345703 8.994000434875488,-31.981000900268555 C7,-32 5,-32 4.021999835968018,-31.007999420166016 C4.021999835968018,-31.007999420166016 -19.993000030517578,-5.03000020980835 -19.993000030517578,-5.03000020980835 C-19.993000030517578,-5.03000020980835 -20.027999877929688,32.025001525878906 -20.027999877929688,32.025001525878906 C-20.027999877929688,32.025001525878906 20.97599983215332,31.986000061035156 20.97599983215332,31.986000061035156 C25.010000228881836,31.986000061035156 26.198999404907227,29.562000274658203 26.99799919128418,25.985000610351562 C26.99799919128418,25.985000610351562 31.972000122070312,4.026000022888184 31.972000122070312,4.026000022888184 C33,-0.6930000185966492 30.392000198364258,-4.00600004196167 25.025999069213867,-4.00600004196167z"
                                                ></path>
                                            </g>
                                            <g transform="matrix(1,0,0,1,60,60)" opacity="1">
                                                <path
                                                    stroke-linecap="butt"
                                                    stroke-linejoin="miter"
                                                    fill-opacity="0"
                                                    stroke-miterlimit="4"
                                                    stroke="rgb(0,0,0)"
                                                    stroke-opacity="1"
                                                    stroke-width="4"
                                                    d=" M-19.986000061035156,-4.03000020980835 C-19.986000061035156,-4.03000020980835 -36.020999908447266,-3.996999979019165 -36.020999908447266,-3.996999979019165 C-36.020999908447266,-3.996999979019165 -36.00199890136719,31.993000030517578 -36.00199890136719,31.993000030517578 C-36.00199890136719,31.993000030517578 -20.030000686645508,32.02299880981445 -20.030000686645508,32.02299880981445 C-20.030000686645508,32.02299880981445 -19.986000061035156,-4.03000020980835 -19.986000061035156,-4.03000020980835z"
                                                ></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                &nbsp;{getCount(Number(videoDetails.statistics?.likeCount) || 0)}
                            </button>
                            <button
                                className="btn btn-light rounded-pill d-inline-flex align-items-center"
                                title={isWatchLater ? "remove from watch later" : "add to watch later"}
                                onClick={toggleWatchList}
                            >
                                {isWatchLater ? (
                                    <svg
                                        viewBox="0 0 24 24"
                                        preserveAspectRatio="xMidYMid meet"
                                        focusable="false"
                                        style={{
                                            pointerEvents: "none",
                                            display: "block",
                                            width: "24px",
                                        }}
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
                                        style={{
                                            pointerEvents: "none",
                                            display: "block",
                                            width: "24px",
                                        }}
                                    >
                                        <g>
                                            <path d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z"></path>
                                        </g>
                                    </svg>
                                )}
                                &nbsp;Watch later
                            </button>
                        </div>
                    </div>
                </div>
                <div className={style.description}>
                    <Description description={videoDetails.snippet?.description || ""} />
                </div>
            </div>
        </>
    );
};

export default VideoDetails;
