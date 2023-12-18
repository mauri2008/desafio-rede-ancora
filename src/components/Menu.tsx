import { Box, Stack, Typography } from '@mui/material';

import logoSpotify from '../assets/Spotify_logo.svg'
import { useLocation, useNavigate } from 'react-router-dom';
import { Favorite, Home, PlaylistAdd } from '@mui/icons-material';

export function Menu() {

    const navigate = useNavigate();
    const location = useLocation();

    function handleRedirect(path: string){
        navigate(path);
    }

    const listMenu = [
        {
            icon: <Home fontSize='medium'/>,
            label: 'home',
            path: '/home'
        },
        {
            icon: <Favorite fontSize='medium'/>,
            label: 'Artistas Preferidos',
            path: '/preferidos'
        },
        {
            icon: <PlaylistAdd fontSize='medium'/>,
            label: 'Novos Lançamentos',
            path: '/lancamentos'
        }
    ]

    return(
        <Stack p={2} gap={5}>
            <Box>
                <img src={logoSpotify} alt='logo spotify' style={{maxWidth:'50%'}}/>
            </Box>
            <Stack gap={1.2}>

                {
                    listMenu.map((item, index) => (
                        <Stack
                            key={`menu-${index}`}
                            direction='row'
                            onClick={()=>handleRedirect(item.path)}
                            gap={1}
                            alignItems='center'
                            sx={{
                                backgroundColor: location.pathname === item.path ? 'primary.main' : 'transparent',
                                cursor: 'pointer',
                                transition: 'color 0.2s',
                                p:1.3,
                                borderRadius: 1,
                                '&:hover': {
                                    color: 'secondary.main',
                                    backgroundColor: 'primary.main'
                                }
                            }}
                        >
                            {item.icon}
                            <Typography variant='body1'>{item.label}</Typography>
                        </Stack>
                    ))
                }

            </Stack>
        </Stack>
    );
}
