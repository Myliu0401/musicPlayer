import {
    initobj,
    obj
} from './index.js';


/**
 * 处理进度条
 */
export default class progress {
    constructor(ai) {
        this.dian = document.querySelector('.progress .middle .dian'); //进度条上的小点
        this.du = document.querySelector('.progress .middle .du'); //进度条
        this.tiao = document.querySelector('.progress .middle .tiao');
        this.left = this.tiao.getBoundingClientRect(); //进度条距离 body 的 left 值
        this.zhongshijian = ai;
        this.misi;
        this.ao;
        this.id = null; //计时器id
    };

    //计时器
    jishiqi(ap) {
        clearInterval(this.id);
        this.misi = new Date().getTime(); //时间戳 毫秒
        const This = this;
        this.id = setInterval(function () { //计时器

            This.naisi = new Date().getTime(); //时间戳 毫秒

            var tiem = ((This.naisi - This.misi) / (This.zhongshijian * 1000)) + ap; //进行换算处理
            if (tiem > 0 && tiem <= 1) { //歌曲未结束
                This.tuijin(tiem); //设置时间
                This.jindutiao(tiem)
            } else { //歌曲结束
                This.qinchu(This.id); //清除计时器
                obj.qinchu();  //停止唱片旋转
            };
        }, 60);

    };


    //清除计时器
    qinchu() {
        clearInterval(this.id);
    };


    //设置时间
    tuijin(pre) {
        initobj.left.innerText = initobj.chuli(Math.round(pre * this.zhongshijian));
    };


    //设置进度条
    jindutiao(pre) {
        var a = (pre * 100) + '%';
        this.du.style.width = a; //进度条
        

        //进度条上的点做特殊处理
        var b = ((pre * 100) - 5) + '%';
        this.dian.style.left = b;

    };



};