// pages/newsDetail/newsDetail.js
import { newsDetail } from './../../api/apis';
import { formatTime, formatNum } from '../../utils/common';
let id;

Page({

  /**
   * Page initial data
   */
  data: {
    detail: null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    console.log(options);
    id = options.id
    this.getDetail();
  },

  getDetail() {
    newsDetail({
      id
    }).then(res=>{
      console.log(res);
      res.data.publish_date = formatTime(res.data.publish_date, 6)
      res.data.view_count = formatNum(res.data.view_count)
      res.data.content = res.data.content.replace(/<p/gi, "<p class='pstyle'")
      res.data.content = res.data.content.replace(/<img/gi, "<img class='imgstyle'")
      wx.setNavigationBarTitle({
        title: res.data.title,
      })
      this.setData({
        detail: res.data
      })
    })
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

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {
    return {
      title: this.data.detail.title,
      path: "/pages/newsDetail/newsDetail?id=" + this.data.detail._id
    }
  },

  /**
   * Share to moment
   */
  onShareTimeline() {
    return {
      title: this.data.detail.title,
      path: "/pages/newsDetail/newsDetail?id=" + this.data.detail._id
    }
  }
})