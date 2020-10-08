import {storage} from "../../utils/storage";
// pages/order/order.js
Page({

  //计算所有商品的总结以及所用商品的总数量
  computedProduct(cart_list){
    // const cart_list = this.data.cartList;
    let allPrice = 0;
    cart_list.forEach((item,index)=>{
      allPrice += parseFloat(item.price) * item.num;
    });
    allPrice = allPrice.toFixed(2);
    this.setData({
      totalPrice : allPrice
    })
  },

  toggle(){
    const cart_list = storage.get("carts");
    if(this.data.len == 1){
      this.setData({
        len : cart_list.length,
        cartList : cart_list
      })
    }else{
      cart_list.length = 1;
      this.setData({
        len : 1,
        cartList : cart_list
      })
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    totalPrice : 0,
    cartList : [],
    len : 1,
    lines : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取本地存储的数据
    const cart_list = storage.get("carts");
    this.computedProduct(cart_list);
    cart_list.length = this.data.len;
    if(cart_list){
      this.setData({
        cartList : cart_list
      })
    }
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