import { Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import PostSearch from "./post-search"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import {resultSearch} from "../../utils/search-utils"

const HorizoneFeature = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
})

const SpinnerLoadding = () => {
    return (
        <Typography>There is no post at home</Typography>
    )
}

const Search = () => {
    const router = useRouter()
    const search = router.query
    const [isLoading, setLoading] = useState(false)
    const [postDatas, setPostDatas] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const result = await resultSearch(search)
                setPostDatas(result)
            } catch {
                console.log("Error get Post at Search")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [search])

    return (
        isLoading? <SpinnerLoadding />:
        <HorizoneFeature>
            {
                (postDatas.length!==0)&&(
                    postDatas.map((postData,index)=>(
                        <PostSearch key={index} post={postData}/>
                    ))
                )
            }
        </HorizoneFeature>
    )
}

export default Search;