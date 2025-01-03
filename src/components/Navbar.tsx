import React from "react";
import { NavLink } from "react-router";

const Navbar: React.FC = () => {
  return (
    <div className="bg-black px-8 md:px-20  py-4">
      <div className="text-white flex justify-start items-center gap-4 ">
        <NavLink
          to="/"
          className="cursor-pointer text-slate-200 hover:text-white transition-all aria-[current=page]:text-white relative after:absolute after:left-1/2 after:-bottom-1 after:w-0 aria-[current=page]:after:w-[30px] after:-translate-x-1/2 after:h-[2px] after:bg-blue-200 after:transition-all"
        >
          Home
        </NavLink>
        <NavLink
          to="/help"
          className="cursor-pointer text-slate-200 hover:text-white transition-all aria-[current=page]:text-white relative after:absolute after:left-1/2 after:-bottom-1 after:w-0 aria-[current=page]:after:w-[30px] after:-translate-x-1/2 after:h-[2px] after:bg-blue-200 after:transition-all"
        >
          Help
        </NavLink>
        <NavLink
          to="/about"
          className="cursor-pointer text-slate-200 hover:text-white transition-all aria-[current=page]:text-white relative after:absolute after:left-1/2 after:-bottom-1 after:w-0 aria-[current=page]:after:w-[30px] after:-translate-x-1/2 after:h-[2px] after:bg-blue-200 after:transition-all"
        >
          About
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
