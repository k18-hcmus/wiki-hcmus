import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FlagIcon from '@mui/icons-material/Flag';
import ShareIcon from '@mui/icons-material/Share';
import { Avatar, Box, Button, Card, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import draftToHtml from 'draftjs-to-html';
import { useRef, useEffect, useState } from "react"


const PostCard = styled(Card)({
    width: "800px",
    minHeight: "300px",
    maxHeight: "600px",
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
    marginBottom: "10px"
})

const UpdownBox = styled(Box)({
    width: "30px",
    minHeight: "100%",
    borderRadius: "2px",
    backgroundColor: "#a7a7a0",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingTop: "3px"
})

const UpdownText = styled(Typography)({
    fontSize: "14px",
    align: "center",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
})

const MainComponent = styled(Box)({
    width: "90%",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
})

const TitleComponent = styled(Box)({
    width: "100%",
    height: "50px",
    display: "flex",
    flexDirection: "row",
    marginLeft: "7px",
    marginTop: "5px",
})

const AvatarPerson = styled(Avatar)({
    width: "40px",
    height: "40px"
})

const TitleName = styled(Box)({
    width: "70%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    marginLeft: "7px"
})

const NameTime = styled(Box)({
    wdith: "100%",
    height: "50%",
    display: "flex",
    flexDirection: "row",
})

const NameUser = styled(Typography)({
    fontSize: "16px",
    fontWeight: "bold",
})

const Time = styled(Typography)({
    fontSize: "16px",
    color: "#a7a7a0",
    marginLeft: "5px"
})

const TagBox = styled(Box)({
    width: "100%",
    height: "50%",
    display: "flex",
    flexDirection: "row",
    marginTop: "-5px"
})

const TagName = styled(Typography)({
    fontSize: "15px",
    color: "#1680b2",
    marginLeft: "5px"
})

const TitlePost = styled(Typography)({
    fontSize: "20px",
    marginLeft: "7px",
    fontWeight: "bold"
})

const ContexCom = styled(Box)({
    marginLeft: "7px",
    fontSize: "16px",
    maxHeight: "80%",
    overflow: "hidden"
})

const JoinButton = styled(Button)({
    position: "absolute",
    right: "5px",
    top: "10px",
    borderRadius: "20px",
    width: "60px",
    height: "40px"
})

const CommentComponent = styled(Box)({
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    bottom: "0px",
    width: "100%",
    backgroundColor: "#fff"
})

const TitleComment = styled(Typography)({
    color: "#bcbebf",
    fontSize: "14px",
    fontWeight: "bold",
})

const ItemButton = styled(IconButton)({
    borderRadius: "0px",
    marginLeft: "10px",
    marginRight: "10px",
})

const UpDownVoteButton = styled(IconButton)({
    width: "25px",
    height: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "3px"
})

const SeeMoreButton = styled(Button)({
    width: "200px",
    height: "30px",
    borderRadius: "15px",
    position: "absolute",
    bottom: "50px",
    left: "250px",
    zIndex: 10,

})

const PostNoImageCard = ({ title, user, comments, tags, publishDate, upvote, content }) => {

    const [widthPost, setWidthPost] = useState()
    const draftContent = JSON.parse(content)
    const htmlContent = draftToHtml(draftContent)

    const ref = useRef(null);

    useEffect(() => {
        setWidthPost(ref.current.offsetHeight)
    })

    return (
        <PostCard ref={ref}>
            <UpdownBox>
                <UpDownVoteButton>
                    <ArrowCircleUpIcon />
                </UpDownVoteButton>
                <UpdownText>{upvote}</UpdownText>
                <UpDownVoteButton>
                    <ArrowCircleDownIcon />
                </UpDownVoteButton  >

            </UpdownBox>
            <MainComponent>
                <TitleComponent>
                    <AvatarPerson src="https://www.google.com/url?sa=i&url=https%3A%2F%2Favi.edu.vn%2Fdat-nuoc-con-nguoi-anh-quoc%2F&psig=AOvVaw3n3m1R_-odHeK4IEdbzkac&ust=1640444791063000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJCiroHb_PQCFQAAAAAdAAAAABAD" />
                    <TitleName>
                        <NameTime>
                            {
                                user ?
                                    (< NameUser>{user.DisplayName}</NameUser>) :
                                    (< NameUser>NoName</NameUser>)
                            }

                            <Time>{publishDate}</Time>
                        </NameTime>
                        <TagBox >
                            {
                                tags ? (
                                    tags.map((tag, index) => (
                                        <TagName key={index}>
                                            #{tag.Name}
                                        </TagName>
                                    ))
                                ) : (
                                    <Typography>0</Typography>
                                )

                            }

                        </TagBox>
                    </TitleName>
                </TitleComponent>
                <JoinButton variant="contained">Join</JoinButton>
                <TitlePost>{title}</TitlePost>
                <ContexCom>
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
                </ContexCom>
                {
                    (widthPost >= 600) && <SeeMoreButton color="primary" variant="contained">See more</SeeMoreButton>
                }
                <CommentComponent>
                    <ItemButton>
                        <ChatBubbleOutlineIcon />
                        <TitleComment>{comments} Comments</TitleComment>
                    </ItemButton>
                    <ItemButton>
                        <CardGiftcardIcon />
                    </ItemButton>
                    <ItemButton>
                        <ShareIcon />
                    </ItemButton>
                    <ItemButton>
                        <BookmarkBorderIcon />
                    </ItemButton>
                    <ItemButton>
                        <VisibilityOffIcon />
                    </ItemButton>
                    <ItemButton>
                        <FlagIcon />
                    </ItemButton>

                </CommentComponent>
            </MainComponent>
        </PostCard>
    )
}

export default PostNoImageCard;