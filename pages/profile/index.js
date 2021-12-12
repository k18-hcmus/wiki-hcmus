import React from 'react'
import { 
    Box,
    Container,
    Tab,
    Tabs,
    Typography
} from '@mui/material';
import LazyLoad from 'react-lazyload';
import Information from './information.js';
import History from './history.js';
import Nortification from './nortification.js';
import Setting from './setting.js';
import Statistic from './statistic.js';

const TabPanel = (props) => {
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

function allyProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Profile = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Container>
            <Typography variant='h5'>User settings</Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Information" {...allyProps(0)} />
                    <Tab label="Statistics" {...allyProps(1)} />
                    <Tab label="Nortifications" {...allyProps(2)} />
                    <Tab label="History" {...allyProps(3)} />
                    <Tab label="Settings" {...allyProps(4)} />
                </Tabs>
            </Box>
            <Box pt={4}>
                <LazyLoad once={true}>
                    <TabPanel value={value} index={0}>
                        <Information

                        />
                    </TabPanel>
                </LazyLoad>
                <LazyLoad once={true}>
                    <TabPanel value={value} index={1}>
                        <Statistic

                        />
                    </TabPanel>
                </LazyLoad>
                <LazyLoad once={true}>
                    <TabPanel value={value} index={2}>
                        <Nortification
                            
                        />
                    </TabPanel>
                </LazyLoad>
                <LazyLoad once={true}>
                    <TabPanel value={value} index={3}>
                        <History
                            
                        />
                    </TabPanel>
                </LazyLoad>
                <LazyLoad once={true}>
                    <TabPanel value={value} index={4}>
                        <Nortification
                            
                        />
                    </TabPanel>
                </LazyLoad>
                <LazyLoad once={true}>
                    <TabPanel value={value} index={5}>
                        <Setting
                            
                        />
                    </TabPanel>
                </LazyLoad>
            </Box>
        </Container>
    )
}

export default Profile