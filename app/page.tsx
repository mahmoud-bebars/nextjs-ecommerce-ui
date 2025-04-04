"use client";

import { useEffect, useState } from "react";

import CategorySelector from "@/components/products/category-selector";
import ProductSkeleton from "@/components/shared/product-skeleton";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { useProductStore } from "@/store/useProductStore";
import { ChevronDown, ChevronRight, Grid, List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [grid, setGrid] = useState(true);
  const {
    categories,
    selectedCategory,
    fetchCategories,
    fetchProducts,
    setCategory,
    products,
    isLoading,
  } = useProductStore();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchCategories, fetchProducts]);

  const handleCategoryChange = (category: string) => {
    setCategory(category);
    fetchProducts(category);
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2 font-volkhov">
          {selectedCategory !== "all"
            ? selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)
            : "Fashion"}
        </h1>
        <div className="flex items-center justify-center space-x-3 text-sm text-gray-600">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <ChevronRight className="size-4" />
          <Link href="/" className="hover:underline">
            {selectedCategory !== "all"
              ? selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)
              : "Fashion"}
          </Link>
        </div>
      </div>

      {/* Category and View Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-1">
          <p className="font-volkhov">Best selling</p>
          <ChevronDown className="size-4" />
        </div>
        <div className="flex items-center space-x-2">
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            handleSelectedCategory={handleCategoryChange}
          />
          <div className="flex gap-2">
            <Toggle
              pressed={grid}
              onPressedChange={() => setGrid(true)}
              className="h-8 w-8 p-0 data-[state=on]:bg-gray-100  dark:data-[state=on]:bg-gray-900"
            >
              <Grid className="h-4 w-4" />
            </Toggle>
            <Toggle
              pressed={!grid}
              onPressedChange={() => setGrid(false)}
              className="h-8 w-8 p-0 data-[state=on]:bg-gray-100  dark:data-[state=on]:bg-gray-900  "
            >
              <List className="h-4 w-4" />
            </Toggle>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <>
          {grid ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {products.map((product) => (
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  className="group"
                >
                  <div className="aspect-square  mb-3 flex items-center justify-center overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={200}
                      height={200}
                      className="object-contain h-4/5 w-4/5 transition-transform group-hover:scale-105 rounded-xl bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-sm font-medium line-clamp-1 font-volkhov">
                      {product.title}
                    </h2>
                    <div className="flex items-baseline gap-2">
                      <p className="text-sm font-medium font-volkhov">
                        ${product.price.toFixed(2)}
                      </p>
                      {Math.random() > 0.7 && (
                        <p className="text-xs text-gray-500 line-through font-volkhov">
                          ${(product.price * 1.2).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  className="flex gap-4 p-3 border rounded-md hover:shadow-sm"
                >
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-50 flex items-center justify-center">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="object-contain max-h-full max-w-full"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h2 className="text-sm font-medium line-clamp-1 font-volkhov">
                        {product.title}
                      </h2>
                      <p className="text-xs text-gray-600 line-clamp-2 mt-1 font-volkhov">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-baseline gap-2 font-volkhov">
                      <p className="text-sm font-medium">
                        ${product.price.toFixed(2)}
                      </p>
                      {Math.random() > 0.7 && (
                        <p className="text-xs text-gray-500 line-through">
                          ${(product.price * 1.2).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      {products.length > 0 && (
        <div className="flex justify-center mt-12 space-x-1">
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                page === 1
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200",
              )}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
