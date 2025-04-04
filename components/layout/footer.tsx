import { navs } from "@/constants";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col items-center justify-center gap-12 py-4 bg-background border-t-2">
      <div className="container flex flex-col lg:flex-row items-center justify-between gap-5">
        <h1 className="text-2xl  font-volkhov">FASCO</h1>
        <div className="flex items-centr justify-center gap-5 md:gap-10 lg:gap-20">
          {navs.map((nav) => (
            <Link
              key={nav.name}
              href={nav.href}
              className="text-sm captalize font-normal transition-colors text-foreground  "
            >
              {nav.name}
            </Link>
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Copyright © 2022 FASCO . All Rights Reseved.
      </p>
    </footer>
  );
};

export default Footer;
