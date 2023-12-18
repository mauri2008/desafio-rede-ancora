
import { Stack } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { UseRequest } from '../../hooks/UseRequest';
import { Iitens, ListAlbuns } from '../../components/ListAlbuns';
import { LoadingButton } from '@mui/lab';
import { NotificationContext } from '../../context/Notification';
import { Skeletons } from '../../components/Skeletons';
import { PlaylistAdd } from '@mui/icons-material';



export function Released() {

    const {handleRequest, loading} = UseRequest();
    const { openNotify } = useContext(NotificationContext)

    const [albuns, setAlbuns] = useState<Iitens[]>([]);
    const [limitedArtists, setLimitedArtists] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [error, setError] = useState<boolean>(false);


    async function getNewReleases(offset = 0, typerequets ='first') {
        try{
            const respNewReleases = await handleRequest({
                method: 'get',
                url: `/browse/new-releases?country=BR&limit=20&offset=${offset}`,
            });
    
            typerequets === 'first' ? setAlbuns(respNewReleases.albums.items )
            : setAlbuns(state => [...state, ...respNewReleases.albums.items])
            
            setLimitedArtists(respNewReleases.albums.total)
            setCurrentPage(offset)

        }catch(err){
            openNotify({
                message: 'Ops tivemos um erro ao carregar a lista de lançamentos',
                severity: 'error'
            })
            setError(true);
            console.log('err',err)
        }
    }

    function handleGetMoreAlbuns() {
        getNewReleases(currentPage + 20, 'more');
    }

    useEffect(()=>{
        getNewReleases();
    },[])

    return(
        <Stack>

            <ListAlbuns title='Lançamentos' list={albuns} typeCard='albuns' icon={<PlaylistAdd fontSize='large'/>} /> 
            {
                loading && (<Skeletons skeleton={20}  />)
            }

            {
                !error && currentPage < limitedArtists && (
                    <Stack justifyItems='center' alignItems='center' mt={5}>
                        <LoadingButton onClick={handleGetMoreAlbuns} loading={loading} >Ver Mais</LoadingButton>
                    </Stack>
                )
            }  
        </Stack>
    );
}
