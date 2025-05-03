import React from "react";
import { Link } from "react-router-dom";
// import { toast } from "react-hot-toast";
import { GiNewspaper } from "react-icons/gi";
import { useState } from "react";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/");

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center bg-richblack-200 h-20 px-4 rounded-sm">
        <div className="ml-5 h-20 w-20 flex items-center justify-center text-sky-50">
          <GiNewspaper className="h-full w-full" />
        </div>

        <nav className="w-full flex justify-between items-center">
          <ul className="flex justify-center items-center text-lg m-4 w-full">
            <div className="flex gap-6 text-xl text-sky-50">
              <li
                className={
                  activeLink === "/"
                    ? "bg-cyan-400 shadow-lg shadow-cyan-500/50  rounded-xl px-2 "
                    : ""
                }
              >
                <Link to="/" onClick={() => handleLinkClick("/")}>
                  Home
                </Link>
              </li>
              <li
                className={
                  activeLink === "/business"
                    ? "bg-cyan-400 shadow-lg shadow-cyan-500/50  rounded-xl px-2"
                    : ""
                }
              >
                <Link
                  to="/business"
                  onClick={() => handleLinkClick("/business")}
                >
                  Business
                </Link>
              </li>
              <li
                className={
                  activeLink === "/sports"
                    ? "bg-cyan-400 shadow-lg shadow-cyan-500/50  rounded-xl px-2"
                    : ""
                }
              >
                <Link to="/sports" onClick={() => handleLinkClick("/sports")}>
                  Sports
                </Link>
              </li>
              <li
                className={
                  activeLink === "/tech"
                    ? "bg-cyan-400 shadow-lg shadow-cyan-500/50  rounded-xl px-2"
                    : ""
                }
              >
                <Link to="/tech" onClick={() => handleLinkClick("/tech")}>
                  Tech
                </Link>
              </li>
              <li
                className={
                  activeLink === "/world"
                    ? "bg-cyan-400 shadow-lg shadow-cyan-500/50  rounded-xl px-2"
                    : ""
                }
              >
                <Link to="/world" onClick={() => handleLinkClick("/world")}>
                  World
                </Link>
              </li>
            </div>
          </ul>
          <div className="ml-auto pr-4 text-xl text-sky-50">
            <Link
              to="/notes"
              className={
                activeLink === "/notes"
                  ? "bg-cyan-400 shadow-lg shadow-cyan-500/50  rounded-xl px-2"
                  : ""
              }
              onClick={() => handleLinkClick("/notes")}
            >
              MakeNote
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
