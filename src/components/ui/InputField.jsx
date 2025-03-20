import React from "react";
import clsx from "clsx";
import CustomDatePicker from "./CustomDatePicker";

export default function InputField({
  name,
  label,
  type,
  inputImg,
  placeholder,
  className,
  value,
  onChange,
}) {
  return (
    <div className={clsx("input-field-container", className)}>
      <p className="input-label">{label}</p>
      <div
        className={clsx(
          "input-wrapper",
          type === "textarea" && "textarea-wrapper"
        )}
      >
        <img src={inputImg} className="input-field-img" alt={`${label} icon`} />
        {type === "date" ? (
          <CustomDatePicker name={name} date={value} onDateChange={onChange} />
        ) : type === "textarea" ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="textarea-field-input"
            rows={3}
          />
        ) : (
          <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className="input-field-input"
            placeholder={placeholder}
          />
        )}
      </div>
    </div>
  );
}
