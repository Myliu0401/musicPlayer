//处理照片模糊函数
import Gaussian from './Gaussian.js';

import {
    shuju,
    obj,
} from './index.js';


export let audio; //导出歌曲

/**
 *  初始化
 */
export default class init {
    constructor() {
        audio = this.audio = document.createElement('audio');
        this.music = document.querySelector('#music');
        this.img = document.querySelector('.picture img');
        this.h2 = document.querySelector('.information h2');
        this.c1 = document.querySelector('.information .c1');
        this.c2 = document.querySelector('.information .c2');
        this.left = document.querySelector('.progress .left');
        this.right = document.querySelector('.progress .right');
        this.function = document.querySelector('.function');
        this.shuju = shuju;
    };

    //音乐
    yinyue(data) {
        console.log(data, '来', this.audio)
        this.audio.src = data.audio;
        this.audio.load();
        this.jieshu(function () { //歌曲播放结束时会执行这个函数 
            obj.Nextsong(); //下一首
            obj.play(true); //播放
            console.log('结束')
        });
    };


    //播放结束
    jieshu(fun) {
        this.audio.onended = fun;
    };


    //照片模糊 和 添加图片
    mohu(data) {
        this.img.src = data.image;
        var dom = document.createElement('img');
        dom.src = data.image
        this.img.onload = function () {
            Gaussian(dom);
        }
    };


    //信息  歌名 等
    information(data) {
        this.h2.innerText = data.song;
        this.c1.innerText = data.album;
        this.c2.innerText = data.singer;
    };


    //进度条时间
    progressBarTime(data) {
        this.right.innerText = this.chuli(data.duration);

    };


    //辅助时间的处理
    chuli(tiem) {
        var m = Math.floor(tiem / 60); //分
        var s = tiem % 60; //秒
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return m + ':' + s;
    };

    //是否喜欢
    xihuan(data) {
        this.function.children[0].className = data.isLike ? 'Select' : '';
    };


    //渲染列表 
    liebiao(data, i) { //此函数只执行一次,所以内容定死
        var div = document.createElement('div');
        var dl = document.createElement('dl');
        var dt = document.createElement('dt');
        var div1 = document.createElement('div');
        div.className = 'list'
        div1.className = 'close';
        dt.innerText = '播放列表';
        div1.innerText = '关闭';
        dl.appendChild(dt)
        div.appendChild(dl);
        data.forEach(function (ele, index) {
            var dd = document.createElement('dd');
            dd.innerText = ele.song;
            index === i ? dd.className = 'Select' : '';
            dl.appendChild(dd);
        });
        div.appendChild(div1)
        this.music.appendChild(div);
    };


    //渲染
    xuanran(data, index) {
        this.mohu(data);
        this.information(data);
        this.progressBarTime(data);
        this.xihuan(data);
        this.yinyue(data);
    };

};