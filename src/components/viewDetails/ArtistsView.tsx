import { Divider, IconButton, Link, Stack, Typography } from '@mui/material';
import { RatingStars } from '../RatingStars';
import { Close } from '@mui/icons-material';
import AudioPlayer from '../Player';
import { UseRequest } from '../../hooks/UseRequest';
import { useContext, useEffect, useState } from 'react';
import { NotificationContext } from '../../context/Notification';
import { IDetails } from '../ListAlbuns';

interface IArtists {
    details?: IDetails;
    onCloseModal: ()=>void;
}

interface ITracks {
    name: string;
    preview_url: string;
}

export function ArtistView({details, onCloseModal}: IArtists) {

    const {  handleRequest } = UseRequest()
    const {openNotify} = useContext(NotificationContext);

    const [topTracks, setTopTracks] = useState<ITracks[]>([]);

    async function getTopTracks() {
        try{
            const response = await handleRequest({
                method: 'get',
                url: `/artists/${details?.id}/top-tracks?country=BR`,
            }) 
            setTopTracks(response.tracks)
        }catch(err){
            openNotify({
                message: 'Ops tivemos um erro ao carregar as músicas do artista',
                severity: 'error'
            })
            console.log('err',err)
        }
    }


    useEffect(()=>{
        getTopTracks();
    },[])
    return(
        <Stack gap={3}> 
            <Stack direction='column' gap={2}>
                <Stack
                    justifyContent='space-between'
                    p={3}
                    sx={{
                        backgroundImage: `linear-gradient(transparent, rgba(0, 0, 0, 1)), url(${details?.images[0]?.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'top',
                        height: 400,
                        width: '100%',
                        borderRadius: 1,
                        boxShadow: 1,

                    }}
                >
                    <Stack width='100%' justifyContent='flex-end' alignItems='flex-end'>
                        <IconButton onClick={onCloseModal} color='secondary' ><Close/></IconButton>
                    </Stack>
                    <Stack gap={1}>
                        <Stack>
                            <Typography variant='h5'>{details?.name.toUpperCase()}</Typography>
                            <Stack direction='row' gap={3}>
                                <Typography variant='caption'>Genêro: {details?.genres?.join(', ')}</Typography>
                                <Typography variant='caption'>Followers: {details?.followers?.total}</Typography>                 
                            </Stack>
                            <Link href={details?.external_urls?.spotify} target="_blank" mr={2} >Abrir no Spotify</Link>
                        </Stack>
                        <Stack>
                        </Stack>
                        <RatingStars popularity={details?.popularity} />
                
                    </Stack>

                </Stack>

                <Stack p={3} gap={2}>
                    <Typography variant='h6'>Top 10 músicas de {details?.name}</Typography>
                    <Stack >
                        {topTracks.map((track:ITracks, index: number)=>(
                            
                            <Stack direction='row' key={track.name} justifyContent='space-between' alignItems='center'>
                                <Stack width='100%' >
                                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                        <Typography variant='caption'>{index+1} - {track.name}</Typography>
                                         <Stack direction='row'>
                                            <AudioPlayer src={track.preview_url} />
                                         </Stack>
                                    </Stack>
                                    <Divider color='#6b6b6b' flexItem sx={{my:1}} />
                                </Stack>
                            </Stack>
                        ))}
                    </Stack>
                </Stack>

            </Stack>
        </Stack>
    );
}
