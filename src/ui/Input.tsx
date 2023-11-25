import {InputHTMLAttributes} from "react";
interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

function Input({...rest}: IProps) {
  return (
    <input
      className="border-[1px] border-gray-300 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-md p-3 "
      {...rest}
    />
  );
}

export default Input;
