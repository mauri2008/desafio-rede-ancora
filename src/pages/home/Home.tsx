import {  Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseRequest } from '../../hooks/UseRequest';
import { ListAlbuns } from '../../components/ListAlbuns';
import { LinkButton } from '../../components/LinkButton';


export function Home() {

    const {handleRequest} = UseRequest();

    const [albuns, setAlbuns] = useState([]);
    const [artists, setArtists] = useState([]);

    async function getNewReleases() {
        const respNewReleases = await handleRequest({
            method: 'get',
            url: '/browse/new-releases?country=BR&limit=5&offset=0',
        });

        setAlbuns(respNewReleases.albums.items )

    }

    async function getArtists() {
        const respArtists = await handleRequest({
            method: 'get',
            url: '/me/top/artists?limit=5&offset=0',
        });

        setArtists(respArtists.items )
    }

    useEffect(()=>{
        getNewReleases();
        getArtists();
    },[])

    return(
        <Stack>
            <Typography variant='h5'>Bem Vindo</Typography>

            <ListAlbuns title='Lançamentos' typeCard='albuns' list={albuns} buttonMore={<LinkButton to="/lancamentos" label='Ver Mais' />}/>   
            <ListAlbuns title='Artistas Prediletos' typeCard='artists' list={artists} buttonMore={<LinkButton to="/preferidos" label='Ver Mais'/>}/>   

        </Stack>
    );
}
