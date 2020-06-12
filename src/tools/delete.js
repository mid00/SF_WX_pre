import axios from 'axios'

export function deleteMsg(url,obj=null){

    return new Promise((resolve,reject)=>{

        axios.post(url,obj)
        .then(result=>{
            resolve(result);
        })
    })
}