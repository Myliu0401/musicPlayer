import {
    pro1
} from './ButtonFunction.js';
import {
    obj
} from './index.js';
import {
    initobj,
} from './index.js';

/**
 *  拖拽进度条  和 点击进度条
 */
export default class Dad {
    constructor() {
        this.dian = pro1.dian; //进度条上的点
        this.du = pro1.du; //进度条 “会动”
        this.tiao = pro1.tiao; //进度条
        this.left; //进度条上小点的距离
        this.jl; //开始点击,小点的距离
    };

    //拖拽小点
    xiaodian() {
        const This = this;
        this.dian.addEventListener('touchstart', function (e) { //手指按下
            var xinxi = This.tiao.getBoundingClientRect();
            var lt = xinxi.left;
            var width = xinxi.width;
            this.addEventListener('touchmove', function (e) { //手指滑动
                This.left = e.changedTouches[0].clientX;
                This.jl = (This.left - lt) / width; //范围
                if (This.jl > 0 && This.jl <= 1) { //范围
                    pro1.jindutiao(This.jl); //设置进度条
                    pro1.tuijin(This.jl); //设置时间
                    obj.suspend(false); //停止播放
                };
            });

            this.addEventListener('touchend', function () { //手指抬起
                if (This.jl > 0 && This.jl <= 1) {
                    obj.jindu(obj.fuzhu(initobj.left.innerText)); //设置歌曲进度
                    obj.play(); //播放   
                    obj.functionarr[2].className = 'Select'; //设置中间播放按钮类名
                };
            });
        });
    };


    //进度条点击功能
    dianji() {
        const This = this;
        this.tiao.addEventListener('touchend', function (e) {
            var left = e.changedTouches[0].clientX;
            var xinxi = This.tiao.getBoundingClientRect();
            var lt = xinxi.left;
            var width = xinxi.width;
            var a = (left - lt) / width;
            pro1.jindutiao(a); //设置进度条
            pro1.tuijin(a);
            obj.jindu(obj.fuzhu(initobj.left.innerText)); //设置歌曲进度
            obj.play();
            obj.functionarr[2].className = 'Select';
        });
    };

};