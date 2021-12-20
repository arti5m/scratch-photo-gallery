import React from 'react';
import { Link } from "react-router-dom";

import './index.css';

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1>Photo Gallery</h1>
      </Link>
    </header>
  );
}

export default Header;
