import React, { createContext, useContext, useRef } from 'react';
import { Messages } from 'primereact/messages';

interface MessageContextType {
    showSuccess: (summary: string, detail: string) => void;
    showError: (summary: string, detail: string) => void;
}

const MessageContext = createContext<MessageContextType | null>(null);

export const useMessage = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessage must be used within a MessageProvider');
    }
    return context;
};

interface MessageProviderProps {
    children: React.ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
    const msgs = useRef<Messages | null>(null);

    const showSuccess = (summary: string, detail: string) => {
        if (msgs.current) {
            msgs.current.show({
                severity: 'success',
                summary,
                detail,
                life: 1000,
            });
        }
    };

    const showError = (summary: string, detail: string) => {
        if (msgs.current) {
            msgs.current.show({
                severity: 'error',
                summary,
                detail,
                life: 1000,
            });
        }
    };

    return (
        <MessageContext.Provider value={{ showSuccess, showError }}>
            <div className="custom-message">
                <Messages ref={msgs} />
            </div>
            {children}
        </MessageContext.Provider>
    );
};
