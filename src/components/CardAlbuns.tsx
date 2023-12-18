

import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { Iitens } from './ListAlbuns';
import { RatingStars } from './RatingStars';
import { formatDate } from '../helpers/date';



interface ICardAlbuns {
    item: Iitens;
    handleDetails: (id: string) => void;
}


export function CardAlbuns({item, handleDetails}: ICardAlbuns) {
    return(
        <Stack>
            <Card sx={{width:{
                xs: '100%',
                sm: '100%',
                md: '100%',
                lg: 300,
                xl: 'calc(100vw / 6.7)',
                height: '100%'
            }, background:'background.default !important'}}>
                <CardMedia
                    component="img"
                    height="200"
                    image={item?.images[0]?.url}
                    alt="green iguana"
                />
                <CardContent>
                    <Stack height={120} gap={2}>
                        <Typography variant='h4' fontSize={14}>
                            {item?.name ?? '-'}
                        </Typography>
                            {
                                item?.release_date &&(
                                    <Typography variant='caption'>Lançamento: {formatDate(item.release_date)}</Typography>
                                )
                            }
                            {
                                item?.artists &&(
                                    <Stack gap={1}>
                                        <Typography variant='caption'>Artistas: {item.artists.map(artist => artist.name).join(',')}</Typography>
                                    </Stack>

                                )
                            }

                            {   
                                item?.genres && (
                                    <Stack gap={1}>
                                        <Typography variant='caption'>Gênero: {item?.genres[0] ?? '-'}</Typography>
                                        <Stack>
                                            <Typography variant='caption'>Popularidade:</Typography>
                                            <RatingStars popularity={item?.popularity} />
                                        </Stack>
                                       
                                    </Stack>
                                )
                            }
                    </Stack>
                </CardContent>
                <CardActions>
                        
                            <Button size='small' onClick={()=>handleDetails(item?.id)}>Ver Mais</Button>
                        
                </CardActions>
            </Card>
        </Stack>
    );
}
