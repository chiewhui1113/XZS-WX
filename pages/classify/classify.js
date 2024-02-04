import { listNav, queryProduct } from "../../api/apis"
let navid;

Page({

  /**
   * Page initial data
   */
  data: {
    navActive: 0, 
    navArr: [],
    proArr: [],
    loading: false, 
    isData: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  async onLoad(options) {
    let {idx} = options;
    await this.getNavList();
    if (idx) {
      this.navChange(idx);
    } else {
      navid = this.data.navArr[0]._id;
      this.getProductList();
    }
  },

  // 获取分类导航
  async getNavList() {
    await listNav().then(res=>{
      console.log(res);
      this.setData({
        navArr: res.data
      })
      this.selectComponent("#myTabs").resize()
    })
  },

  // 获取产品列表
  getProductList(s=0) {
    this.setData({
      loading: true
    })
    queryProduct({
      navid, 
      size:s
    }).then(res=>{
      let oldArr = this.data.proArr;
      let newArr = oldArr.concat(res.data)
      this.setData({
        proArr: newArr,
        loading: false
      })
      if(res.total == this.data.proArr.length) {
        this.setData({
          isData: true
        })
      }
    })
  },  

  // 导航条切换事件
  navChange(e) {
    let index = e?.detail?.index ?? e;
    navid = this.data.navArr[index]._id
    this.setData({
      proArr: [], 
      loading: false, 
      isData: false, 
      navActive: Number(index)
    })
    this.getProductList()
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {
    if (this.data.isData) return;
    this.getProductList(this.data.proArr.length)
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})