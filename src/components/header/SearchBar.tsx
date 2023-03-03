import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import conf from "../../conf/conf";
import useFetch from "../../hooks/useFetch";
import SearchSuggessionLists from "./SearchSuggestionLists";
import style from "./SearchBar.module.scss";

const SearchBar = () => {
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
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
                        className="form-control"
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setShowSuggestions(false)}
                    />
                    <button className="btn btn-primary" disabled={query === ""}>
                        Search
                    </button>
                </div>
            </form>
            <div className={style.suggestions}>
                <SearchSuggessionLists
                    showSuggestions={showSuggestions}
                    suggestions={suggestions}
                    suggessionSelected={(query) => {
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
