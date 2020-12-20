import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    console.log(userObj);
    const [post, setPost] = useState("");
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
    const onSubmit = async(event) => {
        event.preventDefault();
        await dbService.collection("posts").add({
            text: post,
            createAt: Date.now(),
            creatorId: userObj.uid,
        });
        setPost("");
    };
    const onChange = (event) => {
        const { 
            target: { value },
        } = event;
        setPost(value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={post} onChange={onChange} type="text" placeholder="What is your plan on Today?" maxLength={120} />
                <input type="submit" value="Post" />
            </form>
            <div>
                {posts.map(post => 
                    <div key={post.id}>
                        <h4>{post.text}</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;