function createToTop() {

    var img = createImg();
    var duration = 1000;
    function createImg() {
        var img = document.createElement("img");
        img.src = "./img/huojian.svg";
        document.body.appendChild(img);
        img.style.width = "70px";
        img.style.cursor = "pointer";
        img.style.position = "fixed";
        img.style.right = "0";
        img.style.bottom = "-100px";
        img.style.transition = ".3s";
        requestAnimationFrame(function () {
            img.style.bottom = "20px"
        })
        img.onclick = function () {
            toScrollTop(0, {
                duration,
                onStart: function (start) {
                    beginAnimation(function () {
                        start();
                    });
                },
                onEnd: endAnimation
            });
        }
        return img;
    }

    function beginAnimation(callback) {
        img.style.transition = ".3s";
        img.style.transformOrigin = "center bottom";
        img.style.transform = "scale(1.2, .7)";
        function listener() {
            img.removeEventListener("transitionend", listener);
            img.style.transition = duration + "ms";
            img.style.bottom = "100%";
            img.style.transform = "scale(1)";
            callback();
        }
        img.addEventListener("transitionend", listener);
    }

    function endAnimation() {
        document.body.removeChild(img);
        img = createImg();
    }
}