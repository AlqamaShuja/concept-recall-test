import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import UserInfo from '../Components/UserInfoDetails/UserInfo';
import UserFollowGrowthAndPostChart from '../Components/UserInfoDetails/UserFollowGrowthAndPostChart';
import UserTable from '../Components/user/UserTable';

const UserInfoDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  
  return (
    <div className="user-info-details">
      <UserInfo userDetails={state?.userRecord} />
      <UserFollowGrowthAndPostChart userId={id} />
      <UserTable href={`/user/${state?.userRecord.id}/post`} user={[state?.userRecord]} />
    </div>
  );
};

export default UserInfoDetails;
