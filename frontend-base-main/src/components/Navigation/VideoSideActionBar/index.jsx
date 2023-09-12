import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentDots, faBookmark, faShare } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { Button } from 'antd';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router';

function VideoSideActionBar({ likes, comments, saves, shares }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const navigate = useNavigate()

  // Function to convert likes count to a number
  const parseLikesCount = (count) => {
    if (typeof count === 'string') {
      if (count.endsWith('K')) {
        return parseFloat(count) * 1000;
      }
      return parseInt(count);
    }
    return count;
  };

  // Function to format likes count
  const formatLikesCount = (count) => {
    if (count >= 10000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count;
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <div className="footer-right">
      <div className="sidebar-icon">
        {/* The heart icon for liking */}
        <FontAwesomeIcon
          icon={faHeart}
          style={{ width: '35px', height: '35px', color: liked ? '#FF0000' : 'white' }}
          onClick={handleLikeClick}
        />
        {/* Displaying the formatted likes count */}
        <p>{formatLikesCount(parseLikesCount(likes) + (liked ? 1 : 0))}</p>
      </div>
      <div className="sidebar-icon">
        {/* The comment icon */}
        <FontAwesomeIcon icon={faCommentDots} style={{ width: '35px', height: '35px', color: 'white' }} />
        {/* Displaying the number of comments */}
        <p>{comments}</p>
      </div>
      <div className="sidebar-icon">
        {saved ? (
          // Displaying the bookmark icon when saved
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: '35px', height: '35px', color: '#ffc107' }}
            onClick={() => setSaved(false)}
          />
        ) : (
          // Displaying the bookmark icon when not saved
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: '35px', height: '35px', color: 'white' }}
            onClick={() => setSaved(true)}
          />
        )}
        {/* Displaying the number of saves */}
        <p>{saved ? saves + 1 : saves}</p>
      </div>
      <LinkUnstyled
        href="https://funups-verify.vercel.app/token-holders?activeView=&address=128736&tokenType=&rawInput=%23%E2%8E%B1Taiko+Research+Contributors%E2%8E%B1%280x22c1f6050e56d2876009903609a2cc3fef83b415+POAP+gnosis+128736%29&inputType=POAP&tokenFilters=&activeViewToken=&activeViewCount=&blockchainType=&sortOrder=&blockchain=gnosis" 
        target="_blank"
      >
        <div className="sidebar-icon">
          {/* The share icon */}
          <FontAwesomeIcon icon={faShare} style={{ width: '35px', height: '35px', color: 'white' }} />
          {/* Displaying the number of shares */}
          <p>{shares}</p>
        </div>
      </LinkUnstyled>
      <ViewCampaignBtn 
        type='primary' 
        size='small'
        onClick={() => navigate(`/campaign/task`)}
      >
        View Campaign
      </ViewCampaignBtn>
      <div className="sidebar-icon record" style={{marginTop: "50px"}}>
        {/* Displaying the record icon */}
        <img src="https://static.thenounproject.com/png/934821-200.png" alt='Record Icon' />
      </div>
    </div>
  );
}

const ViewCampaignBtn = styled(Button)`
  margin-top: 0.5rem;
  margin-right: 1rem;
  margin-bottom: -1rem;
  position: absolute;
  right: 0;
`

const LinkUnstyled = styled.a`
  all: unset;
`

export default VideoSideActionBar;
