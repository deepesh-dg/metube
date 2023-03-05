import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../state/fetchCacheSlice";
import { useAppSelector } from "../state/store";

type Options = {
    query?: string[][];
    cacheData?: {
        allowed: boolean;
        data: boolean;
    };
    debounce?: number;
};

const useFetch = <TData = any>(
    url: string,
    { cacheData = { allowed: true, data: true }, debounce = 0, ...options }: RequestInit & Options
) => {
    const [data, setData] = useState<TData>();
    const [loader, setLoader] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    if (options && options.query) {
        const originalQueries = new URL(url).search
            .replace("?", "")
            .split("&")
            .map((queries) => queries.split("="));
        const allQueries = new URLSearchParams([...options.query, ...originalQueries]).toString();

        url = new URL("?" + allQueries, url).href;
    }

    const cachedData = useAppSelector((store) => store.fetchCache[url]);
    const dispatch = useDispatch();

    useEffect(() => {
        const controller = new AbortController();
        let cancelTimeout: NodeJS.Timeout | undefined;

        const callFetch = () => {
            fetch(url, { ...options, signal: controller.signal })
                .then((res) => res.json())
                .then((data) => {
                    if (cacheData.allowed) dispatch(add({ name: url, payload: data }));
                    setData(data);
                })
                .catch(() => setError(true))
                .finally(() => setLoader(false));
        };

        if (cacheData.data && cachedData) {
            setData(cachedData);
            setLoader(false);
        } else if (debounce > 0) cancelTimeout = setTimeout(callFetch, debounce);
        else callFetch();

        return () => {
            // controller.abort();
            clearInterval(cancelTimeout);
        };
    }, [url]);

    return { data, loader, error };
};

export default useFetch;
