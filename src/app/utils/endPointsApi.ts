export default {
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
  getProductsByUser: {
    url: 'users/product/get-all-by-user-id'
  },
}
