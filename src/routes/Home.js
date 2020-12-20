import React, { useState } from "react";

const Home = () => {
    const [post, setPost] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
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
        </div>
    );
};

export default Home;