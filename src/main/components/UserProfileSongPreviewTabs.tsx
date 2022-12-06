import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
    Box, Tabs,
    Tab, Typography,
    Theme, createTheme,
    styled, SxProps
} from '@mui/material'
import UserProfileSongPreviewList from './UserProfileSongPreviewList';

//Redux
import { 
    selectSongsList,
    getSongsListByUserId
 } from '../reducer/songsReducer';

//CSS
import colors from '../css/InlineStyles/colors';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

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

const UserProfileSongPreviewTabs = () => {
    const TabPanelView = {
        TRACKS_VIEW: 0,
        PLAYLIST_VIEW: 1,
        REPOSTS_VIEW: 2
    }

    const { userId } = useParams()
    const songsList = useAppSelector(selectSongsList)
    const dispatch = useAppDispatch()
    const [value, setValue] = useState(TabPanelView.TRACKS_VIEW)

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(event)
        setValue(newValue);
    };

    useEffect(() => {
        dispatch(getSongsListByUserId(userId))
    }, [])

    return (
        <div>
            <Box sx={BoxStyles}>
                <StyledTabs value={value} onChange={handleTabChange}>
                    <StyledTab label="Tracks" />
                    <StyledTab label="Playlists" />
                    <StyledTab label="Reposts" />
                </StyledTabs>
            </Box>
            <TabPanel value={value} index={TabPanelView.TRACKS_VIEW}>
                <UserProfileSongPreviewList key={0} songsList={songsList} />
            </TabPanel>
            <TabPanel value={value} index={TabPanelView.PLAYLIST_VIEW}>
                <UserProfileSongPreviewList key={1} songsList={null} />
            </TabPanel>
            <TabPanel value={value} index={TabPanelView.REPOSTS_VIEW}>
                <UserProfileSongPreviewList key={2} songsList={null} />
            </TabPanel>
        </div>
    )
}

export default UserProfileSongPreviewTabs;