import {HTTP} from "../utils/http";

class openIdModel extends HTTP{
  getOpenId(code){
    return this.request({
      url : "/weixinpay/login",
      data : {
        code : code
      }
    })
  }
}

export {openIdModel}