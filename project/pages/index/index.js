import {IndexModel} from "../../models/index";
import {cart} from "../../business/cart";
const indexMode = new IndexModel();
// pages/index/index.js
Page({

  //定义扫码条形码的方法
  sCode(){

    //调用扫码接口
    wx.scanCode({
      onlyFromCamera: true,
      success : (res)=>{
        //获取到了商品的条形码
        const qr_code = res.result;
        //如果获取到了商品条形码,然后我们通过条形码获取商品的信息
        if(qr_code){
          this.getProduct(qr_code);
        }else{
          wx.showToast({
            title: '商品条形码出错,请重新获取',
            icon : "none",
            duration : 1000
          })
        }
      }
    })
  },

  //定义一个获取商品信息的方法
  getProduct(qr_code){
    //当发送请求的时候显示loading加载
    wx.showLoading({
      title: '加载中',
    });
    //调用获取商品信息接口
    indexMode.getProduct(qr_code).then(res=>{
      const cartData = res.data.result[0];
      //判断如果返回的数据为true,就跳转到购物车页面
      if(res.data.success){
      
        //调用将商品信息存储到本地的方法
        cart.addCart(cartData);

        //跳转到购物车页面
        wx.navigateTo({
          url: '../cart/cart',
        })
      }
      //当数据请求成功后隐藏loading加载
      wx.hideLoading()
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    banner : [
      {
        id : 1,
        url : "https://huaxinwendeng.oss-cn-hangzhou.aliyuncs.com/uploads/image/2020t2vrszZ5ib1586332927.jpg?x-oss-process=image/resize,w_1920,h_575"
      },
      {
        id : 2,
        url : "https://huaxinwendeng.oss-cn-hangzhou.aliyuncs.com/uploads/image/2020lLJK0jy89y1586333534.jpg?x-oss-process=image/resize,w_1920,h_575"
      },
      {
        id : 3,
        url : "https://huaxinwendeng.oss-cn-hangzhou.aliyuncs.com/uploads/image/2020d4n2XkWbQ41586332943.jpg?x-oss-process=image/resize,w_1920,h_575"
      }
    ],
    indicatorDots : true,
    circular : true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})