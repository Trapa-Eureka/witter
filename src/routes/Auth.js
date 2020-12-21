import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMeetup, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";

const Auth = () => {
    const onSocialClick = async (event) => {
        const {target:{name}} = event;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data =  await authService.signInWithPopup(provider);
        console.log(data);
    };
    return (
        <div className="authContainer">
        <FontAwesomeIcon icon={faMeetup} color={"#f65858"} size="3x" />
            <AuthForm />
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">
                    Continue with Google<FontAwesomeIcon icon={faGoogle} />
                </button>
                <button onClick={onSocialClick} name="github" className="authBtn">
                    Continue with Github<FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    );
};

export default Auth;