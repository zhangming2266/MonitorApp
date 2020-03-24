export default {
  routes: state => state.admin.menu.routes,
  topMenu: state => state.admin.menu.topMenu,
  menu: state => state.admin.menu.menu,
  treeMenu: state => state.admin.menu.treeMenu,
  businessRoutes: state => state.business.menu.businessRoutes,
  userInfo: state => state.admin.user.userInfo,
  systemID: state => state.admin.account.systemID,
  ide:state => state.ide,
  tagViews:state=>state.admin.tagViews.tagsViews,
  currentViews:state=>state.admin.tagViews.currentTag,
  kettle:state => state.kettle,
}
