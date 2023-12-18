
import { Dialog, Stack } from '@mui/material';
import React from 'react';


interface IModal {
    isOpen: boolean;
    children: React.ReactNode;
}

export function Modal({isOpen, children }:IModal) {
    return(
        <Dialog 
            open={isOpen} 
            fullWidth        
            maxWidth='md'
        >
                <Stack minWidth={600}  >
                    {children}
                </Stack>
        </Dialog>
    );
}
