import {openIdModel} from "./models/openId";
import {storage} from "./utils/storage";
const openidModel = new openIdModel();
//app.js
App({
  onLaunch: function () {
    /*
      微信小程序支付:
        1. 当小程序启动的时候,调用wx.login获取小程序的code码
        2. 获取到小程序的code码之后,调用获取openid接口,获取到openid
        3. 将获取到的openid以及其他信息保存到本地
        4. 当点击确认支付按钮时调用统一下单接口,将对应的参数发送给后台,其中有一个签名非常重要,使用的md5进行的加密
        5. 当统一下单接口调用成功之后,后台会给我们返回支付所需要的相关信息
        6. 获取到支付相关的信息之后,调用封装的微信支付方法,拉起支付,把对应支付信息传进去就能够完成支付功能

        注意:加密以这块我们根据后台的要求,只加密了openid uid 以及salt等属性以及属性值,用的是md5
    */
   wx.login({
     success : (res)=>{
       console.log(res)
       openidModel.getOpenId(res.code).then(res=>{
         console.log(res)
          storage.set("userinfo",res.data.userinfo);
       })
     }
   })
  },
  globalData: {
    userInfo: null
  }
})