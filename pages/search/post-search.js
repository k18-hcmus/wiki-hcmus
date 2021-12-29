import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FlagIcon from '@mui/icons-material/Flag';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const PostCard = styled(Card)({
    width: "900px",
    height: "150px",
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
    marginBottom: "10px",
})

const UpDownVote = styled(Box)({
    height: "100%",
    width: "8%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "2px"
})

const MainCom = styled(Box)({
    height: "100%",
    width: "92%",
    display: "flex",
    flexDirection: "row"
})

const ImageBox = styled(Box)({
    height: "100%",
    width: "15%",
    paddingTop:"5px"
})

const ContentCom = styled(Box)({
    height: "100%",
    width: "85%",
    display: "flex",
    flexDirection: "column"
})

const TitleBox = styled(Box)({
    width: "100%",
    height: "50px",
    display: "flex",
    flexDirection: "row",
    marginLeft: "5px",
    marginTop: "20px"
})

const TitleName = styled(Typography)({
    fontSize: "20px",
    fontWeight: "bold",
})

const ArtButton = styled(Button)({
    width: "30px",
    height: "30px",
    borderRadius: "15px",
    backgroundColor: "#d98444",
    color: "#fff",
    marginLeft:"30px"
})

const TagUserTimeBox = styled(Box)({
    width: "800px",
    height: "50px",
    display: "flex",
    flexDirection: "row",
    marginlef: "5px",
    marginTop: "8px"
})

const TagName = styled(Typography)({
    fontSize: "15px",
    fontWeight: "bold",
    color:"#0d6b9f"
})

const PostBy = styled(Typography)({
    fontSize: "15px",
    color: "#999993",
    marginLeft:"5px"
})

const UserName = styled(Typography)({
    fontSize: "15px",
    fontWeight: "bold",
    backgroundColor: "#a7a7a0",
    marginLeft: "3px"
})

const Time = styled(Typography)({
    fontSize: "15px",
    color: "#999993",
    marginLeft:"5px"
})

const ReactBox = styled(Box)({
    width: "100%",
    height: "30%",
    display: "flex",
    flexDirection: "row",
})

const ReactCommentBox = styled(Box)({
    width: "9%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
})

const CommentText = styled(Typography)({
    fontSize: "15px",
    fontWeight: "bold",
    marignLeft: "3px",
})

const UpDownVoteText = styled(Typography)({
    width: "100%",
    fontSize: "12px",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "2px",
    marginBottom: "2px"
})

const PostSearch = () => {
    return (
        <PostCard>
            <UpDownVote>
                <IconButton>
                    <ArrowCircleUpIcon />
                </IconButton>
                <UpDownVoteText>
                    asdha
                </UpDownVoteText>
                <IconButton>
                    <ArrowCircleDownIcon />
                </IconButton>
            </UpDownVote>
            <MainCom>
                <ImageBox>
                    <img
                    width="100px"
                    heigt="100px"
                        src={"https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2021/05/26/ngo-ngang-voi-ve-dep-cua-hot-girl-anh-the-chua-tron-18-docx-1622043349706.jpeg"}
                    />
                </ImageBox>
                <ContentCom>
                    <TitleBox>
                        < TitleName>
                            abc
                        </TitleName>
                        < ArtButton>
                            Art
                        </ArtButton>
                    </TitleBox>
                    <TagUserTimeBox>
                        <TagName>
                            #asdasd
                        </TagName>
                        <PostBy>
                            Post by
                        </PostBy>
                        <UserName>
                            asdasdasd asdasd
                        </UserName>
                        < Time>
                            asdasdasd
                        </Time>
                    </TagUserTimeBox>
                    <ReactBox>
                        <IconButton>
                        <ReactCommentBox>
                            <ChatBubbleOutlineIcon />
                            <CommentText>
                                Comment
                            </CommentText>
                        </ReactCommentBox>
                        </IconButton>
                        <IconButton>
                        <ReactCommentBox>
                            <CardGiftcardIcon />
                            <CommentText>
                                Award
                            </CommentText>
                        </ReactCommentBox>
                        </IconButton>
                        <IconButton>
                        <ReactCommentBox>
                            <ShareIcon />
                            <CommentText>
                                Share
                            </CommentText>
                        </ReactCommentBox>
                        </IconButton>
                       <IconButton>
                       <ReactCommentBox>
                            <BookmarkBorderIcon />
                            <CommentText>
                                Save
                            </CommentText>
                        </ReactCommentBox>
                       </IconButton>
                        <IconButton>
                        <ReactCommentBox>
                            <VisibilityOffIcon />
                            <CommentText>
                                Hide
                            </CommentText>
                        </ReactCommentBox>
                        </IconButton>
                        <IconButton>
                        <ReactCommentBox>
                            <FlagIcon />
                            <CommentText>
                                Report
                            </CommentText>
                        </ReactCommentBox>
                        </IconButton>
                    </ReactBox>
                </ContentCom>
            </MainCom>
        </PostCard>
    )
}

export default PostSearch;