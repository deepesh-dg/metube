import React, { useEffect, useRef, useState } from "react";

const SearchSuggestionLists = ({
    isSearchBarFocused = true,
    suggestions,
    suggestionSelected,
}: {
    isSearchBarFocused: boolean;
    suggestions: string[];
    suggestionSelected: (string: string) => void;
}) => {
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
    const suggestionContainer = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const list = suggestionContainer.current;
        const mouseEnter = (e: MouseEvent) => setIsMouseOver(true);
        const mouseLeave = (e: MouseEvent) => setIsMouseOver(false);

        list?.addEventListener("mouseenter", mouseEnter);
        list?.addEventListener("mouseleave", mouseLeave);

        return () => {
            list?.removeEventListener("mouseenter", mouseEnter);
            list?.removeEventListener("mouseleave", mouseLeave);
        };
    });

    return suggestions.length > 0 ? (
        <ul className={`list-group ${isSearchBarFocused || isMouseOver ? "" : "d-none"}`} ref={suggestionContainer}>
            {suggestions.map((suggestion) => (
                <li
                    className="list-group-item list-group-item-action"
                    key={suggestion}
                    onClick={() => {
                        suggestionSelected(suggestion);
                        setIsMouseOver(false);
                    }}
                >
                    {suggestion}
                </li>
            ))}
        </ul>
    ) : null;
};

export default SearchSuggestionLists;
