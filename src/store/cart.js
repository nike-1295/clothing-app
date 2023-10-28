import { defineStore } from 'pinia';
import { useProductsStore } from './products';

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    items: [],
  }),
  getters: {
    totalItems: (state) => state.items.length,
  },
  actions: {
    addItem(productId) {
      const productStore = useProductsStore();
      const product = productStore.getProductById(productId);
      if (product) {
        this.items.push(product);
      }
    },
  },
  persist: true,
});
