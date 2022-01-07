import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import isEmpty from 'lodash/isEmpty';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginForm } from '../../redux/slices/authSlice';
import { getUser } from '../../redux/slices/userSlice';

const UpDownVote = styled(Box)({
    height: "100%",
    width: "8%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "2px"
})

const UpDownVoteText = styled(Typography)({
    fontSize: "12px",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "2px",
    marginBottom: "2px"
})

const VotePost = ({ upvoteCount, downvoteCount, userVote, handleDownVote, handleUpVote }) => {
    const userState = useSelector(getUser)
    const dispatch = useDispatch()

    const vote = upvoteCount - downvoteCount

    let isUpVote = false,
        isDownVote = false

    if (userVote) {
        if (userVote.Upvote) {
            isUpVote = true
        } else if (userVote.Downvote) {
            isDownVote = true
        }
    }

    const handleClickDownVote = () => {
        if (isEmpty(userState)) {
            dispatch(toggleLoginForm())
        } else {
            handleDownVote()
        }
    }

    const handleClickUpVote = () => {
        if (isEmpty(userState)) {
            dispatch(toggleLoginForm())
        } else {
            handleUpVote()
        }
    }


    return (
        <UpDownVote>
            <IconButton color={isUpVote ? 'error' : 'default'} onClick={() => handleClickUpVote()}>
                <ArrowCircleUpIcon />
            </IconButton>
            <UpDownVoteText>
                {vote}
            </UpDownVoteText>
            <IconButton
                color={isDownVote ? 'error' : 'default'}
                onClick={() => handleClickDownVote()}
                >
                <ArrowCircleDownIcon />
            </IconButton>
        </UpDownVote>
    )
}

export default VotePost;