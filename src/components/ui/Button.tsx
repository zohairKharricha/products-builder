import {ButtonHTMLAttributes, ReactNode} from "react";
interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
  height?: "h-full" | "h-fit";
}

function Button({className, children, width = "w-full", ...rest}: IProps) {
  return (
    <button
      className={`${className} ${width} text-white rounded-md py-2  `}
      {...rest}
    >
      {" "}
      {children}
    </button>
  );
}

export default Button;
