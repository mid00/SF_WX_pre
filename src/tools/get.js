import axios from 'axios'

export function getMsg(url,obj=null){

    return new Promise((resolve,reject)=>{

        axios.post(url,obj)
        .then(result=>{
            resolve(result);
        })
    })
}

// 利用 promise，使异步变 有序 同步 一个ajax请求完了再执行另一个 ajax，可 形成请求链