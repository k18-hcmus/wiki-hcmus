import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import FlagIcon from '@mui/icons-material/Flag'
import ShareIcon from '@mui/icons-material/Share'
import { Avatar, Box, Button, Card, Chip, Grid, IconButton, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import draftToHtml from 'draftjs-to-html'
import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import axiosClient from '../../axiosClient'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../redux/slices/userSlice'
import VoteVertical from './vote-vertical'
import Link from 'next/link'
import PostActionButtons from '../commons/post-action-buttons'
import { fDateTime } from '../../utils/formatTime'
const PostCard = styled(Card)({
  width: '858px',
  minHeight: '300px',
  maxHeight: '600px',
  display: 'flex',
  flexDirection: 'row',
  marginTop: '10px',
  marginBottom: '10px',
})

const UpdownBox = styled(Box)({
  width: '35px',
  minHeight: '100%',
  borderRadius: '2px',
  backgroundColor: '#F9FAFB',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingTop: '3px',
})

const MainComponent = styled(Box)({
  width: '90%',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
})

const TitleComponent = styled(Box)({
  width: '100%',
  height: '50px',
  display: 'flex',
  flexDirection: 'row',
  marginLeft: '7px',
  marginTop: '5px',
})

const AvatarPerson = styled(Avatar)({
  width: '40px',
  height: '40px',
})

const TitleName = styled(Box)({
  width: '70%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '7px',
})

const NameTime = styled(Box)({
  wdith: '100%',
  height: '50%',
  display: 'flex',
  flexDirection: 'row',
})

const NameUser = styled(Typography)({
  fontSize: '16px',
  color: '#000',
  fontWeight: 'bold',
})

const Time = styled(Typography)({
  fontSize: '16px',
  color: '#a7a7a0',
  marginLeft: '5px',
})

const TagBox = styled(Box)({
  width: '100%',
  height: '50%',
  display: 'flex',
  flexDirection: 'row',
  marginTop: '-5px',
})

const TagName = styled(Typography)({
  fontSize: '15px',
  color: '#1680b2',
  marginLeft: '5px',
})

const TitlePost = styled(Typography)({
  fontSize: '20px',
  marginLeft: '7px',
  fontWeight: 'bold',
})

const ContexCom = styled(Box)({
  marginLeft: '7px',
  fontSize: '16px',
  maxHeight: '80%',
  overflow: 'hidden',
})

const JoinButton = styled(Button)({
  position: 'absolute',
  right: '5px',
  top: '10px',
  borderRadius: '20px',
  width: '60px',
  height: '40px',
})

const CommentComponent = styled(Box)({
  position: 'absolute',
  bottom: '0px',
  width: '100%',
  backgroundColor: '#fff',
})

const TitleComment = styled(Typography)({
  color: '#bcbebf',
  fontSize: '14px',
  fontWeight: 'bold',
})

const ItemButton = styled(IconButton)({
  borderRadius: '0px',
  marginLeft: '10px',
  marginRight: '10px',
})

const UpDownVoteButton = styled(IconButton)({
  width: '25px',
  height: '25px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '3px',
})

const SeeMoreButton = styled(Button)({
  width: '200px',
  height: '30px',
  borderRadius: '15px',
  position: 'absolute',
  bottom: '50px',
  left: '300px',
  zIndex: 10,
})

const PostNoImageCard = ({ post }) => {
  const [widthPost, setWidthPost] = useState()
  const draftContent = JSON.parse(post.Content)
  const htmlContent = draftToHtml(draftContent)
  const router = useRouter()
  const [votes, setVotes] = useState(post.PostVotes)
  const userState = useSelector(getUser)
  const ref = useRef(null)
  let upvotes = votes.filter((v) => v.Upvote)
  let downvotes = votes.filter((v) => v.Downvote)
  let userVote
  if (!isEmpty(userState)) {
    userVote = votes.find((v) => {
      return (
        v.User == get(userState, 'DetailUser', '') || v.User == get(userState, 'DetailUser.id', '')
      )
    })
  }
  useEffect(() => {
    setWidthPost(ref.current.offsetHeight)
  })
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
  return (
    <PostCard ref={ref}>
      <UpdownBox>
        <VoteVertical
          upvoteCount={upvotes.length}
          downvoteCount={downvotes.length}
          userVote={userVote}
          handleDownVote={handleDownVote}
          handleUpVote={handleUpVote}
        />
      </UpdownBox>
      <MainComponent>
        <TitleComponent>
          <Link href={`/profile/${post.User.id}`} passHref>
            <a>
              <AvatarPerson src="/static/avatars/avatar_1.jpg" />
            </a>
          </Link>
          <TitleName>
            <NameTime>
              <Link href={`/profile/${post.User.id}`} passHref>
                <a>
                  <NameUser>{post.User.DisplayName}</NameUser>
                </a>
              </Link>
              <Time>{fDateTime(post.published_at)}</Time>
            </NameTime>
            <TagBox>
              <Grid container direction="row" spacing={1}>
                {post.Tags &&
                  post.Tags.map((tag, index) => (
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
                  ))}
              </Grid>
            </TagBox>
          </TitleName>
        </TitleComponent>
        <JoinButton onClick={handlePostDetail} variant="contained">
          Join
        </JoinButton>
        <TitlePost>{post.Title}</TitlePost>
        <ContexCom>
          <Link href={`/posts/${post.id}`} passHref>
            <a>
              <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
            </a>
          </Link>
        </ContexCom>
        {widthPost >= 600 && (
          <SeeMoreButton color="primary" variant="contained" onClick={handlePostDetail}>
            See more
          </SeeMoreButton>
        )}
        <CommentComponent>
          <PostActionButtons post={post} />
        </CommentComponent>
      </MainComponent>
    </PostCard>
  )
}

export default PostNoImageCard
