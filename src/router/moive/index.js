/* eslint-disable prettier/prettier */
// import commingSoon from "@/components/CommingSoon";
export default {
    path: "/movie",
    component: () => import("@/views/Movie"),
    children: [
        {
            path: "city",
            component: () => import("@/components/City")
        },
        {
            path: "nowPlaying",
            component: () => import("@/components/NowPlaying")
        },
        {
            path: "commingSoon",
            component: () => import("@/components/CommingSoon")
        },
        {
            path: "search",
            component: () => import("@/components/Search")
        },
        {
            //点击影片的图片时，切换到影片详情
            path: "detail/1/:movieid",
            components: {
                //因为detail组件的父组件里有两个router-view，当切换url到detail时
                //要保持原正在热映这个组件还在，所以没给name的用于显示正在热映的router-view，也就是name为default的
                //要在路由的path即使改了，还显示原来的正在热映
                default: () => import("@/components/NowPlaying"),
                detail: () => import("@/views/Movie/detail.vue")
            },
            props: {
                detail: true
            }
        },
        {
            //点击影片的图片时，切换到影片详情
            path: "detail/2/:movieid",
            components: {
                //保持切换url时，即将上映的router-view仍显示CommingSoon组件
                default: () => import("@/components/CommingSoon"),
                detail: () => import("@/views/Movie/detail.vue")
            },
            props: {
                detail: true
            }
        },
        {
            path: "/movie",
            redirect: "/movie/nowPlaying"
        }
    ]
};
