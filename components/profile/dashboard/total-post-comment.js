import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import CommentIcon from '@mui/icons-material/Comment';

const TotalPostComment = (props) => {
  const {totalPost, totalComment} = props;
  return (
    <Card {...props}>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
              POSTS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {totalPost}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                mt : 2,
                backgroundColor: 'primary.main',
                height: 56,
                width: 56
              }}
            >
              <ArticleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
              COMMENTS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {totalComment}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                mt : 2,
                backgroundColor: 'primary.main',
                height: 56,
                width: 56
              }}
            >
              <CommentIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TotalPostComment;