"use client";

import { useProductStore } from "@/store/useProductStore";
import { useEffect, useState } from "react";
import { ChevronLeft, Minus, Package, Plus, Share2, Truck } from "lucide-react";
import Image from "next/image";
import { StarRating } from "./star-rating";

import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const ProductPage = ({ productId }: { productId: string }) => {
  const { product, fetchProduct, addToCart, cart, removeFromCart } =
    useProductStore();
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(5);

  useEffect(() => {
    // Only run on client
    setStock(Math.floor(Math.random() * 10) + 1);
  }, []);

  useEffect(() => {
    if (productId) fetchProduct(productId);
  }, [fetchProduct, productId]);

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

  // Calculate discount price (for demo purposes)
  const originalPrice = product.price;
  const discountPrice = product.price * 0.7; // 30% discount

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Back Button */}
        <Link href="/" className="  z-10    ">
          <ChevronLeft className="w-7 h-7 " />
        </Link>
        {/* Product Image */}
        <div className="md:w-1/2 ">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              width={500}
              height={600}
              className="w-full h-auto object-contain mx-auto"
              priority
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <div className="space-y-4">
            {/* Product ID */}
            <p className="text-gray-500 text-sm capitalize">
              {product.category}
            </p>
            {/* Product Title */}
            <h1 className="text-2xl font-bold font-volkhov">{product.title}</h1>
            {/* Rating */}
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating.rate} />
              <span className="text-sm text-gray-500">
                ({product.rating.count})
              </span>
            </div>

            <div className="flex items-center font-volkhov gap-2">
              <span className="text-xl font-semibold">
                ${discountPrice.toFixed(2)}
              </span>
              <span className="text-gray-500 line-through text-sm">
                ${originalPrice.toFixed(2)}
              </span>
              <p className="text-sm text-white bg-red-700  px-2 rounded-full">
                {" "}
                SAVE 30%
              </p>
            </div>
            {/* Description */}
            <p className=" text-sm ">{product.description}</p>
            {/* Availability */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-100">
                Only <span className="font-bold"> {stock}</span> items(s) left
                in stock!
              </p>
              <Progress indicatorColor="bg-red-900" value={stock} />
            </div>
            <div className="w-full flex items-end justify-between gap-4">
              {/* Quantity Selector */}

              <div className="space-y-2">
                <p className="font-medium font-volkhov">Quantity</p>
                <div className="flex items-center">
                  <button
                    className="w-8 h-8 flex items-center justify-center border-t border-b border-l border-gray-200 rounded-l-sm"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => {
                      const value =
                        e.target.value === ""
                          ? 1
                          : Number.parseInt(e.target.value);
                      handleQuantityChange(isNaN(value) ? 1 : value);
                    }}
                    className="w-12 h-8 border-y border-gray-200 text-center"
                  />
                  <button
                    className="w-8 h-8 flex items-center justify-center border-t border-b border-r  border-gray-200 rounded-r-sm"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* Add to Cart Button */}

              <button
                onClick={() => {
                  if (cart.some((item) => item.id === product.id)) {
                    removeFromCart(product.id);
                  } else {
                    addToCart(product);
                  }
                }}
                className="w-full font-volkhov border border-gray-900  text-gray-900 dark:text-white dark:border-white py-[3px] rounded-sm hover:bg-gray-400 transition cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {cart.some((item) => item.id === product.id)
                  ? " Remove From Cart"
                  : "Add to Cart"}
              </button>
            </div>
            {/* Share Button */}
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </div>
            {/* Shipping Information */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <p className="text-sm font-medium">
                  Estimated Delivery:{" "}
                  <span className="font-normal">Jul 30 - Aug 03</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                <p className="text-sm font-medium">
                  Free Shipping & Returns:
                  <span className="font-normal"> On all orders over $75</span>
                </p>
                <p></p>
              </div>
            </div>
            {/* Payment Methods */}
            <div className="space-y-4 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 rounded-md">
              <Image src="/payment.svg" alt="Visa" width={200} height={40} />
              <p className="text-sm font-volkhov">
                Guarantee safe & secure checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
