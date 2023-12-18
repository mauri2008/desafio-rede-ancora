
import {Menu} from '../../components/Menu';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Stack, useTheme } from '@mui/material';


export function DefaultLayout() {

    const {palette} = useTheme();

    return(
        <Grid container minHeight='100vh' >
            <Grid
                xs={12}
                sm={12} 
                md={3}
                lg={2}
            >
                <Menu />
            </Grid>
            <Grid 
                xs={12}
                sm={12} 
                md={9}
                lg={10}
                sx={{background: palette.grey[900]}}
            >
                <Header/>
                <Stack p={3}>
                    <Outlet/>
                </Stack>
            </Grid>
        </Grid>
    );
}
