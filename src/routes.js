import Admin from "./components/pages/Admin"
import Auth from "./components/pages/Auth"
import Basket from "./components/pages/Basket"
import SearchPage from "./components/pages/searchPage/searchPage"
import Main from "./layouts/main"

export const authRoutes = [
  {
    path: "/admin",
    component: Admin
  },
  {
    path: "/login",
    component: Basket
  }
]

export const publicRoutes = [
  {
    path: "/",
    component: Main
  },
  {
    path: "/login",
    component: Auth
  },
  {
    path: "/registration",
    component: Auth
  },
  { path: "/basket", component: Basket },

  { path: "/search", component: SearchPage },

  {
    path: "/:companyId?/:categoryId?/:productId?",
    component: Main
  }
]
