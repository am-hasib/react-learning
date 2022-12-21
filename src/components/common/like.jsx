import React from "react";

const Like = (props) => {
  let fheart = "fa fa-heart";
  !props.liked === true ? (fheart += "-o") : fheart;
  return (
    <i
      onClick={props.onLike}
      className={fheart}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
    ></i>
  );
};
export default Like;
