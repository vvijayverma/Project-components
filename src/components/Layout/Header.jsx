import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import routes from "../../Data/routes";

const Header = () => {
 const navigate = useNavigate()
    const handleRoutes=(e)=>{
         console.log(e.target.value);
         navigate(e.target.value)
    }
  return (
    <header className="bg-gray-200 h-14 flex justify-between px-14 items-center">
      <NavLink to={`/`} className="font-bold text-2xl">
        Tanstack
      </NavLink>
      <ul className="flex gap-4 font-bold items-center">
        <li>
          <NavLink to={`/`}>Home</NavLink>
        </li>

        <select className="p-2 bg-green-500 rounded" onClick={(e)=>handleRoutes(e)}>
          <option value="">Projects</option>
          {routes?.map((item,index)=>(
             <option value={item.path} key={index}>{item.name}</option>
          ))}
        </select>
      </ul>
    </header>
  );
};

export default Header;
