// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag : false,
    userInfo : null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户信息  -》 用户必须授权才能调用 -》 微信小程序早期版本 -》 调用这个api是可以直接弹出授权框 -》 心在要弹出授权框-》 用户必须得主动去触发 -》 通过button按钮去拉起授权框 -》 当点击授权之后我们就可以获取到用户的信息
    


    //当页面一开始加载的时候 -》 判断用户是否进行授权 -》 如果授权了,我们则自动获取到用户信息
    //页面加载的时候获取用户已授权的信息
    wx.getSetting({
      success : (res)=>{
        //判断用户是够已经授权,如果授权了则获取用户信息
        if(res.authSetting["scope.userInfo"]){
          //获取用户信息 -》 授权
          wx.getUserInfo({
            success : (res)=>{
              console.log(res)
              this.setData({
                flag : true,
                userInfo : res.userInfo
              })
            }
          })
        }
      }
    })

  },

  /*
  
    当用第一次访问我们开发的小程序 

      没授权 --》 进行授权

        点击按钮 -》 拉起授权框口 -》 点击授权之后 -》 获取到用户信息 

        缺点: 当用户点击按钮的时候才能获取到用户信息, 刷新之后没有了 -》 这个时候如果还要的到用户信息 -》 再次点击授权按钮

        问题:
          当用户再次进入小程序或者页面刷新的时候,这个时候我们就得不到用户的信息了

        结果: 当用户授权之后,页面再次刷新还是能够自动获取到用户信息,而不是手动的再次点击按钮获取  


        判断用户有没有授权 

      授权:   


      
  
  */

  onGetUserInfo(e){
    console.log(e.detail.userInfo)
    if(e.detail.userInfo){
      this.setData({
        userInfo : e.detail.userInfo,
        flag : true
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