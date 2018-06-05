/**
 * Created by lcw on 2018/5/20.
 */
$(function () {
    //banner�ֲ�ͼ
    banner();
    //�ֻ��˻�������
    initMobileTab();
    $('[data-toggle="tooltip"]').tooltip();
});
var banner = function () {
    /*1.��ȡ�ֲ�ͼ����    ajax */
    /*2.�������ݶ�̬��Ⱦ  ���ݵ�ǰ�豸  ��Ļ����ж� */
    /*2.1 ׼������*/
    /*2.2 ������ת����html��ʽ���ַ��� ����̬����Ԫ�أ��ַ���ƴ�ӣ�ģ�����桾artTemplate��*/
    /*2.3 ���ַ���Ⱦҳ�浱��*/
    /*3.���Թ��� ҳ��ߴ緢���ı�������Ⱦ*/
    /*4.�ƶ��������л�  touch*/

    /*ui��ܣ�bootstrap,����UI,jqueryUI,easyUI,jqueryMobile,mui,framework7*/
    /*�����ƶ��˵�UI��ܣ�bootstrap,jqueryMobile,mui,framework7*/
    /*ģ�����棺artTemplate,handlebars,mustache,baiduTemplate,velocity,underscore*/

    /*�����ݻ���*/
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
                //����dataType��������ǿ��ת����̨���ص�����Ϊjson����
                // �����̨���صĲ���json��ʽ���ַ�������ô�Ͳ���ִ��successִ��error�ص�
                dataType: 'json',
                success: function (data) {
                    window.data = data;
                    callback && callback(window.data);
                }
            });
        }
    }

    //����
    $(window).on('resize', function () {
        render();
        //jQuery����ͨ��js��������ĳ���¼�ʹ��trigger()����
    }).trigger('resize');
    //���Ʋ��������ֲ�ͼ
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

