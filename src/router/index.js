import Vue from "vue";
import VueRouter from "vue-router";
import movieRouter from "./moive";
import mineRouter from "./mine";
import cinemaRouter from "./cinema";

Vue.use(VueRouter);

const routes = [
    movieRouter,
    mineRouter,
    cinemaRouter,
    { path: "/", redirect: "/movie" }
];

const router = new VueRouter({
    mode: "history",
    //   base: process.env.BASE_URL,
    base: "piaopiao",
    routes
});

export default router;
