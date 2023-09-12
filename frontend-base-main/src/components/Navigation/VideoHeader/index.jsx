import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { styled } from 'styled-components';

const VideoHeader = () => {
  return (
    <VideoTopHeader>
      <FontAwesomeIcon icon={faPlay} className='icon'/>
      <h2>Following  |   <span>For You</span></h2>
      <FontAwesomeIcon icon={faVolumeHigh} className='icon'/>
    </VideoTopHeader>
  );
};

const VideoTopHeader = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  padding-left: 1rem;
  padding-right: 1rem;
  background: transparent;
  & h2 {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    padding: 0 40px;
  }
  & h2 span {
    font-weight: 700;
    position: relative;
  }

  & h2 span::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 50%;
    height: 1px;
    background-color: #fff;
    transform: translateX(50%);
  }
  & .icon {
    font-size: 16px;
    color: #fff;
    cursor: pointer;
  }
`

export default VideoHeader;
