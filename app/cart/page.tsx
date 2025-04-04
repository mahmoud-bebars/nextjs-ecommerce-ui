"use client";

import { useProductStore } from "@/store/useProductStore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ShoppingCart() {
  const { cart, removeFromCart } = useProductStore();
  const [quantities, setQuantities] = useState<Record<number, number>>(
    cart.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {}),
  );
  const [giftWrap, setGiftWrap] = useState(false);

  const giftWrapPrice = 10.0;

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantities({ ...quantities, [id]: newQuantity });
    }
  };

  const getItemTotal = (price: number, id: number) => {
    return price * (quantities[id] || 1);
  };

  const subtotal = cart.reduce(
    (sum, product) => sum + getItemTotal(product.price, product.id),
    0,
  );

  const total = subtotal + (giftWrap ? giftWrapPrice : 0);

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2 font-volkhov">Shopping Cart</h1>
        <div className="flex justify-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>›</span>
          <span>Your Shopping Cart</span>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 mb-4 font-volkhov">
            Your cart is empty
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-black text-white rounded"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Table Header */}
          <div className="grid grid-cols-12 gap-4 pb-2 border-b text-sm font-medium font-volkhov">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {/* Cart Items */}
          {cart.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-12 gap-4 py-6 border-b items-center"
            >
              {/* Product */}
              <div className="col-span-6 flex gap-4">
                <div className="w-20 h-24 bg-gray-50 flex items-center justify-center">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    width={60}
                    height={80}
                    className="object-contain max-h-full bg-white rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-sm font-medium line-clamp-2 font-volkhov">
                      {product.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-xs text-gray-500 hover:underline text-left w-fit cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-2 text-center font-volkhov">
                ${product.price.toFixed(2)}
              </div>

              {/* Quantity */}
              <div className="col-span-2 flex justify-center font-volkhov">
                <div className="flex border rounded">
                  <button
                    onClick={() =>
                      updateQuantity(product.id, quantities[product.id] - 1)
                    }
                    className="w-8 h-8 flex items-center justify-center border-r cursor-pointer"
                    disabled={quantities[product.id] <= 1}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <input
                    type="text"
                    value={quantities[product.id] || 1}
                    onChange={(e) => {
                      const val = Number.parseInt(e.target.value);
                      if (!isNaN(val)) updateQuantity(product.id, val);
                    }}
                    className="w-8 h-8 text-center text-sm"
                  />
                  <button
                    onClick={() =>
                      updateQuantity(product.id, quantities[product.id] + 1)
                    }
                    className="w-8 h-8 flex items-center justify-center border-l cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="col-span-2 text-right font-volkhov">
                ${getItemTotal(product.price, product.id).toFixed(2)}
              </div>
            </div>
          ))}

          {/* Gift Wrap Option */}
          <div className="flex items-center justify-end mt-6  ">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={() => setGiftWrap(!giftWrap)}
                className="w-4 h-4"
              />
              <span className="text-sm text-accent-foreground">
                For{" "}
                <span className="font-semibold text-foreground">
                  ${giftWrapPrice.toFixed(2)}
                </span>{" "}
                Please Wrap The Product
              </span>
            </label>
          </div>

          {/* Order Summary */}
          <div className="flex flex-col items-end gap-4 mt-6">
            <div className="flex justify-between w-full max-w-xs">
              <span className="font-medium">Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Button variant="default" className="w-full max-w-xs py-2">
              Checkout
            </Button>
          </div>
        </>
      )}
    </main>
  );
}
