"use client";
import React from "react";
import { ThemeToggle } from "../theme-toggle";
import { navs } from "@/constants";
import { Search, ShoppingBag, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useProductStore } from "@/store/useProductStore";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-center py-4 bg-background px-3">
      <div className="container flex items-center justify-between">
        <h1 className="text-2xl  font-volkhov">FASCO</h1>
        <div className="lg:flex items-centr justify-center gap-2 md:gap-10 lg:gap-20 hidden ">
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
        <Tools />
      </div>
    </header>
  );
};

export default Header;

const Tools = () => {
  const { cart } = useProductStore();
  return (
    <div className="flex items-center justify-center gap-1">
      <Button variant="ghost" size="icon">
        <Search className="size-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <User className="size-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Star className="size-4" />
      </Button>
      <Link href="/cart" className="relative">
        <Button variant="ghost" size="icon">
          <ShoppingBag className="size-4" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Button>
      </Link>

      <ThemeToggle />
    </div>
  );
};
