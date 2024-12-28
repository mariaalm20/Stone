import {create} from 'zustand';
import axios from 'axios';

const BASEURL = 'https://fake-coffee-api.vercel.app';

export interface CoffeItem {
  id: number;
  name: string;
  description: string;
  weight: string;
  price: number;
  image_url: string;
}

export interface CoffeState {
  products: CoffeItem[];
  fetchProducts: () => Promise<void>;
  searchMore: () => Promise<void>;
  isLoading: boolean;
  error?: string | null;
  loadingSearchMore: boolean;
  quantityProducts: number;
  productIds: Set<number>;
  addItemOnCart: (id: number) => void;
  quantityItems: number;
  loadingAddItem: boolean;
}

export const useCoffeStore = create<CoffeState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  loadingSearchMore: false,
  quantityProducts: 5,
  productIds: new Set(),
  fetchProducts: async () => {
    const {products, quantityProducts} = get();
    set({isLoading: true});

    try {
      if (products.length === 20) {
        return;
      }

      const response = await axios.get(
        `${BASEURL}/api?limit=${quantityProducts}`,
      );

      const newProducts = response.data.filter(
        (product: CoffeItem) => !get().productIds.has(product.id),
      );

      set({
        products: [...products, ...newProducts],
        isLoading: false,
        productIds: new Set([
          ...get().productIds,
          ...newProducts.map(p => p.id),
        ]),
      });
    } catch (error) {
      set({error: 'Failed to load products', isLoading: false, products: []});
    }
  },
  searchMore: async () => {
    const {products, quantityProducts} = get();

    if (products.length === 20) {
      set({
        loadingSearchMore: false,
      });
      return;
    }

    set({
      loadingSearchMore: true,
      quantityProducts: products.length + quantityProducts,
    });
  },
  addItemOnCart: async () => {
    set({
      loadingAddItem: true,
    });
    const {quantityItems} = get();
    set({
      quantityItems: quantityItems + 1,
    });
    set({
      loadingAddItem: false,
    });
  },
  quantityItems: 0,
  loadingAddItem: false,
}));
