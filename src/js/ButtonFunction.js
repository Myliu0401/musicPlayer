import {
    index,
    shuju,
    initobj,
} from './index.js';
import progress from './progressBar.js';


export let pro1;

/**
 * 按钮功能
 */
export default class Button {
    constructor(data) {
        this.functionarr = document.querySelector('.function').children;
        this.listarr = document.querySelector('.list dl').children;
        this.list = document.querySelector('.list');
        this.mi = document.querySelector('.list .close');
        this.index = index;
        this.data1 = data;
        pro1 = this.pro = new progress(shuju[this.index].duration);
        this.id = null;
        this.ap;
    };

    //上一首
    Lastsong() {
        console.log(123)
        var i = this.chuli(-1); //判断边界
        initobj.xuanran(this.data1[i], i); //渲染页面
        this.pro.zhongshijian = shuju[i].duration; //改变总时间
        this.switch(i);
    };



    //下一首
    Nextsong() {
        var i = this.chuli(1); //判断边界
        console.log(i)
        initobj.xuanran(this.data1[i], i); //渲染页面
        this.pro.zhongshijian = shuju[i].duration; //改变总时间
        this.switch(i); //设置类名
    };

    //边界处理
    chuli(val) {
        this.index = (this.index + val + this.data1.length) % this.data1.length;
        return this.index;
    };


    //用于列表中类名的切换
    switch (i) {
        Array.from(this.listarr).forEach(function (ele, index) {
            ele.className = ''
        });
        this.listarr[i + 1].className = 'Select';
    };


    //暂停
    suspend(boolran) {
        if (!boolran) { //防止拖拽中唱片旋转
            this.qinchu(); //停止唱片旋转
        }
        initobj.audio.pause(); //停止播放
        this.pro.qinchu(this.pro.id); //停止时间设置
        this.fuzhu(initobj.left.innerText); //记录时间
    };

    //播放
    play(boolrean) {
    
        if (boolrean) { //上下首,执行这个函数会传入一个布尔值
            this.ap = undefined; //防止暂停后切歌,时间不对
            initobj.img.removeAttribute('data-deg'); //将图片标签的自定义属性移除
        };

        initobj.audio.play(); //播放
        

        //取标签上的自定义属性来进行设置
        this.rotate(initobj.img.getAttribute('data-deg') ? initobj.img.getAttribute('data-deg') : 0);

        this.pro.jishiqi(this.ap ? this.ap : 0); //设置时间,和进度条
    };

    //设置歌曲播放进度
    jindu(naisi) {
        console.log(naisi);
        initobj.audio.currentTime = naisi;
    }


    //唱片旋转
    rotate(dge) {
        clearInterval(this.id);
        this.id = setInterval(function () {
            dge = +dge + 0.1;

            initobj.img.style.transform = 'rotate(' + dge + 'deg)';
            initobj.img.setAttribute('data-deg', dge);

        }, 1000 / 60);
    };


    //清除计时器
    qinchu() {
        clearInterval(this.id);
    };


    //弹出列表
    liebiao(mixins) {
        const lie = this.functionarr[this.functionarr.length - 1];
        const style = getComputedStyle(lie); //获取元素的位置信息
        if (!mixins) { //播放列表弹出
            this.list.style.transition = '0.5s';
            this.list.style.transform = 'translateY(' + 0 + 'px)'
        } else { //播放列表收起
            this.list.translate = '0.5s';
            this.list.style.transform = 'translateY(' + mixins + 'px)'
        }
    };


    //辅助函数
    fuzhu(text) {
        console.log(text)
        var a = Number(text.substr(0, 2));
        var b = Number(text.substr(3, 2));
        var ab = ((a * 60) + b);
        this.ap = (ab * 1000) / (shuju[this.index].duration * 1000);
        return ab;
    };


};