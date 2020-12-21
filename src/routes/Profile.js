
import React, { useEffect } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";

export default ({ userObj }) => {
    const history = useHistory();
    const onLogOutClick = () => {
      authService.signOut();
      history.push("/");
    };
    const getMyPost = async() => {
        const posts = await dbService.collection("posts").where("creatorId", "==", userObj.uid).orderBy("createdAt").get();
        console.log(posts.docs.map((doc) => doc.data()));
    };
    useEffect(() => {
        getMyPost();
    }, []);
    return (
      <>
        <button onClick={onLogOutClick}>Log Out</button>
      </>
    );
  };