import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import PostSearch from "./post-search"

const HorizoneFeature = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
})

const PostResultSearch=({posts})=>{
    return (
        posts.length!==0 && (
        <HorizoneFeature>
            {
                (posts.length!==0)&&(
                    posts.map((post,index)=>(
                        <PostSearch key={index} post={post}/>
                    ))
                )
            }
        </HorizoneFeature>
        )
    )
}

export default PostResultSearch
