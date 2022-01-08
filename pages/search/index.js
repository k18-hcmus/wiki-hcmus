import { Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import PostResultSearch from "./postResultSearch"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import { resultSearch,resultUserSearch,resultTagSearch } from "../../utils/search-utils"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import UserResultSearch from "./userResultSearch"
import TagResultSearch from "./tagResultSearch"
import LinearProgress from '@mui/material/LinearProgress'

function TabPanel(props) {
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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Search = () => {
    const router = useRouter()
    const search = router.query
    const [isLoading, setLoading] = useState(false)
    const [postDatas, setPostDatas] = useState([])
    const [value, setValue] = useState(0);
    const [users,setUsers]=useState([])
    const [tags,setTags]=useState([])
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const post = await resultSearch(search)
                const user=await resultUserSearch(search)
                const tag=await resultTagSearch(search)
                setPostDatas(post)
                setUsers(user)
                setTags(tag)
            } catch {
                console.log("Error at Search")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [search])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        isLoading ? <LinearProgress /> :
            <Box sx={{ width: '100%'}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider',display:"flex",justifyContent:"center"}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" > 
                        <Tab label="Post" {...a11yProps(0)} />
                        <Tab label="User" {...a11yProps(1)} />
                        <Tab label="Tag" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                {
                    (postDatas.length!==0) && (
                        <TabPanel value={value} index={0}>
                            <PostResultSearch posts={postDatas} />
                        </TabPanel>
                    )
                }
                {
                    (users.length!==0) && (
                        <TabPanel value={value} index={1}>
                            
                            <UserResultSearch users={users} />
                        </TabPanel>
                    )
                }
                {
                    (tags.length!==0) && (
                        <TabPanel value={value} index={2}>
                            <TagResultSearch tags={tags}/>
                        </TabPanel>
                    )
                }

            </Box>
    )
}

export default Search;