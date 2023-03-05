import { useEffect, useState } from "react";

const useTitle = (title: string) => {
    const [titleState, setTitleState] = useState<string>(title);

    if (title !== titleState) setTitleState(title);

    const makeTitle = (title: string = "Home"): string => {
        const _prefix: string = "";
        const _suffix: string = "-";
        const _postfix: string = "MeTube";
        const _title: string = `${_prefix} ${title} ${_suffix} ${_postfix}`;

        return _title;
    };

    useEffect(() => {
        document.title = makeTitle(titleState);
    }, [titleState]);
};

export default useTitle;
