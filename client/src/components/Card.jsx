import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Video from "../pages/Video";
import { format } from "timeago.js";
import axios from "axios";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  if (!video) {
    video = {
      _id: "6325723df0474bd889b51f1d",
      username: "test1",
      email: "test1@gmail.com",
      subscribers: 0,
      subscribedUsers: ["6324cef90609fb69d858c2ae"],
      fromGoogle: false,
      createdAt: "2022-09-17T07:07:41.881Z",
      updatedAt: "2022-09-17T07:43:40.863Z",
      __v: 0,
    };
  }
  const [channel, setChannel] = useState({});
  // useEffect(() => {
  //   const fetchChannels = async () => {
  //     const res = await axios.get(`/api/users/find/${video.userId}`);
  //     setChannel(res.data);
  //     console.log(res.data);
  //   };

  //   fetchChannels();
  // }, [video.userId]);

  // {console.log(video.imageUrl)}
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          // src={"https://i.ytimg.com/vi/aGN0pXIaCaA/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAKqe7a8qGlLHRiUa8DiMQlb6aYHQ"}
          // src={video.imgUrl}

          type={type}
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            // src={"https://yt3.ggpht.com/ytc/AMLnZu8GnUmyc-TNNZ6OHURrHrre9QJ-_6jalsLeIQ=s88-c-k-c0x00ffffff-no-rj"}
            src={channel.img}
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.username}</ChannelName>
            <Info>
              {video.views} views • {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
