//引入封装的本地存储方法
import {storage} from "../utils/storage";


const cart = {
  //将商品数据存储到本地
  addCart(productData){
    console.log(productData)

    // carts
    //创建一个数组,保存将要存储到本地的数据
    const cart_data = [];
    //1. 获取本地存储的商品信息
    const cart_info = storage.get("carts");
    console.log(cart_info)

    //2. 判断本地有没有存储商品
    if(cart_info){
      if(this.cartHashData(cart_info,productData)){
        for(var i=0;i<cart_info.length;i++){
          if(cart_info[i]._id == productData._id){
            cart_info[i].num += 1;
          }
        };
        storage.set("carts",cart_info);
      }else{
        productData.num = 1;
        cart_info.push(productData);
        storage.set("carts",cart_info);
      }
    }else{
      //给存储到本地的商品添加数量
      productData.num = 1;
      //将获取到的商品数据存储到数组里面
      cart_data.push(productData);
      //将数组里面的商品数据存储到本地
      storage.set("carts",cart_data);
    }
  },

  //定义一个检测本地有没有将要存储的商品信息方法
  cartHashData(cart_info,data){
    for(var i=0;i<cart_info.length;i++){
      if(cart_info[i]._id == data._id){
        return true;
      }
    }
    return false;
  }
};  

export {cart}



   
    //2.1 有

    //2.2 没有 

    /*
      将商品存储到本地:
        1. 先看看本地有没有存储的商品

        1.1 有 
          本地存储的商品里面有没有我要存储的商品

          有
            让当前要存储的商品数量加1

          没有
            把当前要存储的商品准到本地

        2.1 没有

          直接存储到本地

          {
            id : 1
            name : ""
          }

          [
            {
              id : 1,
              name : ""
            }
          ]

    */