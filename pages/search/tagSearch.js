import { Avatar, Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from 'next/link'

const PostCard = styled(Box)({
    width: "900px",
    height: "100px",
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
    marginBottom: "10px",
    borderRadius: "10px",
    marginBottom: "2px"
})

const AvartaBox = styled(Box)({
    width: "20%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
})

const AvatarPerson = styled(Avatar)({
    width: '60px',
    height: '60px',
})

const MainContent = styled(Box)({
    width: "80%",
    height: "100%",
    display: "flex",
    flexDirection: "row",

})

const NameMember = styled(Box)({
    width: "70%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
})

const NameUser = styled(Typography)({
    fontSize: "18px",
    fontWeight: "bold",
    marginLeft: "10px",
    marginRight: "10px"
})

const MemberFollow = styled(Typography)({
    fontSize: "18px",
    color: "#bbc0c6"
})

const JoinButton = styled(Button)({
    position: 'absolute',
    right: '5px',
    top: '10px',
    borderRadius: '20px',
    width: '60px',
    height: '40px',
    color: "#1a6ec2",
    fontWeight: "bold",
})

const TagSearch = ({ tag }) => {
    return (
        <PostCard sx={{ boxShadow: 3 }}>
            <AvartaBox>
                <Link href={`/tags/${tag.id}`} passHref>
                    <a>
                        <AvatarPerson src={tag.AvatarURL} />
                    </a>
                </Link>
            </AvartaBox>
            <MainContent>
                <NameMember>
                    <Link href={`/tags/${tag.id}`} passHref>
                        <a>
                            <NameUser>{tag.Name}</NameUser>
                        </a>
                    </Link>
                </NameMember>
            </MainContent>
        </PostCard>
    )
}

export default TagSearch;