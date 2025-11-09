// RenderMessage.jsx
// Render Props component to display dynamic UI content

import React from "react";

const RenderMessage = ({ render }) => {
    return <div className="alert alert-info text-center mt-3">{render()}</div>;
};

export default RenderMessage;
