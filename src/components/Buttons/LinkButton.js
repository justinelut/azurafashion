"use client"
import Link from "next/link";


const LinkButton = ({
  href,
  extraClass,
  size,
  aria_label,
  children,
  noBorder = true,
  inverted = true,
}) => {
  let btnSize = "";
  if (size === "sm") {
    btnSize = "py-2 sm:py-1 px-5";
  } else if (size === "xl") {
    btnSize = "py-4 sm:py-3 px-7  text-xl";
  } else {
    btnSize = "py-3 sm:py-2 px-6";
  }

  return (
    <Link role="button"
      aria-label={aria_label}
      className={`bg-white group text-center inline-block cursor-pointe ${inverted
        ? "hover:bg-gray500 hover:text-gray100"
        : "hover:text-gray400"
        } ${!noBorder && "border border-gray500"} ${btnSize} ${extraClass}`} href={href}>
        {children}
    </Link>
  );
};

export default LinkButton;
