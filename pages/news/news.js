import {queryNews} from "../../api/apis"
import { formatNum, formatTime } from '../../utils/common.js';

// pages/news/news.js
Page({

  /**
   * Page initial data
   */
  data: {
    newsArr: [], 
    loading: false, 
    isData: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.getNewsData()
  },

  // 获取新闻列表
  getNewsData(size=0) {
    this.setData({
      loading: true
    })
    queryNews({
      limit: 8, 
      size
    }).then(res => {
      console.log(res);
      res.data.forEach(item=>{
        item.view_count = formatNum(item.view_count)
        item.publish_date = formatTime(item.publish_date,5)
      })
      let oldData = this.data.newsArr
      let newData = [...oldData, ...res.data]
      wx.stopPullDownRefresh()
      this.setData({
        newsArr: newData,
        loading: false
      })
      if(this.data.newsArr.length == res.total) {
        this.setData({
          isData: true
        })
      }
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
    this.setData({
      newsArr: [],
      isData: false, 
      loading: false
    })
    this.getNewsData()
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {
    if (this.data.isData) return;
    this.getNewsData(this.data.newsArr.length);
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})