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
      // component: commingSoon
    },
    {
      path: "search",
      component: () => import("@/components/Search")
    },
    {
      path: "/movie",
      redirect: "/movie/nowPlaying"
    }
  ]
};
