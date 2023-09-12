import React from 'react';
import './index.css';
import { styled } from 'styled-components';

export default function VideoBotInfoBar({ username, description, song, profilePic }) {

  return (
    <div className="footer-container">
      <div className="footer-left">
        <div className="text">
          
          <p>{description}</p>
          <SponsorSection>
            <div className="sidebar-icon">
              {profilePic ? (
                  // Displaying the user profile picture
                  <img src={profilePic} className='userprofile' alt='Profile' style={{ width: '45px', height: '45px', color: '#616161' }} />
                ) : null}
            </div>
            <h3>@{username}</h3>
          </SponsorSection>
          <div className="ticker">
            {/* eslint-disable-next-line jsx-a11y/no-distracting-elements */}
            <marquee direction="left" scrollamount="2">
              <span>{song}</span>
            </marquee>
          </div>
        </div>
      </div>
    </div>
  );
}

const SponsorSection = styled.div`
  display:flex;
`
