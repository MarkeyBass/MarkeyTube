import React from "react";
import styled from "styled-components";
import MarkeyTube from "../images/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const Container = styled.div`
  height: 100vh;
  overflow-y: auto;
  flex: 1;
  /* background-color: #202020; */

  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  position: sticky;
  top: 0;

  // Scroller
  //============
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    /* background: #202020; */
    background-color: ${({ theme }) => theme.soft};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #c5c5c5;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
`;

const Wrapper = styled.div`
  padding: 18px 26px;
  /* @media(max-width: 768) {
    
  } */
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
  font-weight: bold;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
  @media (max-width: 1200px) {
    font-size: 0;
  }
`;

const Hr = styled.hr`
  margin: 15px 0;
  /* border: 0.5px solid white; */
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`
  @media(max-width: 1200px) {
    font-size: 0;
  }`;
const Logout = styled.div`
  @media (max-width: 1200px) {
    font-size: 0;
  }
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  /* text-decoration: none; */
  @media (max-width: 1200px) {
    font-size: 0;
    padding: 5px 0 5px 6px;
  }
`;

const Title = styled.h2`
  font-size: 0.9rem;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
  @media(max-width: 1200px) {
    font-size: 0;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

function Menu({ darkMode, setDarkMode }) {
  const { currentUser } = useSelector((state) => state.user);
  // const currentUser = null
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    await navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={MarkeyTube} />
            MarkeyTube
          </Logo>
        </Link>
        <Item>
          <HomeIcon />
          Home
        </Item>
        <Link to="/trend" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </Link>
        <Link to="/sub" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Hr />
        {currentUser ? (
          <>
            <Logout>
              {/* <Link to="/" style={{ textDecoration: "none" }}> */}
              <Button
                style={{ color: "#f05173", border: "1px solid #f05173" }}
                onClick={handleLogout}
              >
                <AccountCircleOutlinedIcon />
                SIGN OUT
              </Button>
              {/* </Link> */}
            </Logout>
            <Hr />
          </>
        ) : (
          <>
            <Login>
              Sign in to like videos, comment and subscribe.
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}
        <Title>BEST OF MAERKEYTUBE</Title>
        <Item>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        <Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Item>
          <MovieOutlinedIcon />
          Movies
        </Item>
        <Item>
          <ArticleOutlinedIcon />
          News
        </Item>
        <Item>
          <LiveTvOutlinedIcon />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Item>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {!darkMode ? "Dark" : "Ligth"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
}

export default Menu;
