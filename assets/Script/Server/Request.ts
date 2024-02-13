/**
 * 微信request请求封装
 */
import 'miniprogram-api-typings' //防止报错:找不到wx
export function request(url, data = {}, method: "GET" | "POST" = "GET") {
    return new Promise((resolve, reject) => {
        wx.request({
            url: "http://192.168.1.27:8080" + url,
            data,
            method: method,
            header: {
                cookie: wx.getStorageSync('cookies') ? wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1) : ''
            },
            success: (res) => {
                console.log("请求成功");
                console.log(res)
                resolve(res.data);
            },
            fail: (err) => {
                console.log("请求失败");
                reject(err);
            }
        })
    })
}