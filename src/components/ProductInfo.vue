<template>
  <Navbar />
  <div class="container mt-5">
    <div class="row">
      <div v-if="product" class="col-md-5">
        <div class="img-wrapper">
          <img :src="product.image" alt="Product Image" class="img-fluid" style="max-height: 500px;">
        </div>
      </div>
      <div v-if="product" class="col-md-7">
        <h2>{{ product.title }}</h2>
        <p class="text-danger" style="font-size: 24px;">Discounted Price: {{ product.discountPrice }}</p>
        <p>Actual Price: <span style="text-decoration: line-through;">{{ product.actualPrice }}</span></p>
        <p class="text-muted">Size:
          <span class="size" :class="{ selected: selectedSize === size }" v-for="size in product.sizes" :key="size" @click="selectSize(size)">{{ size }}</span>
        </p>
        <small v-if="sizeValidationError" class="text-danger d-flex font-weight-bold mb-3">Please select a size</small>
        <button class="btn btn-primary" @click="addToCart(product)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>


<script>
import Navbar from "@/components/AppNavbar";
import { useProductsStore } from '@/store/products';
import { useCartStore } from '@/store/cart';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      productId: null,
      selectedSize: null,
      sizeValidationError: false,
    };
  },
  computed: {
    product() {
      return useProductsStore().getProductById(this.productId);
    },
  },
  created() {
    this.productId = parseInt(this.$route.params.id);
  },
  methods: {
    selectSize(size) {
      this.selectedSize = size;
      this.sizeValidationError = false;
    },
    addToCart(product) {
      if (!this.selectedSize) {
        this.sizeValidationError = true;
      } else {
      const cartStore = useCartStore();
      cartStore.addItem(product.id);
      product.addedToCart = true;
      setTimeout(() => {
        product.addedToCart = false;
      }, 500);
      this.sizeValidationError = false;
      }
    },
  },
};
</script>

<style scoped>
.size {
  display: inline-block;
  padding: 5px 10px;
  margin: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.size.selected {
  background-color: black;
  color: white;
}
</style>
