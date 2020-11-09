var totopImg = document.querySelector(".totop");

totopImg.onclick = function () {
    scroll(0, {
        onStart: function (start) {
            totopImg.style.transition = ".2s";
            totopImg.style.transform = "scale(1.5, 0.5)";
            var handler = function () { //事件处理函数
                start();
                //移除事件
                totopImg.removeEventListener("transitionend", handler);
                totopImg.style.transition = "1s";
                totopImg.style.transform = "scale(1)";
                totopImg.style.bottom = window.innerHeight + 100 + "px";

            };
            totopImg.addEventListener("transitionend", handler)

        },
        onEnd: function () {
            totopImg.style.transition = "none";
            //图片回来吧
            totopImg.style.bottom = "-100px";

            setTimeout(function () {
                totopImg.style.transition = ".3s";
                //图片回来吧
                totopImg.style.bottom = "30px";
            }, 30);

        }
    })
}