<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-custom">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent"
      aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link to="/" class="navbar-brand">Shopping App</router-link>
    <div class="collapse navbar-collapse" id="navbarContent">
      <form class="form-inline my-2 my-lg-0 ml-auto">
        <div class="input-group custom-search-bar">
          <input class="form-control" type="search" placeholder="Search" aria-label="Search">
          <div class="input-group-append">
            <button class="btn btn-outline-success" type="submit">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </form>
      <ul class="navbar-nav ml-3">
        <li class="nav-item">
          <a class="nav-link" href="#"><i class="fas fa-heart"></i></a>
        </li>
        <router-link to="/cart">
          <li class="nav-item position-relative">
            <a class="nav-link" href="#">
              <i class="fas fa-shopping-bag"></i>
              <span class="badge badge-pill badge-danger cart-badge-top-right">{{ cartTotal }}</span>
            </a>
          </li>
        </router-link>
        <li class="nav-item">
          <a class="nav-link" href="#"><i class="fas fa-user"></i></a>
        </li>
      </ul>
    </div>
  </nav>
</template>
  
<script>
import { useCartStore } from '@/store/cart';

export default {
  computed: {
    cartTotal() {
      const cartStore = useCartStore();
      return cartStore.totalItems;
    },
  },
};
</script>
  
<style scoped>
.navbar-custom {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.custom-search-bar {
  width: 500px;
}

.cart-badge-top-right {
  position: absolute;
  top: -3px;
  right: -3px;
  font-size: 9px;
  padding: 3px 6px;
  border-radius: 50%;
}
</style>
  