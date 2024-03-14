import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import Popover from "@mui/material/Popover";
import { LibraryBooks, Logout } from "@mui/icons-material";
import { isLogged, logOut } from "../../../redux/user.slice";

export default function Navbar() {
  const userData = useSelector((state) => state.user.data);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(isLogged([]));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="w-full px-[50px] flex justify-between items-center h-[70px] bg-blue-300">
      <div>
        <Link to={"/"} className="font-bold text-purple-900 text-[26px]">
          Kutubxona
        </Link>
      </div>
      <div className="w-[50px] h-[50px] rounded-[25px] flex cursor-pointer items-center justify-center bg-[green]">
        <Button
          aria-describedby={id}
          variant="text"
          onClick={handleClick}
          sx={{
            fontWeight: "500",
            color: "white",
            fontSize: "28px",
          }}
        >
          {userData.data.key[0].toUpperCase()}
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <div className="w-fit flex items-center border-b-[2px] h-[40px] px-4">
            <Link to={"/my-library"} className="font-semibold text-blue-800">
              <LibraryBooks
                sx={{
                  color: "gray",
                }}
              />{" "}
              Mening kutubxonam
            </Link>
          </div>
          <div className="w-fit flex items-center h-[40px] px-4 ">
            <p
              onClick={handleLogout}
              className="font-semibold cursor-pointer text-black"
            >
              <Logout sx={{ color: "gray" }} /> Chiqish
            </p>
          </div>
        </Popover>
      </div>
    </div>
  );
}
