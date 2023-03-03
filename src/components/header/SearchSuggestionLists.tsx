import React from "react";

const SearchSuggessionLists = ({
    showSuggestions = true,
    suggestions,
    suggessionSelected,
}: {
    showSuggestions: boolean;
    suggestions: string[];
    suggessionSelected: (string: string) => void;
}) => {
    return suggestions.length > 0 ? (
        <ul className={`list-group ${showSuggestions ? "" : "d-none"}`}>
            {suggestions.map((suggession) => (
                <li
                    className="list-group-item list-group-item-action"
                    key={suggession}
                    onClick={() => suggessionSelected(suggession)}
                >
                    {suggession}
                </li>
            ))}
        </ul>
    ) : null;
};

export default SearchSuggessionLists;
