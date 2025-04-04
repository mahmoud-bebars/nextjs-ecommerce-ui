import { create } from "zustand";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

type ProductStore = {
  product: Product | null;
  products: Product[];
  categories: string[];
  selectedCategory: string;
  cart: Product[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  fetchProducts: (category?: string) => Promise<void>;
  fetchProduct: (id: string) => Promise<void>;
  setCategory: (category: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  product: null,
  products: [],
  categories: [],
  selectedCategory: "all",
  cart: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await fetch("https://fakestoreapi.com/products/categories");
      const data: string[] = await res.json();
      set({ categories: ["all", ...data], isLoading: false }); // Add "all" option
    } catch (error) {
      set({ error: "Failed to fetch products: " + error, isLoading: false });
    }
  },

  fetchProducts: async (category) => {
    try {
      set({ isLoading: true, error: null });
      const url =
        category && category !== "all"
          ? `https://fakestoreapi.com/products/category/${category}`
          : "https://fakestoreapi.com/products";

      const res = await fetch(url);
      const data: Product[] = await res.json();
      set({ products: data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch products: " + error, isLoading: false });
    }
  },
  fetchProduct: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data: Product = await res.json();
      set({ product: data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch products: " + error, isLoading: false });
    }
  },

  setCategory: (category) => {
    set({ selectedCategory: category });
  },

  addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((product) => product.id !== id),
    })),
}));
