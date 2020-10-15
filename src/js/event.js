import Button from './ButtonFunction.js';
import {
    initobj
} from './index.js';



/**
 * 注册事件
 */
export default function event(data) {
    const data1 = data; //初始化对象
    this.obj = new Button(data1);
    const This = this;
    Array.from(this.obj.functionarr).forEach(function (ele, index) { //循环函数
        if (index === 1 || index === 3) { //注册上下首按钮事件
            ele.addEventListener('touchend', function () {
                console.log('开始')
                index === 1 ? This.obj.Lastsong() : This.obj.Nextsong(); //判断,执行上或下一首
                This.obj.functionarr[2].className = 'Select';
                This.obj.play(true); //播放,参数为true在 播放这个函数里面会做处理

            })
        } else if (index === 2) { //注册暂停/播放按钮事件
            ele.addEventListener('touchend', function () {
                if (this.classList.contains('Select')) { //为播放状态,按下进入暂停状态
                    This.obj.suspend(); //暂停
                    this.className = ''; //移除类名
                } else { //为暂停状态,按下进入播放状态
                    This.obj.play(); //播放
                    this.className = 'Select'; //给类名 表示选中

                }
            })
        } else if (index === 4) { //注册列表按钮事件
            ele.addEventListener('touchend', function () {
                This.obj.liebiao(); //列表弹出
            });
        };

    });

    this.obj.mi.addEventListener('touchend', function () { //注册关闭按钮事件
        This.obj.liebiao(This.obj.list.offsetHeight); //列表收起
    });


    //列表里面每一项,添加事件
    Array.from(this.obj.listarr).forEach(function (ele, index) {
        if (index >= 1) { //播放列表这个不能点击
            ele.addEventListener('touchend', function () {
                initobj.xuanran(data1[index - 1]); //渲染页面
                This.obj.play(true); //播放
                This.obj.liebiao(This.obj.list.offsetHeight); //列表收起
                This.obj.switch(index - 1); //列表里面,类名切换
                This.obj.functionarr[2].className = 'Select'; //给中间按钮,添加类名
            });
        };
    });

};