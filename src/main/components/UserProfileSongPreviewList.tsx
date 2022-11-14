import React, {useState, useEffect} from 'react'
import {
    Box, Tabs,
    Tab, Typography, 
    Theme, createTheme,
    styled, SxProps
  } from '@mui/material'
  import colors from '../css/InlineStyles/colors'; 
  
interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
  }
  
  const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 60,
      width: '100%',
      backgroundColor: '#A5C9CA',
    },
  });
  
  interface StyledTabProps {
    label: string;
  }
  
  const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
  ))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: colors.PRIMARY_TEXT_COLOR,
    '&.Mui-selected': {
      color: colors.SECONDARY_TEXT_COLOR,
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }));
  
  const BoxStyles: SxProps<Theme> = {
    borderBottom: 0.5,
    borderColor: colors.PRIMARY_HEADER_BOTTOM_BORDER_COLOR
  }
  
  const UserProfileSongPreviewList = () =>{
      const [value, setValue] = useState(0)
      
      const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
          console.log(event)
          setValue(newValue);
      };
  
      return(
          <div>
              <Box sx={BoxStyles}>
                  <StyledTabs value={value} onChange={handleTabChange}>
                      <StyledTab label="Songs"/>
                      <StyledTab label="Playlist"/>
                      <StyledTab label="Likes"/>
                  </StyledTabs>
              </Box>
              {/* <TabPanel value={value} index={0}> Item One </TabPanel>
              <TabPanel value={value} index={1}>Item Two </TabPanel>
              <TabPanel value={value} index={2}>Item Three </TabPanel> */}
          </div>
      )
  }
  
  export default UserProfileSongPreviewList;