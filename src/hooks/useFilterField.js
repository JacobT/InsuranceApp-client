import { useEffect, useRef, useState } from "react";

export const useFilterField = (setParams) => {
    const [filter, setFilter] = useState({});
    const [toggle, setToggle] = useState(false);

    const searchInput = useRef(null);
    const searchButton = useRef(null);

    useEffect(() => {
        const applyFilter = setTimeout(() => setParams(filter), 2000);
        return () => clearTimeout(applyFilter);
    }, [filter, setParams]);

    useEffect(() => {
        if (toggle) searchInput.current?.focus();
    }, [toggle]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter(value ? { [name]: value } : {});
    };

    const handleSubmit = (e) => {
        e?.preventDefault();
        setParams(filter);
        if (!filter.search) searchInput.current?.blur();
    };

    const handleBlur = (e) => {
        if (!filter.search && e.relatedTarget !== searchButton.current)
            setToggle(false);
    };

    const handleClick = () => {
        if (!filter.search) setToggle(!toggle);
        handleSubmit();
    };

    return {
        filter: filter.search,
        toggle,
        searchInput,
        searchButton,
        handleBlur,
        handleChange,
        handleClick,
        handleSubmit,
    };
};
