const InputField = ({
    label,
    type,
    required = false,
    name,
    rows = 3,
    placeholder,
    value,
    handleChange,
    error = [],
    ...rest
}) => {
    const allowedTypes = [
        "text",
        "email",
        "password",
        "number",
        "date",
        "textarea",
    ];

    const typeNormalized = type?.toLowerCase();

    if (!allowedTypes.includes(typeNormalized)) {
        console.warn(`InputField: unsupported type "${type}"`);
        return null;
    }

    const isTextarea = typeNormalized === "textarea";

    return (
        <div className="form-group">
            {label && (
                <label htmlFor={name} className="my-2">
                    {label}
                </label>
            )}
            {isTextarea ? (
                <textarea
                    id={name}
                    className={`form-control ${
                        error.length ? "is-invalid" : ""
                    }`}
                    required={required}
                    name={name}
                    rows={rows}
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={value}
                    {...rest}
                />
            ) : (
                <input
                    id={name}
                    className={`form-control ${
                        error.length ? "is-invalid" : ""
                    }`}
                    type={typeNormalized}
                    required={required}
                    name={name}
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={value}
                    {...rest}
                />
            )}
            {error.length > 0 &&
                error.map((err, i) => (
                    <div key={i} className="text-danger small">
                        {err}
                    </div>
                ))}
        </div>
    );
};

export default InputField;
