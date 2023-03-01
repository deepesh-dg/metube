const myConf = {
    api: {
        key: process.env["REACT_APP_YOUTUBE_API_KEY"],
        base: "https://www.googleapis.com/youtube/v3/",
    },
};

const conf = {
    api: {
        ...myConf.api,
        segment: {
            videoList: myConf.api.base + "videos?key=" + myConf.api.key,
        },
    },
};

export default conf;
