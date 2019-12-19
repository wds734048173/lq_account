import axios from 'axios';//引入axios

export function fetch(options){
  return new Promise((resolve, reject) => {
    const instance = axios.create({  //instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
      //baseURL: 'http://preach.lanqiao.cn/',
      // baseURL: 'http://10.100.40.22:8080/',
      baseURL: 'http://localhost:8080/',
      //所有的请求都会带上这些配置，比如全局都要用的身份信息等。
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        // 'token_in_header': global_.token,//token从全局变量那里传过来
      },
      timeout:30 * 1000 // 30秒超时
    });
    instance(options)
      .then(response => { //then 请求成功之后进行什么操作

        resolve(response);//把请求到的数据发到引用请求的地方
        // if(response.data.code == "207"){
        //   store.state.isLoading = true;
        // }else{
        //   store.state.isLoading = false;
        // }
        //console.log(response);
      })
      .catch(error => {
        console.log('请求异常信息：'+error);
        reject(error);
      });
  });
}
