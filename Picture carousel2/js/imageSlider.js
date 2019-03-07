/**
 * Created by Administrator on 2019/1/19 0019.
 */
//获取imagePar 拿到里面子集div
var imagePar = document.getElementsByClassName("imagePar")[0];
var divChild = imagePar.children;
var time;
//先存储第一张的相关样式属性
ImageSlider();
function ImageSlider() {
    time = setInterval(function () {
        imageAnimate("left", 0);
    }, 1500);
}
function imageAnimate(dec, cindex) {
    var firstPage = {
        left: window.getComputedStyle(divChild[cindex]).left,
        top: window.getComputedStyle(divChild[cindex]).top,
        zIndex: window.getComputedStyle(divChild[cindex]).zIndex
    };
    if (dec == "left") {
        for (var i = 0; i < divChild.length; i++) {
            if (i == divChild.length - 1) {
                divChild[i].style.left = firstPage.left;
                divChild[i].style.top = firstPage.top;
                divChild[i].style.zIndex = firstPage.zIndex;
            }
            else {
                divChild[i].style.left = window.getComputedStyle(divChild[i + 1]).left;
                divChild[i].style.top = window.getComputedStyle(divChild[i + 1]).top;
                divChild[i].style.zIndex = window.getComputedStyle(divChild[i + 1]).zIndex;
            }
        }
    }
    else {
        for (var i = divChild.length - 1; i >= 0; i--) {
            if (i == 0) {
                divChild[i].style.left = firstPage.left;
                divChild[i].style.top = firstPage.top;
                divChild[i].style.zIndex = firstPage.zIndex;
            }
            else {
                divChild[i].style.left = window.getComputedStyle(divChild[i - 1]).left;
                divChild[i].style.top = window.getComputedStyle(divChild[i - 1]).top;
                divChild[i].style.zIndex = window.getComputedStyle(divChild[i - 1]).zIndex;
            }
        }
    }
    firstPage = null;
}
//windows窗口失去焦点
window.onblur = function () {
    clearInterval(time);
}
window.onfocus = function () {
    ImageSlider();
}
var block = document.getElementsByClassName("block")[0];
var btn = document.getElementsByClassName("btn")[0];
block.onmouseenter = function () {
    clearInterval(time);
    for (var i = 0; i < btn.children.length; i++) {
        btn.children[i].className = i ? "marright" : "marleft";
    }
}
block.onmouseleave = function () {
    ImageSlider();
    for (var i = 0; i < btn.children.length; i++) {
        btn.children[i].className = "";
    }
}
document.onselectstart = function () {
    return false;
}
//点击左右按钮
btn.children[0].onclick = function (e) {
    if (e.detail == 1) {
        imageAnimate("left", 0);
    }
}
btn.children[1].onclick = function (e) {
    if (e.detail == 1) {
        imageAnimate("right", divChild.length - 1);
    }
}