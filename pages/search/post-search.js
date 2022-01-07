import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FlagIcon from '@mui/icons-material/Flag';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Avatar, Box, Button, Chip, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axiosClient from "../../axiosClient";
import { getUser } from "../../redux/slices/userSlice";
import { REPORT_CONST } from '../../shared/constants';
import ReportDialog from './report-dialog';
import VotePost from './votePost';

const PostCard = styled(Box)({
    width: "900px",
    height: "150px",
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
    marginBottom: "10px",
    borderRadius: "10px"
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
    paddingTop: "5px"
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

const TitleName = styled(Box)({
    fontSize: "20px",
    fontWeight: "bold",
    width: "90%"
})

const ArtButton = styled(Button)({
    width: "30px",
    height: "30px",
    borderRadius: "15px",
    backgroundColor: "#d98444",
    color: "#fff",
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
    color: "#0d6b9f",
    marginLeft: "5px"
})

const PostBy = styled(Typography)({
    fontSize: "15px",
    color: "#999993",
    marginLeft: "5px"
})

const UserName = styled(Typography)({
    fontSize: "15px",
    fontWeight: "bold",
    backgroundColor: "#a7a7a0",
    marginLeft: "3px",
    height: "25px"
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

const CommentBox = styled(Box)({
    width: "100%",
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

const CommentButton = styled(IconButton)({
    width: "21%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
})

const PostSearch = ({ post }) => {
    const [votes, setVotes] = useState(post.PostVotes)
    const [openAlert, setOpenAlert] = useState(false)
    const userState = useSelector(getUser)
    const router = useRouter()
    let upvotes = votes.filter((v) => v.Upvote)
    let downvotes = votes.filter((v) => v.Downvote)
    let userVote = {}
    const [openReportDialog, setOpenReportDialog] = useState(false)
    const handleClickReport = () => {
        setOpenReportDialog(true)
    }
    const handleReportClose = () => {
        setOpenReportDialog(false)
    }

    if (!isEmpty(userState)) {
        userVote = votes.find((v) => {
            return (
                v.User == get(userState, 'DetailUser', '') || v.User == get(userState, 'DetailUser.id', '')
            )
        })
    }
    const handleClickTag = (event) => {
        router.push(`/tags/${event.currentTarget.id}`)
    }
    const handlePostDetail = () => {
        router.push(`/posts/${post.id}`)
    }
    const handleDownVote = async () => {
        if (userVote) {
            const response = await axiosClient.put(`/post-votes/${userVote.id}`, {
                Downvote: !userVote.Downvote,
                Upvote: false,
            })

            setVotes((prevState) => {
                const updatedObjIndex = prevState.findIndex((v) => v.id == response.data.id)
                prevState[updatedObjIndex] = response.data
                return [...prevState]
            })
        } else {
            const response = await axiosClient.post('/post-votes', {
                Downvote: true,
                Upvote: false,
                Post: post.id,
                User: userState.DetailUser,
            })

            setVotes((prevState) => [response.data, ...prevState])
        }
    }

    const handleUpVote = async () => {
        if (userVote) {
            const response = await axiosClient.put(`/post-votes/${userVote.id}`, {
                Downvote: false,
                Upvote: !userVote.Upvote,
            })

            setVotes((prevState) => {
                const updatedObjIndex = prevState.findIndex((v) => v.id == response.data.id)
                prevState[updatedObjIndex] = response.data
                return [...prevState]
            })
        } else {
            const response = await axiosClient.post('/post-votes', {
                Downvote: false,
                Upvote: true,
                Post: post.id,
                User: userState.DetailUser,
            })

            setVotes((prevState) => [response.data, ...prevState])
        }
    }

    const handleClickComment = () => {
        router.push(`/posts/${post.id}`)
    }
    const handleClickShare = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClickHide = () => {
        window.setTimeout(() => setOpenAlert(false), 2000)
        setOpenAlert(true)
    }
    const handleClickSave = () => {
        window.setTimeout(() => setOpenAlert(false), 2000)
        setOpenAlert(true)
    }

    const [anchorEl, setAnchorEl] = useState(null)
    const openShareMenu = Boolean(anchorEl)
    const handleCloseShareMenu = () => {
        setAnchorEl(null)
    }
    const handleClickShareCopyLink = () => {
        const link = `${window.location.origin}/posts/${post.id}`
        window.prompt('Copy to clipboard: Ctrl+C, Enter', link)
        setAnchorEl(null)
    }
    const handleClickShareEmbed = () => {
        setAnchorEl(null)
    }

    return (
        <PostCard sx={{ boxShadow: 3 }}>
            <VotePost
                upvoteCount={upvotes.length}
                downvoteCount={downvotes.length}
                userVote={userVote}
                handleDownVote={handleDownVote}
                handleUpVote={handleUpVote}
            />
            <MainCom>
                <ImageBox>
                    <Link href={`/posts/${post.id}`} passHref>
                        <a>
                            <img
                                width="100px"
                                heigt="150px"
                                src={"https://res.cloudinary.com/dxcl8rs3s/image/upload/v1639026780/wiki-hcmus/tlzv528il6sgon2yjcnk.jpg"}
                            />
                        </a>
                    </Link>
                </ImageBox>

                <ContentCom>
                    <TitleBox>
                        < TitleName component={"span"} variant={"body2"}>
                            {post.Title}
                        </TitleName>
                        < ArtButton onClick={handlePostDetail}>
                            Art
                        </ArtButton>
                    </TitleBox>
                    <TagUserTimeBox>
                        {
                            (post.Tags.map((tag, index) => (
                                <Grid item key={index}>
                                    <Chip
                                        size="small"
                                        id={tag.id}
                                        label={tag.Name}
                                        icon={<Avatar sx={{ width: 25, height: 25 }} src={tag.AvatarURL} />}
                                        sx={{ color: '#FFFFFF', backgroundColor: tag.ColorTag }}
                                        onClick={handleClickTag}
                                    />
                                </Grid>
                            )))
                        }
                        <PostBy>
                            Post by
                        </PostBy>

                        {
                            post.User && (
                                <Link href={`/profile/${post.User.id}`} passHref>
                                    <a>
                                        <UserName>
                                            {post.User.DisplayName}
                                        </UserName>
                                    </a>
                                </Link>
                            )
                        }
                    </TagUserTimeBox>
                    <ReactBox>
                        <CommentButton onClick={handleClickComment}>
                            <CommentBox>
                                <ChatBubbleOutlineIcon />
                                <CommentText>
                                    {post.Comments.length} Comments
                                </CommentText>
                            </CommentBox>
                        </CommentButton>
                        <IconButton
                            onClick={handleClickShare}
                            id="share-button"
                            aria-controls="share-menu"
                            aria-haspopup="true"
                            aria-expanded={openShareMenu ? 'true' : undefined}
                        >
                            <ReactCommentBox>
                                <ShareIcon />
                                <CommentText>
                                    Share
                                </CommentText>
                            </ReactCommentBox>
                        </IconButton>
                        <Menu
                            id="share-menu"
                            aria-labelledby="share-button"
                            anchorEl={anchorEl}
                            open={openShareMenu}
                            onClose={handleCloseShareMenu}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <MenuItem onClick={handleClickShareCopyLink}>Copy Link</MenuItem>
                            <MenuItem onClick={handleClickShareEmbed}>Embed</MenuItem>
                        </Menu>
                        <IconButton onClick={handleClickSave}>
                            <ReactCommentBox>
                                <BookmarkBorderIcon />
                                <CommentText>
                                    Save
                                </CommentText>
                            </ReactCommentBox>
                        </IconButton>
                        <IconButton onClick={handleClickHide}>
                            <ReactCommentBox>
                                <VisibilityOffIcon />
                                <CommentText>
                                    Hide
                                </CommentText>
                            </ReactCommentBox>
                        </IconButton>
                        <IconButton onClick={handleClickReport}>
                            <ReactCommentBox>
                                <FlagIcon />
                                <CommentText>
                                    Report
                                </CommentText>
                            </ReactCommentBox>
                        </IconButton>
                        <ReportDialog
                            open={openReportDialog}
                            type={REPORT_CONST.TYPE.POST}
                            data={post}
                            callbackClose={handleReportClose}
                            userId={16}
                        />
                    </ReactBox>
                </ContentCom>
            </MainCom>
        </PostCard >
    )
}

export default PostSearch;