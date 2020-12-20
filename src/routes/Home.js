import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import Post from "components/Post";

const Home = ({ userObj }) => {
    const [post, setPost] = useState("");
    const [posts, setPosts] = useState([]);
    const [attachment, setAttachment] = useState();
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
        const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        const response = await fileRef.putString(attachment, "data_url");
        console.log(response);
        /* await dbService.collection("posts").add({
            text: post,
            createAt: Date.now(),
            creatorId: userObj.uid,
        });
        setPost(""); */
    };
    const onChange = (event) => {
        const { 
            target: { value },
        } = event;
        setPost(value);
    };
    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => setAttachment(null);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={post} onChange={onChange} type="text" placeholder="What is your plan on Today?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Post" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {posts.map((post) => (
                    <Post key={post.id} postObj={post} isOwner={post.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};

export default Home;