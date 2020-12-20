import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [post, setPost] = useState("");
    const [posts, setPosts] = useState([]);
    const getPosts = async() => {
        const dbPosts = await dbService.collection("posts").get();
        dbPosts.forEach((document) => {
            const postObject = {
                ...document.data(),
                id: document.id,
            };
            setPosts((prev) => [postObject, ...prev]);
        });
    };
    useEffect (() => {
        getPosts();
    }, []);
    const onSubmit = async(event) => {
        event.preventDefault();
        await dbService.collection("posts").add({
            post,
            createAt: Date.now(),
        });
        setPost("");
    };
    const onChange = (event) => {
        const { 
            target: { value },
        } = event;
        setPost(value);
    };
    console.log(posts);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={post} onChange={onChange} type="text" placeholder="What is your plan on Today?" maxLength={120} />
                <input type="submit" value="Post" />
            </form>
            <div>
                {posts.map(post => 
                    <div key={post.id}>
                        <h4>{post.post}</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;