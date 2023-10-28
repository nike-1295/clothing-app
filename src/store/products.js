import { defineStore } from 'pinia';
import { products } from '@/data/products';

export const useProductsStore = defineStore('product', {
  state: () => ({
    products: [],
  }),
  getters: {
    allProducts: (state) => state.products,
    getProductById: (state) => (productId) => {
      return state.products.find((product) => product.id === productId);
    },
  },
  actions: {
    fetchProducts() {
      this.products = products;
    },
  },
  persist: true,
});
