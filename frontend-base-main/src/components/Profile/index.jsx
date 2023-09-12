import React from "react";
import { styled } from "styled-components";

export const Profile = ({username, profilePic}) => {

  return (
    <>
      <div className="sidebar-icon">
        {profilePic ? (
            <ProfileImgStyled 
              src={profilePic} 
              className='userprofile' 
              alt='Profile'
            />
          ) : null}
      </div>
      <h3>@{username}</h3>
    </>
  );
};

const ProfileImgStyled = styled.img`
  width: '45px';
  height: '45px'; 
  color: '#616161';
`
