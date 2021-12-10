import React from 'react'
import { 
    Box,
    Container,
    Tab,
    Tabs,
    Typography
} from '@mui/material';
import LazyLoad from 'react-lazyload';
<<<<<<< HEAD
import Information from './information.js';
import History from './history.js';
import Nortification from './nortification.js';
import Setting from './setting.js';
import Statistic from './statistic.js';
=======
import Information from '../../components/profile/tabs/information.js';
import History from '../../components/profile/tabs/history.js';
import Nortification from '../../components/profile/tabs/nortification.js';
import Setting from '../../components/profile/tabs/setting.js';
import Dashboard from '../../components/profile/tabs/dashboard.js';
>>>>>>> 2ebbe60 (Update information, Add dashboard view)

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
<<<<<<< HEAD
                    <Tab label="Information" {...allyProps(0)} />
                    <Tab label="Statistics" {...allyProps(1)} />
=======
                    <Tab label="Dashboard" {...allyProps(0)} />
                    <Tab label="Information" {...allyProps(1)} />
>>>>>>> 2ebbe60 (Update information, Add dashboard view)
                    <Tab label="Nortifications" {...allyProps(2)} />
                    <Tab label="History" {...allyProps(3)} />
                    <Tab label="Settings" {...allyProps(4)} />
                </Tabs>
            </Box>
            <Box pt={4}>
                <LazyLoad once={true}>
                    <TabPanel value={value} index={0}>
<<<<<<< HEAD
                        <Information
=======
                        <Dashboard
>>>>>>> 2ebbe60 (Update information, Add dashboard view)

                        />
                    </TabPanel>
                </LazyLoad>
                <LazyLoad once={true}>
                    <TabPanel value={value} index={1}>
<<<<<<< HEAD
                        <Statistic
=======
                        <Information
>>>>>>> 2ebbe60 (Update information, Add dashboard view)

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
