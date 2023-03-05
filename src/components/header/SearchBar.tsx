import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import conf from "../../conf/conf";
import useFetch from "../../hooks/useFetch";
import SearchSuggestionLists from "./SearchSuggestionLists";
import style from "./SearchBar.module.scss";

const SearchBar = () => {
    const [isSearchBarFocused, setIsSearchBarFocused] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const id = useId();
    const navigate = useNavigate();
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const [urlSearchParam] = useSearchParams();
    const urlQuery = urlSearchParam.get("search_query") || "";

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (urlQuery && query !== urlQuery) setQuery(urlQuery);
    }, [urlQuery]);

    const { data: suggestionData } = useFetch<[[], string[]]>(conf.api.segment.autoSuggession, {
        query: [["q", query]],
        debounce: 200,
    });

    useEffect(() => {
        if (suggestionData) setSuggestions(suggestionData[1]);
    }, [suggestionData]);

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate({
            pathname: "/results",
            search: "?search_query=" + query,
        });
    };

    return (
        <div className="position-relative">
            <form onSubmit={submit} ref={formRef}>
                <div className="d-flex">
                    <input
                        type="search"
                        id={"search" + id}
                        className={`form-control ${style.input}`}
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        onFocus={() => setIsSearchBarFocused(true)}
                        onBlur={() => setIsSearchBarFocused(false)}
                        placeholder="Search"
                    />
                    <button className={`btn bg-light border ${style.button}`} disabled={query === ""}>
                        <svg
                            viewBox="0 0 24 24"
                            preserveAspectRatio="xMidYMid meet"
                            focusable="false"
                            style={{ pointerEvents: "none", display: "inline-block", width: "24px", height: "24px" }}
                        >
                            <g>
                                <path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path>
                            </g>
                        </svg>
                    </button>
                </div>
            </form>
            <div className={style.suggestions}>
                <SearchSuggestionLists
                    isSearchBarFocused={isSearchBarFocused}
                    suggestions={suggestions}
                    suggestionSelected={(query) => {
                        navigate({
                            pathname: "/results",
                            search: "?search_query=" + query,
                        });
                    }}
                />
            </div>
        </div>
    );
};

export default SearchBar;
