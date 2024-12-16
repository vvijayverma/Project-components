import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const pathNames = pathname.split("/").filter((x) => x);
  let BreadcrumbPath = "";
  console.log(BreadcrumbPath);
  console.log(pathNames);
  console.log(BreadcrumbPath);

  return (
    <div className="p-2 font-bold">
      {pathNames.length >0 && <Link className="text-green-400" to={`/`}>Home</Link>}
      {pathNames.map((pathname, index) => {
        BreadcrumbPath += `/${pathname}`;
        const isLast = index === pathNames.length - 1;
        return isLast ? (
          <span className="" key={BreadcrumbPath}>/<span className="ml-1">{pathname}</span></span>
        ) : (
          <span className="" key={BreadcrumbPath}>
            /<Link className="ml-1 text-green-400" to={BreadcrumbPath}>{pathname}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
