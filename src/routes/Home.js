import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Post from "components/Post";
import PostsContainer from "components/PostsContainer";

const Home = ({ userObj }) => {
    const [posts, setPosts] = useState([]);
    useEffect (() => {
        dbService.collection("posts").onSnapshot(snapshot => {
            const postArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPosts(postArray);
        });
    }, []);
    return (
        <div>
           <PostsContainer userObj={userObj} /> 
            <div>
                {posts.map((post) => (
                    <Post key={post.id} postObj={post} isOwner={post.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};

export default Home;