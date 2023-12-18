import { Stack, } from '@mui/material';
import { CardAlbuns } from './CardAlbuns';
import { Error } from './Error';
import { useContext, useState } from 'react';
import { UseRequest } from '../hooks/UseRequest';
import { NotificationContext } from '../context/Notification';
import { Modal } from './Modal';
import { AlbumView } from './viewDetails/AlbumView';
import { ArtistView } from './viewDetails/ArtistsView';

export interface IImagens{
    height : number
    url : string
    width : number
}


export interface Iitens {
    id: string;
    images: IImagens[];
    name: string;
    artists: IArtists[];
    popularity?: number;
    genres?: string[];
    followers?: {
        total: number;
    };
    external_urls?: {
        spotify: string;
    };
    release_date?: string;

}

interface IListAlbuns {
    title: string;
    list: Iitens[];
    typeCard?: 'artists' | 'albuns';
    buttonMore?: React.ReactNode;
    error?: boolean;
    icon?: React.ReactNode;
}

interface IArtists {
    external_urls: {
        spotify: string;
    },
    href: string;
    id: string;
    name: string;
    type: string;
}

export interface IDetails {
    
    album_type : string;
    artists : IArtists[];
    available_markets : string[];
    copyrights : {
        text: string;
        type: string;
    }[];
    external_ids : {
        upc : string;
    },
    external_urls : {
        spotify : string;
    },
    genres : string[],
    href : string;
    id : string;
    images : IImagens[],
    label : string;
    name : string;
    popularity : number;
    release_date : string;
    release_date_precision : string;
    total_tracks : number;
    tracks : {
        href : string;
        items : [{
            artists:IArtists[],
            available_markets: string[];
            disc_number: number;
            duration_ms: number;
            explicit:boolean;
            external_urls: {
                spotify:string;
            },
            href: string;
            id: string;
            is_local: false,
            name: string;
            preview_url: string;
            track_number: number;
            type: string;
        }],
    },
    followers : {
        total: number;
    };

}

export function ListAlbuns({title, list, typeCard ,buttonMore, error, icon }: IListAlbuns) {

    const { openNotify } = useContext(NotificationContext)

    const [details, setDetails] = useState<IDetails| undefined>(undefined);
    const {handleRequest} = UseRequest();
    const [openModal, setOpenModal] = useState(false);

    if(error){
        return(<Error title={title}/>);
    }

    async function getDetails(id: string) {
        try{
            const respose= await handleRequest ({
                method: 'get',
                url: typeCard === "artists" ? `/artists/${id}`:`/albums/${id}`,
            });

            setDetails(respose);
            setOpenModal(true);
            return 
        
        }catch(err){
            openNotify({
                message: 'Erro ao carregar detalhes',
                severity: 'error'
            });

        }

    }

    function handleGetDetails(id: string) {
        getDetails(id);
    }
    
    const templateModal = typeCard === "albuns" ?  
        <AlbumView details={details} onCloseModal={()=>setOpenModal(!openModal)}/> 
        : 
        <ArtistView details={details} onCloseModal={()=>setOpenModal(!openModal)}/>

    return(
        <Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Stack direction='row' gap={1} alignItems='center'>
                    {icon}
                    <h2>{title}</h2>
                </Stack>
                {buttonMore}
            </Stack>
            <Stack   direction={{ xl:'row', lg:'row', md:'column'}} gap={2} flexWrap='wrap'>
                {
                    !error && list.map((item:Iitens, index: number) => {
                        return(
                            <CardAlbuns key={index} item={item} handleDetails={handleGetDetails}/>
                        );
                    })
                }
            </Stack>

            <Modal isOpen={openModal}>
                {templateModal}
            </Modal>
        </Stack>
    );
}
