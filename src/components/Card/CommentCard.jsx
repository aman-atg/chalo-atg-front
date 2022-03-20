// Celina Sharma  | 2 days ago
// can't wait for everyone to hear the full song
// Like btn  4.1k  dislike btn   Reply
// > View 74 replies

import React from "react";
import { useHistory } from "react-router";
import { ReactComponent as MenuIcon } from "../../assets/icons/Menu.svg";

const CommentCard = ({ id }) => {
  const history = useHistory();
  const onClick = () => {};

  return (
    <div className="CommentCard" onClick={onClick}>
      <img
        src="https://i.ytimg.com/vi/Ja1tcNbSMX4/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&amp;rs=AOn4CLAs6W98CK1nMCoXhA51Mmd55OYESA"
        alt="thumbnail"
      />
    </div>
  );
};

export default CommentCard;
