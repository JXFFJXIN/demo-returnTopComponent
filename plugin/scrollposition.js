/**
 * 将某个元素的滚动条，设置到某个位置
 * @param options 配置对象
 */
function scroll(scrollTop, options = {}) {
    var defaultOptions = {
        dom: document.documentElement, //滚动的元素
        duration: 1000, //总时长
        tick: 16, // 多少毫秒变化一次
        onStart: undefined, //开始的回调函数
        onEnd: undefined//结束的回调函数
    }
    //混合 defaultOptions 和 options
    options = Object.assign(defaultOptions, options);

    //开始滚动
    startScroll();

    /**
     * 开始滚动
     */
    function startScroll() {
        //判断当前这个元素，是否正在滚动
        if (options.dom.isScrolling) {
            return;
        }
        if (options.onStart) {
            options.onStart(start);
        }
        else{
            start();
        }

        function start() {
            // 每次变化的量 = 总量 / 次数
            //1. 总量 = 目标 - 当前
            var total = scrollTop - options.dom.scrollTop;
            //2. 次数
            var times = Math.ceil(options.duration / options.tick);
            //3. 每次变化的量
            var dis = total / times;
            //记录当前的次数
            var curTimes = 0;
            //开始滚动
            options.dom.isScrolling = true; //是否正在滚动
            var timer = setInterval(function () {
                options.dom.scrollTop += dis;
                curTimes++;
                if (curTimes === times) {
                    clearInterval(timer);
                    options.dom.isScrolling = false;
                    if (options.onEnd) {
                        options.onEnd();
                    }
                }
            }, options.tick);
        }
    }
}