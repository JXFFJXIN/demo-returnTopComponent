/**
 * 将某个元素的滚动高度设置到某个位置
 */
function toScrollTop(scrollTop, options = {}) {
    //默认配置
    var defaultOptions = {
        dom: document.documentElement, //发生滚动的元素
        duration: 1000, //滚动总时间
        tick: 16, //运动的间隔时间
        onStart: null, //开始时的回调函数
        onEnd: null, //结束时的回调函数
    }
    options = Object.assign(defaultOptions, options);
    startScroll();
    /**
     * 开始滚动
     */
    function startScroll() {
        var dom = options.dom;
        if (dom.isScrolling) {
            return;
        }
        if (options.onStart) {
            options.onStart(start);
        }
        else{
            start();
        }

        function start() {
            var disTotal = scrollTop - dom.scrollTop;//滚动的位移
            var times = Math.ceil(options.duration / options.tick); //运动的次数
            var disPiece = disTotal / times; //每次运动的位移
            var cur = 0; //当前运动的次数
            dom.isScrolling = true;
            var timer = setInterval(function () {
                dom.scrollTop += disPiece;
                cur++;
                if (cur === times) {
                    clearInterval(timer);
                    dom.isScrolling = false;
                    if(options.onEnd){
                        options.onEnd();
                    }
                }
            }, options.tick);
        }

    }
}