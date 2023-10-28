<template>
    <Navbar />
    <div class="cart mt-5">
        <div v-if="cartItems.length === 0" class="empty-cart d-flex justify-content-center">
            Your cart is empty.
        </div>
        <table v-else class="cart-table mx-auto px-2">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Size</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in cartItems" :key="item.id">
                    <td>
                        <img :src="item.image" alt="Product Image" class="product-image" />
                    </td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.discountPrice }}</td>
                    <td>{{ item.selectedSize }}</td>
                    <td>
                        <button @click="removeCartItem(item.id)" class="remove-button">
                            Remove
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
  
<script>
import Navbar from "@/components/AppNavbar";
import { useCartStore } from '../store/cart';

export default {
    components: {
        Navbar,
    },
    computed: {
        cartItems() {
            return useCartStore().items;
        },
    },
    methods: {
        removeCartItem(productId) {
            useCartStore().removeItem(productId);
        },
    },
};
</script>
  
<style scoped>
.cart-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc;
  margin-top: 10px;
}

.cart-table th, .cart-table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
}

.product-image {
  max-width: 100px;
  max-height: 100px;
}

.empty-cart {
  font-size: 1.5rem;
  margin-top: 20px;
}
</style>
  