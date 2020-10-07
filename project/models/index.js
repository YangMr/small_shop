import {HTTP} from "../utils/http";

class IndexModel extends HTTP{
  getProduct(qcode){
    return this.request({
      url : "/api/getProduct",
      data : {
        qcode : qcode
      }
    })
  }
}

export {IndexModel}