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
    removeItem(productId) {
      const index = this.items.findIndex((item) => item.id === productId);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },
  },
  persist: true,
});
