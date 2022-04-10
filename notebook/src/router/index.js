import Index from '@/container/Index'
import About from '@/container/About'
import Data from '@/container/Data'
import User from '@/container/User'
const routes = [
  {
    path: "/",
    component: Index
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/data",
    component: Data
  },
  {
    path: "/user",
    component: User
  }

];

export default routes