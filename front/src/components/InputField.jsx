import React from "react";
import "./InputField.css";

export default function InputField({
  label,
  value,
  onChange,
  placeholder,
  textarea = false,
  type = "text"
}) {
  return (
    <div className="form-group">
      <label>{label}</label>

      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
