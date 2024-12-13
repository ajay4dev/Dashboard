import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import SearchIcon from "@mui/icons-material/Search";
import SvgIcon from "@mui/material/SvgIcon";
import { useTheme } from "@mui/material/styles";

const CoinMarkets = () => {
  const theme = useTheme();

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.name.toLowerCase().includes(search.toLowerCase())
  );

  const fetchPosts = () => {
    // Placeholder API to simulate posts; replace with real social media posts API.
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        const mockData = response.data.slice(0, 10).map((post, index) => ({
          id: post.id,
          name: `User ${index + 1}`,
          avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
          content: post.body,
          likes: Math.floor(Math.random() * 1000),
          comments: Math.floor(Math.random() * 500),
        }));
        setPosts(mockData);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search Users or Posts"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        {filteredPosts.map((post) => (
          <Card key={post.id} sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar src={post.avatar} alt={post.name} sx={{ mr: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {post.name}
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography>{post.content}</Typography>
              </Box>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <IconButton>
                  <FavoriteIcon sx={{ color: theme.palette.error.main }} />
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    {post.likes}
                  </Typography>
                </IconButton>
                <IconButton>
                  <CommentIcon sx={{ color: theme.palette.info.main }} />
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    {post.comments}
                  </Typography>
                </IconButton>
                <IconButton>
                  <ShareIcon sx={{ color: theme.palette.primary.main }} />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default CoinMarkets;
