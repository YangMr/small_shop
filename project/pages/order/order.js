import {storage} from "../../utils/storage";
import {OrderModel} from "../../models/order";
const md5 = require("../../utils/md5");
const orderModel = new OrderModel();

// pages/order/order.js
Page({

  //确认支付方法
  doPay(){
    //获取本地存储openid信息
    const user_info = storage.get("userinfo");
    const cart_list = storage.get("carts");

    // "{"out_trade_no":"20201008163741563217","nonceStr":"glMVMiJJ3jUOWGeq","timeStamp":"1602146261","package":"prepay_id=wx081637511793128429b74a361401010000","paySign":"0bd2b6cad40cb55c037b5ba89d345d03"}"

    const sign = this._sign({
      openid : user_info.openid,
      uid : user_info._id,
      salt : user_info.salt
    })
    orderModel.doOrder({
      openid : user_info.openid,
      uid : user_info._id,
      total_price : this.data.totalPrice,
      total_num : this.data.totalNum,
      derate_price : 0,
      real_price : this.data.totalPrice,
      order : JSON.stringify(cart_list),
      sign : sign
    }).then(res=>{
      console.log(res)
      this.wxPay(res.data.result);
    })
  },

  //拉起支付方法
  wxPay(data){
    let pay_data = JSON.parse(data);
    console.log(pay_data)
    wx.requestPayment({
      timeStamp: pay_data.timeStamp,
      nonceStr: pay_data.nonceStr,
      package: pay_data.package,
      signType: 'MD5',
      paySign: pay_data.paySign,
      success (res) { 
        storage.remove("carts");
      },
      fail (res) { 
        console.log(res)
      }
    })
  },

  //签名加密方法
  _sign(json){
    var arr = [];

    for(var i in json){
      arr.push(i);
    }
    arr = arr.sort();

    var str = "";

    for (let i = 0; i < arr.length; i++) {
      str += arr[i] + json[arr[i]]
    }
    return md5(str);
  },


  //计算所有商品的总结以及所用商品的总数量
  computedProduct(cart_list){
    // const cart_list = this.data.cartList;
    let allPrice = 0;
    let allNum = 0;
    cart_list.forEach((item,index)=>{
      allPrice += parseFloat(item.price) * item.num;
      allNum += item.num;
    });
    allPrice = allPrice.toFixed(2);
    this.setData({
      totalPrice : allPrice,
      totalNum : allNum
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
    totalNum : 0,
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