import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const PostsContainer = ({ userObj }) => {
    const [post, setPost] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (event) => {
        if (post === "") {
            return;
        }
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
    const onClearAttachment = () => setAttachment("");
    return (
        <form onSubmit={onSubmit} className="postForm">
            <div className="postInput__container">
                <input className="postInput__input" value={post} onChange={onChange} type="text" placeholder="What is your plan on Today?" maxLength={120} />
                <input type="submit" value="&rarr;" className="postInput__arrow" />
            </div>
            <label for="attach-file" className="postInput__label">
                <span>Add Photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} style={{opacity:0,}} />
            {attachment && (
                <div className="postForm__attachment">
                    <img src={attachment} style={{backgroundImage:attachment,}} alt=""/>
                    <div className="postForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    )
};

export default PostsContainer;