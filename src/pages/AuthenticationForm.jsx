import InputField from "@/components/InputField";
import ErrorMessage from "@/components/ErrorMessage";
import { useAuthForm } from "@/hooks/useAuthForm";

const AuthenticationForm = ({ mode }) => {
    const { formState, errors, handleChange, handleSubmit } = useAuthForm(mode);

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="container auth-container mx-auto mt-5"
            >
                <h1 className="text-center">
                    {mode === "register" ? "Registration" : "Login"}
                </h1>

                {errors.general.length > 0 && (
                    <ErrorMessage error={errors.general} />
                )}

                <InputField
                    label={"E-mail"}
                    type={"email"}
                    name={"email"}
                    required={true}
                    placeholder={"example@email.com"}
                    handleChange={handleChange}
                    value={formState.email}
                    error={errors.email}
                />

                <InputField
                    label={"Password:"}
                    type={"password"}
                    name={"password"}
                    required={true}
                    placeholder={
                        mode === "register"
                            ? "At least 6 characters including a number."
                            : "Your password."
                    }
                    minLength={6}
                    handleChange={handleChange}
                    value={formState.password}
                    error={errors.password}
                />

                {mode === "register" && (
                    <InputField
                        label={"Confirm password:"}
                        type={"password"}
                        name={"confirmPassword"}
                        required={true}
                        placeholder={
                            "At least 6 characters including a number."
                        }
                        minLength={6}
                        handleChange={handleChange}
                        value={formState.confirmPassword}
                        error={errors.confirmPassword}
                    />
                )}

                <div className="d-flex justify-content-center">
                    <input
                        type="submit"
                        className="btn btn-primary my-3 px-4"
                        value={mode === "register" ? "Register" : "Login"}
                    />
                </div>
            </form>
        </>
    );
};

export default AuthenticationForm;
