import { Button, Menu, MenuItem } from "@mui/material";
import React, { MouseEvent, useState } from "react";

const NavMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (evt: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(evt.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="md:!hidden ">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleOpen}
        className="!capitalize !text-white"
      >
        Browse
      </Button>

      <Menu
        id="basic-menu"
        MenuListProps={{
          "aria-labelledby": "basc-button",
        }}
        className="menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Home</MenuItem>
        <MenuItem onClick={handleClose}>Movies</MenuItem>
        <MenuItem onClick={handleClose}>TV Shows</MenuItem>
        <MenuItem onClick={handleClose}>New</MenuItem>
        <MenuItem onClick={handleClose} >Popular</MenuItem>
      </Menu>
    </div>
  );
};

export default NavMenu;
