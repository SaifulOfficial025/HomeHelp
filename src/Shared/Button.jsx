import React from "react";

function Button({
  children,
  text,
  color = "blue",
  outline = false,
  shadow = true,
  rounded = true,
  size = "md",
  textColor = null,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}) {
  const colors = {
    blue: "#18aa99",
    black: "#000000",
    orange: "#f59e0b",
    white: "#ffffff",
  };

  const hex = colors[color] || colors.blue;

  const sizeMap = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const base =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none disabled:opacity-50";
  const roundedClass = rounded ? "rounded-full" : "rounded-md";
  const shadowClass = shadow ? "shadow-md" : "";
  const sizeClass = sizeMap[size] || sizeMap.md;

  const style = {};
  let extraClasses = "";

  let textColorHex;
  if (textColor === "black") textColorHex = "#000";
  else if (textColor === "white") textColorHex = "#fff";

  if (outline) {
    style.borderColor = hex;
    style.color = textColorHex ?? hex;
    style.backgroundColor = "transparent";
    extraClasses = "border-2 hover:bg-opacity-10";
  } else {
    style.backgroundColor = hex;
    style.color = textColorHex ?? (color === "white" ? "#000" : "#fff");
    extraClasses = "hover:opacity-90";
  }

  const classes =
    `${base} ${sizeClass} ${roundedClass} ${shadowClass} ${extraClasses} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      style={style}
    >
      {children || text}
    </button>
  );
}

export default Button;
