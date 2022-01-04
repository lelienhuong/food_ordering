import React from "react";
import Friend from "../../components/Friend/Friend";
import ProfilePage from "./ProfilePage";
import { useEffect } from "react";
import moneyConverter from "../../utils/moneyConvert";

const Profile = (props) => {
  useEffect(() => {
    moneyConverter();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        height: "100vh",
      }}
    >
      {/* <ProfilePage />
      <Friend anchor="right" /> */}
    </div>
  );
};

export default Profile;
