import React from "react";
import BookIcon from '@mui/icons-material/Book';

function Header() {
  return (
    <header>
      <BookIcon className="header-icon" color="action" sx={{ fontSize: 45 }}/>
      <h1 className="header-title">NoteKeeper</h1>
    </header>
  );
}

export default Header;