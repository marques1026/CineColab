import React from "react";
import "./InputField.css";

export default function InputField({
  label,
  value,
  onChange, 
  placeholder,
  type = "text",
  required = false,
  textarea = false
}) {
  return (
    <div className="input-group">
      <label>{label}</label>

      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}