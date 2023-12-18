import { Divider, IconButton, Link, Stack, Typography } from '@mui/material';
import { RatingStars } from '../RatingStars';
import { formatDate } from '../../helpers/date';
import { Close } from '@mui/icons-material';
import AudioPlayer from '../Player';
import { IDetails } from '../ListAlbuns';

interface IArtists {
    details?: IDetails;
    onCloseModal: ()=>void;
}


export function AlbumView({details, onCloseModal}:IArtists) {

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
                            <Typography variant='caption'>Data de lançamento: {formatDate(details?.release_date)}</Typography>
                        </Stack>
                        <Stack>
                            <Typography variant='h6'>Artistas</Typography>
                            <Typography variant='h6'>
                                {details?.artists.map((artist)=>(<Link href={artist.external_urls.spotify} target="_blank" mr={2} >{artist.name}</Link>) )}
                            </Typography>
                        </Stack>
                        <RatingStars popularity={details?.popularity} />
                
                    </Stack>

                </Stack>

                <Stack p={3} gap={2}>
                    <Typography variant='h6'>Músicas</Typography>
                    <Stack >
                        {details?.tracks.items.map((track)=>(
                            
                            <Stack direction='row' key={track.name} justifyContent='space-between' alignItems='center'>
                                <Stack width='100%' >
                                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                        <Typography variant='caption'>{track.track_number} - {track.name}</Typography>
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
