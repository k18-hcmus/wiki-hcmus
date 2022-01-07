import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import TagSearch from "./tagSearch"

const HorizoneFeature = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
})

const TagResultSearch=({tags})=>{
    return (
        tags.length!==0 && (
        <HorizoneFeature>
            {
                (tags.length!==0)&&(
                    tags.map((tag,index)=>(
                        <TagSearch key={index} tag={tag}/>
                    ))
                )
            }
        </HorizoneFeature>
        )
    )
}

export default TagResultSearch
