//引入配置的公共的接口文件
import {config} from "../config";

//创建一个对象,保存项目的错误提示信息
const tips = {
  1 : "抱歉,出现了一个错误",
  301 : "永久重定向",
  400 : "请求包含不支持的参数",
  401 : "未授权",
  403 : "被禁止访问",
  404 : "请求的资源不存在",
  413 : "上传的File体积太大",
  500 : "内部错误",
  1000 : "输入参数错误",
  1001 : "输入的json格式不正确",
  1002 : "找不到资源",
  1003 : "未知错误",
  1004 : "禁止访问",
  1005 : "不正确的开发者key",
  1006 : "服务器内部错误",
  2000 : "你已经点过赞了",
  2001 : "你还没点过赞",
  3000 : "该期内容不存在"
}

//创建一个类,封装数据请求
class HTTP {
  request({url,data={},method="GET"}){
    return new Promise((resolve,reject)=>{
      this._request(url,resolve,reject,data,method)
    })
  }
  //私有方法
  _request(url,resolve,reject,data={},method="GET"){
    wx.request({
      url: config.api_base_url + url,
      header: {
        "content-type": "application/json"
      },
      data : data,
      method : method,
      success : (res)=>{
        
        //获取当前返回数据的状态码
        const code = res.statusCode.toString();
        //如果状态吗是2开头则把数据返回出去
        if(code.startsWith("2")){
          resolve(res);
        }else{
          console.log(res)
          const error_code = res.data.error_code;
          this._show_error(error_code); // 1005
        }

      },
      fail : (err)=>{
        reject(err);
        this._show_error(1);
      }
    })
  }
  //错误提示方法
  _show_error(error_code){
    if(!error_code){
      error_code = 1;
    }
    const tip = tips[error_code]; 
    console.log(tip)
    wx.showToast({
      title: tip ? tip : tips[1],
      icon : "none",
      duration : 2000
    })
  }
}

export {HTTP}
