import axios from 'axios';//引入axios

export function fetch(options){
  return new Promise((resolve, reject) => {
    const instance = axios.create({  //instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
      // baseURL: process.env.BASE_API,
      baseURL: 'http://127.0.0.1:3000/',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      timeout:12 * 1000 // 12秒超时
    });
    instance(options)
      .then(response => { 
        //then 请求成功之后进行什么操作
        resolve(response);//把请求到的数据发到引用请求的地方
        // if(response.data.code == "207"){
        //   store.state.isLoading = true;
        // }else{
        //   store.state.isLoading = false;
        // }
        //console.log(response);
      })
      .catch(error => {
        console.log(options)
        console.log('请求异常信息：'+error);
        reject(error);
      });
  });
}
