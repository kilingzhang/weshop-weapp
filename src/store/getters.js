const getters = {
  token: state => state.user.token,
  isAuthorize: state => state.user.isAuthorize,
  userInfo: state => state.user.info,
  avatar: state => state.user.info.avatar_url,
  nickname: state => state.user.info.nickname,
  phone: state => state.user.info.phone,
  addresses: state => state.user.addresses,
  address: state => state.user.address,

  productCategories: state => state.category.productCategories,
  product: state => state.product.product,
  products: state => state.product.products,
  quickProduct: state => state.product.quickProduct,
  pinterest: state => state.product.pinterest,


  carts: state => state.cart.carts,


  banners: state => state.advertise.banners,
  homePushSet: state => state.push.homePushSet,

}

export default getters
