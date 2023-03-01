import { useId, useState } from "react";

const SearchBar = () => {
    const [query, setQuery] = useState<string>("");
    const id = useId();

    return (
        <form>
            <div className="d-flex">
                <input
                    type="search"
                    id={"search" + id}
                    className="form-control"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />
                <button className="btn btn-primary">Search</button>
            </div>
        </form>
    );
};

export default SearchBar;
