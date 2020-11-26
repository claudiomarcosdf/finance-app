import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export function Button() {
  return (
    <Link to="/cadastre-se">
      <button className="btn">Cadastre-se</button>
    </Link>
  );
}
