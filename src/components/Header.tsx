import { Avatar, Button, Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Header() {

    const navegate = useNavigate();

    function handleLogout() {
        sessionStorage.clear();
        navegate('/login');
    }

 return(
    <Stack width='100%' height={70} justifyContent='flex-end' direction='row' px={2} py={1.5} bgcolor='background.default'>
        <Stack direction='row' gap={2.5} alignItems='center' >
            <Avatar sx={{ width: 30, height: 30, fontSize:13 }}>SP</Avatar>
            <Button onClick={handleLogout}>Sair</Button>
        </Stack>
    </Stack>
 );
}
