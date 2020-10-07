import {storage} from "../../utils/storage";
// pages/cart/cart.js
Page({

  //商品减少的方法
  decrement(e){
    const index =e.target.dataset.index;
    const cart_list = this.data.cartList;
    if(cart_list[index].num == 1){
      wx.showModal({
        title: '提示',
        content: '您确定要删除此商品吗?',
        success : (res)=> {
          if (res.confirm) {
            cart_list.splice(index,1);
            this.setData({
              cartList : cart_list
            }) 
            storage.set("carts",cart_list);
            this.computedProduct()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      cart_list[index].num -= 1;
      this.setData({
        cartList : cart_list
      }) 
      storage.set("carts",cart_list);
      this.computedProduct()
    }
    
  },
  //商品增加的方法
  increment(e){
    const index =e.target.dataset.index;
    const cart_list = this.data.cartList;
    cart_list[index].num += 1;
    this.setData({
      cartList : cart_list
    });
    storage.set("carts",cart_list);
    this.computedProduct()    
  },
  /**
   * 页面的初始数据
   */
  data: {
    totalPrice : 0,
    totalNum : 0,
    cartList : [
      // {
      //   _id: "5b04e0c819d88c03a071ec66",
      //   shop_id: "5ac079f7b3c2d439307e78fa",
      //   cate_id: "5ac089e4a880f20358495509",
      //   title: "农夫山泉500ml",
      //   price: "0.2",
      //   description: "",
      //   num : 2
      // },
      // {
      //   _id: "5b04e0c819d88c03a071ec66",
      //   shop_id: "5ac079f7b3c2d439307e78fa",
      //   cate_id: "5ac089e4a880f20358495509",
      //   title: "哇哈哈500ml",
      //   price: "0.2",
      //   description: "",
      //   num : 3
      // },
      // {
      //   _id: "5b04e0c819d88c03a071ec66",
      //   shop_id: "5ac079f7b3c2d439307e78fa",
      //   cate_id: "5ac089e4a880f20358495509",
      //   title: "脉动500ml",
      //   price: "0.2",
      //   description: "",
      //   num :4
      // },
      // {
      //   _id: "5b04e0c819d88c03a071ec66",
      //   shop_id: "5ac079f7b3c2d439307e78fa",
      //   cate_id: "5ac089e4a880f20358495509",
      //   title: "矿泉水500ml",
      //   price: "0.2",
      //   description: "",
      //   num :5 
      // }
   
    ]
  },


  //计算所有商品的总结以及所用商品的总数量
  computedProduct(){
    const cart_list = this.data.cartList;
    let allPrice = 0;
    let allNum = 0;
    cart_list.forEach((item,index)=>{
      allPrice += parseFloat(item.price) * item.num;
      allNum += parseFloat(item.num);
    });
    allPrice = allPrice.toFixed(2);
    this.setData({
      totalPrice : allPrice,
      totalNum : allNum
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cartList = storage.get("carts");
    if(cartList){
      this.setData({
        cartList : cartList
      })
    }
    this.computedProduct()
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