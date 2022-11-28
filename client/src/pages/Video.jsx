import {
  AddTaskOutlined,
  ReplyOutlined,
  ThumbUpOutlined,
  ThumbDownOutlined,
} from "@mui/icons-material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuccess, like, dislike } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 24px;
  /* height: 100vh; */
`;
const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div`
  /* flex: 5; */
`;
const Recomendation = styled.div`
  flex: 2;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation();
  const pathNameArr = path.pathname.split("/");
  const videoId = pathNameArr[pathNameArr.length - 1];
  console.log("videoId: ", videoId);

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/api/videos/find/${videoId}`);
        const channelRes = await axios.get(`/api/users/find/${videoRes.data.userId}`);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(`/api/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };

  const handleDislike = async () => {
    await axios.put(`/api/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSubscribe = async () => {
    if(currentUser.subscribedUsers.includes(channel._id)) {
      await axios.put(`/api/users/unsub/${channel._id}`)
    } else {
      await axios.put(`/api/users/sub/${channel._id}`)
    }
    dispatch(subscription(channel._id));
  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
          {/* <iframe
            width="100%"
            height="520"
            src="https://www.youtube.com/embed/EeWyix8ysEc"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}
          <VideoFrame src={currentVideo.videoUrl}></VideoFrame>
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>
            {currentVideo.views} views • {format(currentVideo.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes.includes(currentUser._id) ? <ThumbUpIcon /> : <ThumbUpOutlined />}
              {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislikes.includes(currentUser._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOutlined />
              )}
              Dislike
            </Button>
            <Button>
              <ReplyOutlined />
              Share
            </Button>
            <Button>
              <AddTaskOutlined />
              Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.username}</ChannelName>
              <ChannelCounter>{channel.subscribers} Subscribers</ChannelCounter>
              <Description>{currentVideo.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSubscribe}>
            {currentUser.subscribedUsers.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id} />
      </Content>
      <Recomendation>
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
      </Recomendation>
    </Container>
  );
};

export default Video;
