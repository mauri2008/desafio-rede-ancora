import { Alert, Snackbar } from '@mui/material';
import React, { createContext, useState } from 'react';
interface INotificationContext {
    openNotify: ({message, severity}: iOpenNotify) => void;
}

interface INotificationProviderProps {
    children: React.ReactNode;
}

interface iOpenNotify {
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
}

export const NotificationContext = createContext({} as INotificationContext) ;


export function NotificationProvider({children}: INotificationProviderProps) {


    const [ isOpenNotify, setIsOpenNotif ] = useState(false);
    const [ propsMessage, setPropsMessage ] = useState<iOpenNotify | null>(null);

    function handleClose() {
        setIsOpenNotif(false);
    }

    function openNotify({message, severity}: iOpenNotify) {
        setIsOpenNotif(true);
        setPropsMessage({message, severity});
    }


    return (
        <NotificationContext.Provider value={{openNotify}}>
            {children}

            <Snackbar open={isOpenNotify} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity={propsMessage?.severity} sx={{ width: '100%' }}>
                    {propsMessage?.message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    )
}