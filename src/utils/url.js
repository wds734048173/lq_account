const url = {

  // 解析当前页面URL 中指定的参数,并返回
  GetQueryValue(queryName) {
    var query = decodeURI(window.location.search.substring(1));
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == queryName) { return decodeURIComponent(pair[1]); }
    }
    return null;
  },

  // 解析当前页面URL 中的所有参数,并放入对象中. 
  GetQueryObject() {
    var oret = {};
    var query = decodeURI(window.location.search.substring(1));
    console.log(query);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
      oret[pair[0]] = decodeURIComponent(pair[1]);
    }
    return oret;
  }

}

 export default url;