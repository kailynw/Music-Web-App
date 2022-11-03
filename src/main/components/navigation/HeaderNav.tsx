import React from "react"
import {styled, Theme, ThemeProvider, createTheme, SxProps} from "@mui/material/styles";
import { 
    AppBar, 
    Box, 
    Toolbar, 
    IconButton, 
    Typography, 
    Button,
    Tooltip,
    Avatar,
    MenuItem,
    Menu,
    Container,
    Grid,
    CssBaseline
} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';

import '../../css/HeaderNav.scss'

const ContainerStyles: SxProps<Theme> = {
    position: "relative",
    paddingTop:"3%",
    paddingBottom: "3%"
}

const HeaderNav = ()=>{
    const userSettings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return(
        <div>
             <React.Fragment>
                <CssBaseline/>
                    <Container sx={ContainerStyles} maxWidth="xl" >
                        <Box sx={{flexGrow: 1}}>
                            <Grid container spacing={2}>
                                 <Grid>  
                                    <Typography variant="h6" component="div" sx={{ flexGrow: 3 }}>
                                        New
                                    </Typography>
                                </Grid> 
                                <Grid item xs={3}>
                                    sks
                                </Grid>
                            </Grid>
                         </Box>
                        
                    </Container>
            </React.Fragment>

             {/* </Box> */}
        </div>

    )
}

export default HeaderNav