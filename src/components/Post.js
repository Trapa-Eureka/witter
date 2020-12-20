import React, { useState } from "react";
import { dbService, storageService } from "fbase";

const Post = ({ postObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newPost, setNewPost] = useState(postObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this post?");
        console.log(ok);
        if (ok) {
            await dbService.doc(`posts/${postObj.id}`).delete();
            await storageService.refFromURL(postObj.attachmentUrl).delete();
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`posts/${postObj.id}`).update({
            text: newPost,
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {target: { value },} = event;
        setNewPost(value);
    };
    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Edit your post" value={newPost} required onChange={onChange} />
                        <input type="submit" value="Update Post" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{postObj.text}</h4>
                    {postObj.attachmentUrl && <img src={postObj.attachmentUrl} width="50px" height="50px" />}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Post</button>
                            <button onClick={toggleEditing}>Edit Post</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Post;