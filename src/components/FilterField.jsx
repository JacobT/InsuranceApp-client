import { useFilterField } from "@/hooks/useFilterField";
import { Search } from "react-bootstrap-icons";

const FilterField = ({ setParams }) => {
    const {
        filter,
        toggle,
        searchInput,
        searchButton,
        handleBlur,
        handleChange,
        handleClick,
        handleSubmit,
    } = useFilterField(setParams);

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group justify-content-center">
                <input
                    ref={searchInput}
                    className={`form-control search-input ${toggle ? "open" : ""}`}
                    type={"text"}
                    name={"search"}
                    placeholder={"Filter by first name, last name or email."}
                    onChange={handleChange}
                    value={filter || ""}
                    onBlur={handleBlur}
                />
                <button
                    ref={searchButton}
                    className={`btn btn-primary btn-search d-flex align-items-center
                        justify-content-center ${toggle ? "open" : ""}`}
                    type="button"
                    onClick={handleClick}
                >
                    <Search />
                </button>
            </div>
        </form>
    );
};

export default FilterField;
