import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMeetup } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
    <nav>
        <ul>
            <li>
                <Link to="/">
                    <FontAwesomeIcon icon={faMeetup} color={"#f65858"} size="2x" />
                </Link>
            </li>
            <li>
                <Link to="/profile">
                    <FontAwesomeIcon icon={faUser} color={"#f65858"} size="2x" />
                    <span>
                        {userObj.displayName ? `${userObj.displayName}'s Profile` : "Profile"}
                    </span>
                </Link>
            </li>
        </ul>
    </nav>
);

export default Navigation;