import { WarningAmberRounded } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';


interface IError {
    title: string;
}

export function Error({title}: IError) {
    return(
        <Stack>
            <h2>{title}</h2>
            <Stack width='100%' alignItems='center'sx={{fontSize:100}} gap={2}>
                <WarningAmberRounded fontSize='inherit' color='warning'/>
                <Typography>Tivermos um erro ao carregar as informações</Typography>
                <Button onClick={()=> window.location.reload()}>Tente Novamente</Button>
            </Stack>
        </Stack>
    );
}
