import { Box, Button, Card, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { getPosts } from "../../utils/home-utils"
import { useState, useEffect, useRef } from "react"
import LazyLoad from 'react-lazyload';
import PostNoImageCard from './post-no-image-card'
import { animateScroll as scroll } from 'react-scroll'


const HorizoneFeature = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dae0e6",
    flexDirection: "column",
})

const PostCard = styled(Card)({
    width: "800px",
    minHeight: "300px",
    maxHeight: "600px",
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
    marginBottom: "10px"
})

const BackToTopButton = styled(Button)({
    width: "200px",
    height: "40px",
    borderRadius: "15px",
    position: "fixed",
    bottom: "50px",
    right: "50px",
    zIndex: 10,
})

const SpinnerLoadding = () => {
    return (
        <Typography>There is no post at home</Typography>
    )
}

const Home = () => {
    const [postsData, setPostsData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [visible,setVisible]=useState(false)

    useEffect(()=>{
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 600) {
              setVisible(true);
            } else {
              setVisible(false);
            }
          });
    },[])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const result = await getPosts()
                setPostsData(result.data)

            } catch {
                console.log("Error get Post at Home")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const scrollToTop=()=>{
        scroll.scrollToTop()
    }

    return (
        isLoading ? <SpinnerLoadding /> :
            <HorizoneFeature>
                {
                    (postsData.length !== 0) ? (
                        postsData.map((post, index) => (
                            <LazyLoad
                                key={index}
                                height={150}
                                once={true}
                            >
                                <PostNoImageCard title={post.Title} user={post.User} comments={post.Comments.length} tags={post.Tags} publishDate={post.published_at} upvote={post.UpvoteCount} content={post.Content} />
                            </LazyLoad>
                        ))) : (
                        <Typography>There is no post</Typography>
                    )
                }
            {
                visible && <BackToTopButton color="primary" variant="contained" onClick={scrollToTop}>Back To Top</BackToTopButton>
            }
            </HorizoneFeature>

    )
}

export default Home