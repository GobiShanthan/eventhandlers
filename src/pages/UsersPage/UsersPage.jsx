import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import UpdateUserForm from "../../components/UpdateUserForm/UpdateUserForm";

const UsersPage = () => {

  const {userInfo} = useSelector(state => state.login)
  const navigate = useNavigate()


  useEffect(() => {
    if (!userInfo) {
      navigate("/")
    } 
  }, [userInfo])



  if (userInfo) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#231f20",
          height:'100vh'

        }}
      >
        <UpdateUserForm userInfo={userInfo} />
      </div>
    );
  } else {
    return <h1>loading........</h1>;
  }
};

export default UsersPage;
