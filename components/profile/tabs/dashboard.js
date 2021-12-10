import React, { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import MonthlyContribution from '../dashboard/monthly-contribution';
import LatestOrders from '../dashboard/latest-orders';
import LatestProducts from '../dashboard/latest-products';
import Sales from '../dashboard/sales';
import TotalUpvoteDownvote from '../dashboard/total-upvote-downvote';
import TotalContribution from '../dashboard/total-contribution';
import TotalPostComment from '../dashboard/total-post-comment';
import TrafficByDevice from '../dashboard/traffic-by-device';

const Dashboard = () => {
    const [cPLastMonth, setCPLastMonth] = useState(101);
    const [cPThisMonth, setCPThisMonth] = useState(129);
    const [totalCP, setTotalCP] = useState(1432);
    const [totalUpvote, setTotalUpvote] = useState(213);
    const [totalDownvote, setTotalDownvote] = useState(56);
    const [totalPost, setTotalPost] = useState(19);
    const [totalComment, setTotalComment] = useState(43);
    return (
        <Box
            component="main"
            sx={{
            flexGrow: 1,
            py: 8
            }}
        >
            <Container maxWidth={false}>
            <Grid
                container
                spacing={3}
            >
                <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
                >
                <MonthlyContribution 
                    cPThisMonth={cPThisMonth}
                    cPLastMonth={cPLastMonth}
                />
                </Grid>
                <Grid
                item
                xl={3}
                lg={3}
                sm={6}
                xs={12}
                >
                <TotalContribution 
                    totalCP={totalCP}
                />
                </Grid>
                <Grid
                item
                xl={3}
                lg={3}
                sm={6}
                xs={12}
                >
                <TotalUpvoteDownvote 
                    totalUpvote={totalUpvote}
                    totalDownvote={totalDownvote}
                />
                </Grid>
                <Grid
                item
                xl={3}
                lg={3}
                sm={6}
                xs={12}
                >
                <TotalPostComment 
                    totalPost={totalPost}
                    totalComment={totalComment}
                />
                </Grid>
                <Grid
                item
                lg={8}
                md={12}
                xl={9}
                xs={12}
                >
                <Sales />
                </Grid>
                <Grid
                item
                lg={4}
                md={6}
                xl={3}
                xs={12}
                >
                <TrafficByDevice sx={{ height: '100%' }} />
                </Grid>
                <Grid
                item
                lg={4}
                md={6}
                xl={3}
                xs={12}
                >
                <LatestProducts sx={{ height: '100%' }} />
                </Grid>
                <Grid
                item
                lg={8}
                md={12}
                xl={9}
                xs={12}
                >
                <LatestOrders />
                </Grid>
            </Grid>
            </Container>
        </Box>
    );
}

export default Dashboard;