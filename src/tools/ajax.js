

export function getinfo( url , obj ){
    var xhr = new XMLHttpRequest(); // 1. 创建异步对象
    xhr.open( "POST" , url , true ); // 2. 创建请求
    var formdata = obj; // 2.1 创建请求主体
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); // 2.2 设置请求头，允许传递任意字符
    xhr.send(formdata) // 3. 发送请求
    xhr.onreadystatechange = function(){ // 4. 监听响应
        if( xhr.readyState == 4 ){
            if( xhr.status == 200 ){
                var result = xhr.responseText;
                return result;
            }
        }
    }
}