import { environment } from "src/environments/environment";

export default {
  uri: environment.domain + environment.api,
  login: {
    url: '/auth/login'
  },
  registerEmail: {
    url: '/auth/register-email'
  },
  createAccount: {
    url: "/auth/create-account"
  },
  logout: {
    url: '/auth/logout/user/:id'
  },
  activateAccount:{
    url: "/auth/activate-account"
  },
  addProduct: {
    url: '/products'
  },
  findProductsByUser: {
    url: '/products/user/:userId'
  },
  findProductByUserIdAndProductId: {
    url: '/products/:productId/user/:userId'
  },
  deleteProductByProductId: {
    url: '/products/:productId'
  }

}
