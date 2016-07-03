

var oA = document.getElementsByTagName("a");
for (var i = 0; i < oA.length; i++) {
    oA[i].onmouseover = function () {
        var reg = /g/;
        var reg1 = /<.+>/g;
        var inner = this.innerHTML.replace(reg1, "");
        if (!reg.test(this.innerHTML)) {
            this.setAttribute("title", inner)
        }
        ;
    }
}


//轮播图
(function () {
    function move(ele, obj, duration, callBack) {
        clearInterval(ele.timer)
        var time = 0;
        var interval = 15;
        var oBegin = {}, oChange = {};
        for (var attr in obj) {
            var begin = utils.getCss(ele, attr);
            var target = obj[attr];
            var change = target - begin;
            oBegin[attr] = begin;
            oChange[attr] = change;
        }
        function step() {
            time += interval;
            if (time < duration) {
                for (var attr in oChange) {
                    var begin = oBegin[attr]
                    var change = oChange[attr]
                    var val = time / duration * change + begin
                    //console.log(val);
                    utils.setCss(ele, attr, val);

                }
            } else {
                for (var attr in obj) {
                    utils.setCss(ele, attr, obj[attr]);
                }
                clearInterval(ele.timer);
                callBack && callBack();
            }
        }

        ele.timer = window.setInterval(step, interval);
    }

    var outer = document.getElementById('outer');
    var innerl = document.getElementById('innerul');
    var olis = outer.getElementsByTagName("a");
    var oImg1 = innerl.getElementsByTagName("li")[0];
    var first = oImg1.cloneNode(true);
    innerl.appendChild(first);
    innerl.style.width = innerl.offsetWidth + oImg1.offsetWidth + "px";

    for (var i = 0; i < olis.length; i++) {
        olis[i].zhu = i;
        olis[i].onmouseover = function () {
            clearInterval(outer.time1);
            var index = this.zhu;
            move(innerl, {left: -index * 1349}, 600);
            step = index;
            outer.time1 = window.setInterval(toLeft, 2000)
            force(index);

        }
    }
    function force(index) {
        for (var i = 0; i < olis.length; i++) {
            utils.removeClass(olis[i], "select")
        }
        utils.addClass(olis[index], "select")
    }

    var step = 0;

    function toLeft() {
        step++;
        if (step == 11) {
            innerl.style.left = 0;
            step = 1
        }
        move(innerl, {left: -step * 1349}, 600);
        //console.log(index)
        if (step == 10) {
            force(0)
        } else {
            force(step);
        }
    }

    outer.time1 = window.setInterval(toLeft, 2000);
    outer.onmouseover = function () {
        clearInterval(outer.time1);
    }
    outer.onmouseout = function () {
        outer.time1 = window.setInterval(toLeft, 2000);
    }
})();

/*广告区*/
$(function () {
    var $box = $('#adviertisement2');
    $box.find('.container-8-con-mid-inner1').on("mouseenter", function (e) {

        $box.i = $(this).parent().index();
        $(this).parent().children('.container-8-con-mid-inner1').next().css("display", "block").stop().animate({
            width: 740,
            opacity: 1
        }, 300).parent().siblings().children('.container-8-con-mid-inner2').stop().animate({
            width: 0,
            opacity: 0
        }, 300, function () {
            $(this).css("display", "none");
        });
        if ($box.i == 5) {
            $(this).parent().css("marginLeft", 40).stop().animate({left: -140 * 5}, 300);
            $box.find('li').each(function (index, item) {
                if (index < 5) {
                    $(this).css("marginLeft", 0).stop().css("zIndex", $(this).index()).animate({left: -170 * ($(this).index())}, 300)
                }
            })
        } else {
            $box.find('li').each(function (index, item) {
                if (index <= $box.i) {
                    $(this).css("marginLeft", 0);
                    $(this).stop().animate({left: -170 * $(this).index()}, 300)
                } else {
                    $(this).stop().css("zIndex", -$(this).index()).animate({left: -170 * ($(this).index() - 1)}, 300)
                }

            })
        }
    });
    $box.on("mouseleave", function (e) {
        e.stopPropagation();
        var a = $box.find('li').eq($box.i);
        a.children('.container-8-con-mid-inner1').next().stop().animate({width: 0, opacity: 0}, function () {
            $(this).css("display", "none")
        });
        $box.find('li').each(function (index, item) {
            if ($(this).index() == 0) {
                $(this).css("marginLeft", 0).stop().animate({left: 0, zIndex: 1});
            } else {
                $(this).css("marginLeft", 20).stop().animate({left: 0, zIndex: 1});
            }

        });
        $(this).css("zIndex", 1)
    })
});

/*原创区左侧鼠标滑过效果*/
(function () {
    var conEt = document.getElementsByClassName('container-18-left-con-mid1-con');
    var conEtc = document.getElementsByClassName('container-18-left-con-mid1-con3');
    var conEta = document.getElementsByClassName('container-18-left-con-mid1-con2')
    for (var i = 0; i < conEt.length; i++) {
        var cur = conEt[i];
        cur.index = i;
        cur.onmouseover = function () {
            conEtc[this.index].style.display = "block"
            conEta[this.index].style.width = '114px'
        }
        cur.onmouseout = function () {
            conEtc[this.index].style.display = "none";
            conEta[this.index].style.width = '170px'
        }
    }

})()


/*导航区*/
/*搜索框*/
function hasChild(ele, con) {
    var par = ele.parentNode;
    console.log(par)
    if (ele.className == con.className) {
        return true
    }
    while (par) {
        par = par.parentNode;
        if (par == con) {
            return true;
        }
    }
    return false;
}
(function () {
    var chick = document.getElementById('chick-con');
    var inp = document.getElementById('inp');
    var btn = document.getElementById('btn')
    inp.onfocus = function () {
        var strValue = this.value;
        this.value = "";
        chick.style.display = "block";
        var that = this;
        document.body.onclick = function (ev) {
            var ev = ev || window.event;
            ev.target = ev.target || ev.srcElement;
            if (hasChild(ev.target, chick)) {
                var reg1 = /<.+>/g;
                var inner = ev.target.innerHTML.replace(reg1, "");
                that.value = inner;
                chick.style.display = "none";
            }
            if (!hasChild(ev.target, chick) && ev.target !== that && ev.target !== btn) {
                chick.style.display = "none";
                that.value = strValue;
            }

        }
        btn.onclick = function () {
            if (!that.value) {
                that.value = strValue;
                chick.style.display = "none";
            }
        }
    };
})();


/*登录框多种登录方式*/

var navIn1 = document.getElementById('navCon2-inner5-1')
var navIn2 = document.getElementById('navCon2-inner5-2');
navIn1.onclick = function (ev) {

    var ev = ev || window.event;
    ev.stopPropagation();
    ev.target = ev.target || ev.srcElement;
    var strTarget = ev.target;
    if (strTarget.nodeName == "SPAN" || strTarget.nodeName == "I") {
        navIn1.style.display = "none";
        navIn2.style.display = "block";
    }
};
navIn2.onclick = function (ev) {
    var ev = ev || window.event;
    ev.target = ev.target || ev.srcElement;
    var strTarget = ev.target;
    if (strTarget.nodeName == "I") {
        this.style.display = "none";
        navIn1.style.display = "block";
    }
};

/*登录框关闭*/
var navCon = document.getElementById('navCon');
var close = document.getElementById('close');
var close2 = document.getElementById('close2');
var navCon2 = document.getElementById('navCon2')
close.onclick = function () {
    navCon.style.display = "none";
    fil.style.display = "none"

}
close2.onclick = function () {
    navCon2.style.display = "none";
    fil.style.display = "none"
}


/*登录框显示*/
var navUser = document.getElementById('nav-user');
var fil = document.getElementById('fil');
navUser.onclick = function (ev) {
    var ev = ev || window.event;
    ev.target = ev.target || ev.srcElement;
    var strTarget = ev.target
    if (strTarget.nodeName == "A" && (strTarget.innerHTML == ("登录"))) {
        navCon.style.display = "block";
        fil.style.display = "block"

    }
    ;
    /*注册框显示*/
    if (strTarget.nodeName == "A" && (strTarget.innerHTML == ("注册"))) {
        navCon2.style.display = "block";
        fil.style.display = "block"
    }


    /*消息上传 播放 提示*/
    var tak = document.getElementById('nav-user-tak')
    var tak2 = document.getElementById('nav-user-tak2')
    var tak3 = document.getElementById('nav-user-tak3')
    var reg = /上传|消息|播放记录/;
    var ary = [tak, tak2, tak3];
    if (strTarget.nodeName == "A" && reg.test(strTarget.innerHTML)) {
        for (var i = 0; i < ary.length; i++) {
            if (ary[i].parentNode == strTarget.parentNode) {
                if (ary[i].style.display == "block") {
                    for (var i = 0; i < ary.length; i++) {
                        ary[i].style.display = "none";
                    }
                } else {
                    for (var k = 0; k < ary.length; k++) {
                        ary[k].style.display = "none";
                    }
                    ary[i].style.display = "block";
                }
            }
        }
    }
    if (hasChild(strTarget, tak)) {
        tak.style.display = "none";
    }
};


/*注册框多种注册方式*/
var navIn9 = document.getElementById('navCon2-inner9');
var navIn10 = document.getElementById('navCon2-inner10');
navIn9.onclick = function (ev) {

    var ev = ev || window.event;
    ev.stopPropagation();
    ev.target = ev.target || ev.srcElement;
    var strTarget = ev.target;
    if (ev.target.nodeName == "SPAN" || ev.target.nodeName == "I") {
        navIn9.style.display = "none";
        navIn10.style.display = "block";
    }
};
navIn10.onclick = function (ev) {
    var ev = ev || window.event;
    ev.target = ev.target || ev.srcElement;
    var strTarget = ev.target;
    if (strTarget.nodeName == "I") {
        this.style.display = "none";
        navIn9.style.display = "block";
    }
};


/*延时加载*/
/*一处广告 两个轮播图*/
/*下拉页面显示 导航栏*/
(function () {
    var nav = document.getElementById('nav');
    var nav1 = nav.cloneNode(true);
    var phoneBanner = document.getElementById('outer');
    var navCon = document.getElementById('navCon');

    window.onscroll = function () {
        var A = nav.offsetHeight + phoneBanner.offsetHeight;
        if (document.body.scrollTop > A) {
            document.body.appendChild(nav1);
            nav.style.position = "fixed";
            nav.style.top = 0;
            nav.style.zIndex = 10;
            navCon.style.top = document.body.scrollTop + 30 + "px";
        } else {
            nav.style.position = "relative";
            nav.style.top = 0;
        }
    }
})();

















