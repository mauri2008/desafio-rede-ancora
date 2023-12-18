
import { Stack} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { UseRequest } from '../../hooks/UseRequest';
import { Iitens, ListAlbuns } from '../../components/ListAlbuns';
import { LoadingButton } from '@mui/lab';
import { NotificationContext } from '../../context/Notification';
import { Skeletons } from '../../components/Skeletons';
import { Favorite as FavoritesIcon } from '@mui/icons-material';


export function Favorites() {

    const {handleRequest, loading} = UseRequest();
    const { openNotify } = useContext(NotificationContext)

    const [artists, setArtists] = useState<Iitens[]>([]);
    const [limitedArtists, setLimitedArtists] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [error, setError] = useState<boolean>(false);

    async function getNewFavorites(offset = 0, typerequets ='first') {
        try{
            const respFavorites = await handleRequest({
                method: 'get',
                url: `/me/top/artists?limit=20&offset=${offset}`,
            });
            
    
            typerequets === 'first' ? setArtists(respFavorites.items)
            : setArtists(state => [...state, ...respFavorites.items])
    
            setLimitedArtists(respFavorites.total)
            setCurrentPage(offset)
        }catch(err){
            openNotify({
                message: 'Ops tivemos um erro ao carregar a lista de artistas',
                severity: 'error'
            })
            setError(true);
            console.log('err',err)
        }
    }

    function handleMoreFavorites() {
        getNewFavorites(currentPage + 20, 'more');
    }


    useEffect(()=>{
        getNewFavorites();
    },[])


    return(
        <Stack>

            <ListAlbuns title='Meus artistas preferidos' list={artists} error={error} typeCard='artists' icon={<FavoritesIcon fontSize='large' />} />  

            {
                loading && (<Skeletons skeleton={20}/>)
            } 

            {
               !error && currentPage < limitedArtists && (
                    <Stack justifyItems='center' alignItems='center' mt={5}>
                        <LoadingButton onClick={handleMoreFavorites} loading={loading} >Ver Mais</LoadingButton>
                    </Stack>
                )
            }

        </Stack>
    );
}
