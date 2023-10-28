<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col-md-3" v-for="product in products" :key="product.id">
          <transition name="fade" mode="out-in">
            <div class="card border-0" @mouseenter="showIcons(product.id)" @mouseleave="hideIcons(product.id)">
              <div class="card-image">
                <router-link :to="{ name: 'productInfo', params: { id: product.id } }">
                  <img v-lazy="product.image" :src="product.image" alt="Product Image" class="image-fixed-height">
                </router-link>
                <div class="card-icons" v-if="product.showIcons">
                  <i class="fas fa-cart-plus icon" @click="addToCart(product)"
                    :class="{ 'added-to-cart': product.addedToCart }"></i>
                  <i class="fas fa-heart icon"></i>
                  <i class="fas fa-share-alt icon"></i>
                </div>
              </div>
              <div class="card-body">
                <router-link :to="{ name: 'productInfo', params: { id: product.id } }" class="router-link-no-underline">
                  <h5 class="card-title">{{ product.title }}</h5>
                </router-link>
                <p class="price">
                  <span class="discount-price">{{ product.discountPrice }}</span>
                  <span class="actual-price">{{ product.actualPrice }}</span>
                </p>
                <p class="product-sizes">
                  <span v-for="size in product.sizes" :key="size" class="size"
                    :class="{ selected: product.selectedSize === size }" @click="selectSize(product, size)">{{ size
                    }}</span>
                </p>
                <small v-if="product.sizeValidationError" class="text-danger">Please select a size</small>
              </div>
            </div>
          </transition>
        </div>
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
      productsStore: useProductsStore(),
      selectedSize: null,
    };
  },
  computed: {
    products() {
      return this.productsStore.allProducts;
    },
  },
  created() {
    this.productsStore.fetchProducts();
  },
  methods: {
    showIcons(productId) {
      const product = this.products.find((p) => p.id === productId);
      if (product) {
        product.showIcons = true;
      }
    },
    hideIcons(productId) {
      const product = this.products.find((p) => p.id === productId);
      if (product) {
        product.showIcons = false;
      }
    },
    selectSize(product, size) {
      product.selectedSize = size;
      product.sizeValidationError = false;
    },
    addToCart(product) {
      if (!product.selectedSize) {
        product.sizeValidationError = true;
      } else {
        const cartStore = useCartStore();
        cartStore.addItem(product.id);
        product.addedToCart = true;
        setTimeout(() => {
          product.addedToCart = false;
        }, 500);
        product.sizeValidationError = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding-top: 50px;
}

.card {
  height: 375px;
  margin-bottom: 20px;
  width: 95%;
}

.card-image {
  position: relative;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  transition: filter 0.3s;
}

.card-icons {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity 0.3s;
}

.card-icons .icon {
  font-size: 24px;
  cursor: pointer;
  color: white;
  transition: transform 0.3s;
  margin: 0 10px;
}

.card-icons .icon:hover {
  transform: scale(1.2);
}

.card:hover .card-image img {
  filter: blur(2px);
}

.card:hover .card-icons {
  opacity: 1;
}

.router-link-no-underline {
  text-decoration: none;
}

.card-title {
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  color: #1C1C1C;
}

.price {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  height: 18px;
  top: 4939.36px;
  left: 215.5px;

}

.discount-price {
  font-size: 18px;
  font-weight: bold;
  color: black;
}

.actual-price {
  font-size: 12px;
  color: red;
  text-decoration: line-through;
}

.product-sizes {
  display: flex;
  justify-content: space-between;
  height: 36px;
}

.size {
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid #E6E6E6;
  cursor: pointer;
  color: black;
  text-decoration: none;
}

.size.selected {
  background-color: black;
  color: white;
}

.image-fixed-height {
  height: 200px !important;
}

.added-to-cart {
  animation: bounce 0.5s;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }

  25% {
    transform: translateY(-5px);
  }

  50% {
    transform: translateY(0);
  }

  75% {
    transform: translateY(-5px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
