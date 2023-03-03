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
            search: myConf.api.base + "search?key=" + myConf.api.key,
            autoSuggession:
                "https://corsanywhere.herokuapp.com/http://suggestqueries.google.com/complete/search?client=firefox&ds=yt",
        },
    },
};

export default conf;
