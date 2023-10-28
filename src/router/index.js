import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/ProductListing.vue";
import ProductInfo from "@/components/ProductInfo.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/product/:id",
        name: "productInfo",
        component: ProductInfo,
    },
];


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;