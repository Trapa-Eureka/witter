import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";

const PostsContainer = ({ userObj }) => {
    const [post, setPost] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment !== "") {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const postObj = {
            text: post,
            createAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        await dbService.collection("posts").add(postObj);
        setPost("");
        setAttachment("");
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
        <form onSubmit={onSubmit}>
            <input value={post} onChange={onChange} type="text" placeholder="What is your plan on Today?" maxLength={120} />
            <input type="file" accept="image/*" onChange={onFileChange} />
            <input type="submit" value="Post" />
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" alt=""/>
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            )}
        </form>
    )
};

export default PostsContainer;