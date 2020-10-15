import misi from '../css/index.less';
import zjl from '../img/1.jpg';
import zms from '../img/2.jpg';
import wfzd from '../img/4.jpg';
import logo from '../img/QQ音乐.png';
import $ from 'jquery';
import init from './init.js';
import event from './event.js';
import Dad from './DragAndDrop.JS';



export let initobj; //初始化对象
export let shuju; //数据
export let index = 0; //最开始的数据项
export let pro; //进度条对象
export let dad; //拖拽对象
export let obj; //注册事件对象



$.ajax({
    url: '../assets/data.json',
    method: 'get',
    success: function (data) {
        shuju = data; //存储数据
        initobj = new init(); //获取初始化对象
        
        initobj.xuanran(data[0]); //渲染最初页面
        initobj.liebiao(data, index); //单独渲染列表

        obj = new event(data).obj; //注册时间
        dad = new Dad(); //拖拽对象
        dad.xiaodian(); // 拖拽
        dad.dianji(); //点击进度条
    },
    error: function () {
        console.log('数据请求失败');
    },
});