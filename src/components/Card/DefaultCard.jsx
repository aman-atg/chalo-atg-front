import React from "react";
import { useHistory } from "react-router";

import { ReactComponent as MenuIcon } from "../../assets/icons/Menu.svg";

const DefaultCard = ({ id }) => {
  const history = useHistory();
  const onClick = () => history.push(`/watch?v=${id}`);

  return (
    <div className="DefaultCard">
      <img
        src="https://i.ytimg.com/vi/Ja1tcNbSMX4/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&amp;rs=AOn4CLAs6W98CK1nMCoXhA51Mmd55OYESA"
        alt="thumbnail"
      />
      <div className="details">
        <a href="/">
          <img
            src="https://yt3.ggpht.com/a-/AOh14GhvrEuBYgWHcWzS-1FzKzYJpFu52kq-VgP--w=s68-c-k-c0x00ffffff-no-rj-mo"
            alt="avatar"
          />
        </a>

        <div className="metadata">
          <h4 className="video_title">
            The Kapil Sharma Show - Movie Chichhore Uncensored | Sushant
          </h4>

          <div className="video_metadata">
            <h4 className="channel_name">Kapil Sharma</h4>
            <p className="tooltip">Kapil Sharma</p>
            <h4 className="video_metadata_views">52M views</h4>
            <h4>10 months ago</h4>
          </div>
        </div>

        <MenuIcon className="menu" />
      </div>
    </div>
  );
};

export default DefaultCard;
