import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { SwiperSlide } from "swiper/react";
import VideoBotInfoBar from "../Navigation/VideoBotInfoBar";
import VideoSideActionBar from "../Navigation/VideoSideActionBar";

function VideoCard(props) {
  const { url, username, description, song, likes, shares, comments, saves, profilePic, setVideoRef, autoplay } = props;
  const videoRef = useRef(null);

  useEffect(() => {
    if (autoplay) {
      videoRef.current.play();
    }
  }, [autoplay]);

  const onVideoPress = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <StyledCard>
      <Video
        onClick={onVideoPress}
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        muted="muted"
        src={url}
      />
      <BottomControls>
        <div className="footer-left">
          <VideoBotInfoBar username={username} description={description} song={song} profilePic={profilePic} />
        </div>
        <div className="footer-right">
          <VideoSideActionBar likes={likes} shares={shares} comments={comments} saves={saves}  />
        </div>
      </BottomControls>
    </StyledCard>
  );
}

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  object-fit: fill ;
  width: 100%;
  height: 100%;
`

const BottomControls = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
  flex: auto
`

const StyledCard = styled(SwiperSlide)`
  background: red;
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;

  & video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
// just a workaround. ignore this.
// https://github.com/nolimits4web/swiper/issues/4413#issuecomment-1021387492
VideoCard.displayName = "SwiperSlide";

export default VideoCard;
