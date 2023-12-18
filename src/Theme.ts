import { createTheme } from "@mui/material";


export  const theme = createTheme({
    
    palette: {
        primary: {
            main: "#1bd954",
        },
        secondary: {
            main: "#fff",
        },
        background: {
            default: "#191414",
            paper: "#191414",
        },
        text: {
            primary: "#fff",
            secondary: "#fff"
        }
    },

    components: {
        MuiTextField:{
            styleOverrides:{
                root: {
                    '& label':{
                        color: '#1db954',
                    },
                    '& .MuiInputBase-input': {
                        backgroundColor: '#d3d3d3',
                        color: '#191414',
                    },
                    '& label.Mui-focused': {
                      color: 'green', // Cor do label quando o TextField está focado
                    },
                    '& .MuiInput-underline:after': {
                      borderBottomColor: 'green', // Cor da linha inferior quando o TextField está focado
                    },
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: 'green', // Cor da borda quando o TextField está focado
                      },
                    },
                  },
            }
        },
        MuiCircularProgress: {
            styleOverrides: {
                root: {
                    color: '#1db954'
                }
            }
        
        }


    }
    
})