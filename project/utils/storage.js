const storage = {
  //获取本地存储的信息
  get(key){
    return wx.getStorageSync(key);
  },
  //设置本地存储的信息
  set(key,value){
    wx.setStorageSync(key, value)
  },
  //删除本地存储的信息
  remove(key){
    wx.removeStorageSync(key);
  },
  //清空本地存储的信息
  clear(){
    wx.clearStorageSync();
  }
}

export {storage}