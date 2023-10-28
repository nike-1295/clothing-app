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
        <p style="text-decoration: line-through;">Actual Price: {{ product.actualPrice }}</p>
        <p class="text-muted">Size:
          <span class="size" :class="{ selected: selectedSize === size }" v-for="size in product.sizes" :key="size" @click="selectSize(size)">{{ size }}</span>
        </p>
        <button class="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  </div>
</template>


<script>
import Navbar from "@/components/AppNavbar";
import { useProductsStore } from '@/store/products';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      productId: null,
      selectedSize: null,
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
