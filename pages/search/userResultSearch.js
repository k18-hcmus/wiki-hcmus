import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import UserSearch from "./userSearch"

const HorizoneFeature = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
})

const UserResultSearch=({users})=>{
    return (
        users.length!==0 && (
        <HorizoneFeature>
            {
                (users.length!==0)&&(
                    users.map((user,index)=>(
                        <UserSearch key={index} user={user}/>
                    ))
                )
            }
        </HorizoneFeature>
        )
    )
}

export default UserResultSearch
