
(function (window) {
    // 登录后阻止返回登录页
    window.onload = function () {
        function pushHistory() {
            var state = {
                title: "title",
                url: "#"
            };
            window.history.pushState(state, "title", "#");
        }

        pushHistory();
        window.addEventListener("popstate", function(e) {
            //根据自己的需求实现自己的功能
            // alert(location.href);
            // alert("我监听到了浏览器的返回按钮事件啦");
            if(location.href.indexOf('/home.html') > -1){
                // history.go(-1);
                pushHistory();
            }else {
                history.go(-1);
            }
        }, false);
    };

    //js获取url参数值
    window.getRequest = function() {
        var url = location.search; //获取url中"?"符后的字串
        if(url.indexOf('%') > -1){
            url = decodeURIComponent(url);
        }
        var theRequest = {};
        if (url.indexOf("?") != -1) {
            var str = url.substr(1); //获取?后的字符
            var arrStr = str.split("&");
            for(var i = 0; i < arrStr.length; i ++) {
                theRequest[arrStr[i].split("=")[0]] = decodeURI(arrStr[i].split("=")[1]);
            }
        }
        return theRequest;
    };

    /**
     *微信隐藏分享按钮
     */
    window.onBridgeReady = function() {
        WeixinJSBridge.call('hideOptionMenu');
    };
    window.hiddenWxButton = function() {
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        } else {
            onBridgeReady();
        }
    };


    // 设置rem基数——实现响应式
    window.adapt = function(num) {
        var width = window.innerWidth;
        if(num) {
            width = num;
        }

        if(width < 320) {
            width = 320;
        }
        if(width > 750) {
            width = 750;
        }
        document.querySelector('html').style.fontSize = (width / 750) * 100 + 'px';
        localStorage.htmlFontSize = (width / 750) * 100;
    };

    window.countCurrentPx = function(num) {
        var fs = localStorage.htmlFontSize;
        fs = parseFloat(fs);
        num = parseFloat(num);
        return parseInt((num / 100) * fs.toFixed(0));
    };


    window.includeStyleElement = function(styles,styleId){
        if (document.getElementById(styleId)) {
            return;
        }
        var style = document.createElement('style');
        style.id = styleId;
        //这里最好给ie设置下面的属性
        /*if (isIE()) {
         style.type = “text/css”;
         style.media = “screen”
         }*/
        (document.getElementsByTagName('head')[0] || document.body).appendChild(style);
        if (style.styleSheet) { //for ie
            style.styleSheet.cssText = styles;
        } else {//for w3c
            style.appendChild(document.createTextNode(styles));
        }
    };

    window.publicReady = function() {
        adapt();
        var bodyMain = document.getElementsByClassName('body-main')[0];
        if(bodyMain){
            bodyMain.style.height = window.innerHeight + 'px';
        }
    };

    //onresize 事件会在窗口或框架被调整大小时发生
    window.onresize = function () {
        console.log('onresize')
        adapt();
        var bodyMain = document.getElementsByClassName('body-main')[0];
        if(bodyMain){
            bodyMain.style.height = window.innerHeight + 'px';
        }
    };

    // 手机切换横竖屏时
    window.addEventListener('orientationchange',function (e) {
        console.log('手机切换横竖屏时:orientationchange');
        adapt();
    });

})(window);

//init html: font-size and body-main height
publicReady();


