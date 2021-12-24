import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient.js";
import Styled from "@emotion/styled";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

import { useRouter } from "next/router";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function DetailPost() {
  const [userDetail, setUserDetail] = useState([]);
  const [postDetail, setPostDetail] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    async function FetchPost() {
      const response = await axiosClient.get(
        `http://localhost:1337/posts/${id}`
      );
      setPostDetail(response.data);

      setUserDetail(response.data.User);
    }
    FetchPost();
  }, []);
  console.log("post:", postDetail);
  console.log("deteail USer", userDetail);
  return (
    <Grid container spacing={2} sx={{ mt: 5, marginRight: 5 }}>
      <Grid item xs={4}>
        <Card sx={{ maxWidth: 345, marginLeft: 10 }}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h5" color="text.secondary">
                Name:
                {userDetail.DisplayName}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                phone:{userDetail.Phone}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                Email:{userDetail.Email}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={8}>
        <Card sx={{ maxWidth: "90%" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {postDetail.Title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {postDetail.Content}
            </Typography>
          </CardContent>
          <CardContent>
            <d>
              <Typography gutterBottom variant="h5" component="div">
                Upvoted:
                {postDetail.UpvoteCount}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                <Typography gutterBottom variant="h5" component="div">
                  Upvoted:
                  {postDetail.DownvoteCount}
                </Typography>
              </Typography>
            </d>
          </CardContent>

          <CardActions>
            <Button size="small">Edit</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default DetailPost;
