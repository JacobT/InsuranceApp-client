import { createContext, useContext } from "react";
import { useConfirmation } from "@/hooks/useConfirmation";
import ConfirmModal from "../components/ConfirmModal";

const ConfirmationContext = createContext(null);

export const ConfirmationProvider = ({ children }) => {
    const { dialogOptions, dialogActions, confirm } = useConfirmation();

    return (
        <ConfirmationContext.Provider value={confirm}>
            <ConfirmModal options={dialogOptions} actions={dialogActions} />
            {children}
        </ConfirmationContext.Provider>
    );
};

export const useConfirmationContext = () => useContext(ConfirmationContext);
