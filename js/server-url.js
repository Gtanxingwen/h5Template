/**
 * Created by hasee on 2017/4/19.
 */

var baseUrl  = '';
var devUrl = '';
var testUrl = '';
var prodUrl = '';

if(ENV == 'dev'){
    baseUrl = devUrl;
}
if(ENV == 'test'){
    baseUrl = testUrl;
}
if(ENV == 'product'){
    baseUrl = prodUrl;
}

var URLS = {
    login: baseUrl + '/login'  //example
};
