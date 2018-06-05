/**
 * Created by lcw on 2018/5/20.
 */
$(function () {
    //banner轮播图
    banner();
    //手机端滑动导航
    initMobileTab();
    $('[data-toggle="tooltip"]').tooltip();
});
var banner = function () {
    /*1.获取轮播图数据    ajax */
    /*2.根据数据动态渲染  根据当前设备  屏幕宽度判断 */
    /*2.1 准备数据*/
    /*2.2 把数据转换成html格式的字符串 （动态创建元素，字符串拼接，模版引擎【artTemplate】*/
    /*2.3 把字符渲染页面当中*/
    /*3.测试功能 页面尺寸发生改变重新渲染*/
    /*4.移动端手势切换  touch*/

    /*ui框架：bootstrap,妹子UI,jqueryUI,easyUI,jqueryMobile,mui,framework7*/
    /*关于移动端的UI框架：bootstrap,jqueryMobile,mui,framework7*/
    /*模板引擎：artTemplate,handlebars,mustache,baiduTemplate,velocity,underscore*/

    /*做数据缓存*/
    function render() {
        getData(function (data) {
            var isMob = $(window).width() < 768;
            var pointerHtml = template('pointerTemplate', {list: data});
            var imageHtml = template('imageTemplate', {list: data, isMob: isMob});
            $('.carousel-indicators').html(pointerHtml);
            $('.carousel-inner').html(imageHtml);
        })
    }

    function getData(callback) {
        if (window.data) {
            callback && callback(window.data);
        } else {
            $.ajax({
                type: 'get',
                url: 'js/data.json',
                //设置dataType的作用是强制转换后台返回的数据为json对象，
                // 如果后台返回的不是json格式的字符串，那么就不会执行success执行error回调
                dataType: 'json',
                success: function (data) {
                    window.data = data;
                    callback && callback(window.data);
                }
            });
        }
    }

    //测试
    $(window).on('resize', function () {
        render();
        //jQuery里面通过js主动触发某个事件使用trigger()方法
    }).trigger('resize');
    //手势操作控制轮播图
    var start = 0;
    var isMove = false;
    var distance = 0;
    $('.wjs_banner').on('touchstart', function (e) {
        start = e.originalEvent.touches[0].clientX;
    }).on('touchmove', function (e) {
        var move = e.originalEvent.touches[0].clientX;
        distance = move - start;
        isMove = true;
    }).on('touchend', function (e) {
        if (isMove && Math.abs(distance) > 50) {
            if (distance > 0) {
                $('.carousel').carousel('prev');
            } else {
                $('.carousel').carousel('next');
            }
            start = 0;
            isMove = false;
            distance = 0;
        }
    })

};

var initMobileTab = function () {
    var width = 0;
    var navTabs = $('.wjs_product .nav-tabs');
    navTabs.find('li').each(function () {
        width += $(this).outerWidth(true);
    });
    navTabs.width(width);
    var $parentNav = $('.wjs_product .parent_nav_box');
    $parentNav.on('touchmove', function (e) {
        e.preventDefault();
    });
    new IScroll($parentNav[0],{
        scrollX:true,
        scrollY:false,
        click:true
    })
};

