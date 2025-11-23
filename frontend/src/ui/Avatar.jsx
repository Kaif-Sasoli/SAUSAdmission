import React from "react";

export const Avatar = ({
  src,
  alt,
  size = "sm", // default smaller
  className = "",
  status,
  rounded = "md",
}) => {
  const sizeClasses = {
    xxs: "h-4 w-4",
    xs: "h-6 w-6",
    sm: "h-8 w-8",
    xm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-10 w-10",
    xl: "h-12 w-12",
  };

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
    busy: "bg-red-500",
  };

  const statusSizes = {
    xxs: "h-1 w-1",
    xs: "h-1.5 w-1.5",
    sm: "h-2 w-2",
    xm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-2.5 w-2.5",
    xl: "h-3 w-3",
  };

  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    alt || "User"
  )}&background=random`;
  const safeSrc = src && src.trim() !== "" ? src : fallbackSrc;

  return (
    <div className={`relative inline-block ${className}`}>
      <img
        src={safeSrc}
        alt={alt}
        className={`${sizeClasses[size]} object-cover ${roundedClasses[rounded]}`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackSrc;
        }}
      />
      {status && (
        <span
          className={`absolute bottom-0 right-0 block ${statusColors[status]} ${statusSizes[size]} rounded-full ring-1 ring-white`}
        />
      )}
    </div>
  );
};
