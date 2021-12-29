import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import PostSearch from "./post-search"

const HorizoneFeature = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dae0e6",
    flexDirection: "column",
})

const Search=()=>{
    return (
        <HorizoneFeature>
            <PostSearch/>
        </HorizoneFeature>
    )
}

export default Search;