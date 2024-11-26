import React from 'react';
import { NavLink } from 'react-router-dom';

function NavigationLink({ to, children }) {
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? 'font-bold text-yellow-400' : 'font-bold text-white hover:underline')}>
      {children}
    </NavLink>
  );
}

export default NavigationLink;
