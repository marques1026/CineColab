import React from "react";
import "./button.css";

export default function Button({ 
  children, 
  variant = "primary", 
  onClick, 
  type = "button", 
  style 
}) {
  return (
    <button 
      className={`btn ${variant}`} 
      onClick={onClick} 
      type={type}
      style={style}
    >
      {children}
    </button>
  );
}
