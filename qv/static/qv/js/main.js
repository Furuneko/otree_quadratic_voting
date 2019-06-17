$(function () {
    var qvBar = document.getElementById("qv-credits-bar");
    var top = qvBar.offsetTop;
    window.onscroll = function() {
        if (window.pageYOffset > top) {
            qvBar.classList.add("sticky");
        } else {
            qvBar.classList.remove("sticky");
        }
    };
});