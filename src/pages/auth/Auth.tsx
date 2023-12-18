import { Box, Paper, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import logoSpotify from '../../assets/Spotify_logo.svg';
import {  useEffect } from "react";
import { UseRequest } from "../../hooks/UseRequest";
import { useNavigate } from "react-router-dom";
import { loginUrl } from "../../Providers/spotify";
import { setSession } from "../../helpers/session";


export function Auth() {

    const { loading } = UseRequest();
    const navigate = useNavigate();

    useEffect(()=>{
        const hash = window.location.hash
        let token : string | null | undefined = localStorage.getItem('token');

        if(!token && hash){
            token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token'))?.split('=')[1];

            if(token){
                setSession('token', token);
                navigate('/home');
            }
        }
    },[])
    

    async function sendSubmit(){
        window.location.href = loginUrl;
    }


    return(
        <Box minWidth='100vw' minHeight='100vh' justifyContent='center' alignItems='center'>

                <Stack 
                    flex={1}
                    alignItems='center' 
                    justifyContent='center'
                    minHeight='100vh'
                >
                    <Paper 
                        elevation={0}
                        sx={
                            {
                                bgcolor:'transparent', 
                                width:{
                                    xs: '100%',
                                    sm: '90%',
                                    md: '80%',
                                    lg: '30%'
                                },

                                p:4,

                            }
                        }
                    >
                        <Stack justifyContent='center' alignItems='center' gap={5}>
                            <img src={logoSpotify} alt="logo spotify" width='40%'/>
                            <Stack gap={3} width='100%'>                     
                                <LoadingButton           
                                    variant="contained" 
                                    size="large" 
                                    loading={loading} 
                                    onClick={sendSubmit}
                                    loadingIndicator="Aguarde..."
                                >
                                    Logar com minha conta Spotify
                                </LoadingButton>
                            </Stack>
                        </Stack>
                    </Paper>
                </Stack>
         
        </Box>
    );
}
