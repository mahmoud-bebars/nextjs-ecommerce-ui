"use client";
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CategorySelector = ({
  categories,
  selectedCategory,
  handleSelectedCategory,
}: {
  categories: string[];
  selectedCategory: string;
  handleSelectedCategory: (category: string) => void;
}) => (
  <Select
    defaultValue={selectedCategory === "all" ? "" : selectedCategory}
    onValueChange={(e) => handleSelectedCategory(e)}
  >
    <SelectTrigger className="w-[180px]">
      <SelectValue
        className="capitalize text-accent-foreground"
        placeholder="Select category"
      />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {categories.map((category) => (
          <SelectItem
            key={category}
            value={category}
            className="capitalize text-accent-foreground"
          >
            {category}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default CategorySelector;
