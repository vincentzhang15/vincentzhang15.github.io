/*
Personal Website Project
@author Vincent Zhang
@since 28 December 2021 - 04 January 2022
*/


// Navbar background appear disappear animation.
window.onscroll = () => {
    if (this.scrollY <= 10) {
        $("#nav-bg").fadeOut(300);
    }
    else {
        $("#nav-bg").fadeIn(300);
    }

    // Improved background parallax scrolling effect instead of background-attachment:fixed;.
    // Created 3 layers of parallax effect.
    $("#home > .background").css({"transform": `translateY(${this.scrollY * 0.8}px)`});
    $("#starry-galaxy").css({"transform": `translateY(${this.scrollY * 0.7}px)`});
    $("#profile-data").css({"transform": `translateY(${this.scrollY * 0.4}px)`});
};


// Manage show hide of non-glowing elements.
$(function () {
    $(".btn-showhide").each(function (idx, btn) {
        (function () {
            // Assign each show hide button a show hide function to show hide non-glowing cards.
            btn.onclick = function () {
                var button = this;
                $(this).parent().parent().find("card-elem:not([glow])").each(function () {
                    button.innerText = $(this).is(":visible") ? "Show All" : "Hide";
                    $(this).toggle(800);
                });
            };
        })();
    });
});


// Starry galaxy homepage.
function makeStar(maxDelay) {
    var x = Math.floor(Math.random() * window.innerWidth);
    var y = Math.floor(Math.random() * window.innerHeight);
    var deg = Math.random() * 180;
    var scale = Math.random() * 0.2;
    var delay = Math.random() * maxDelay;

    var star = document.createElement("star");
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.transform = `rotate(${deg}deg) scale(${scale})`;
    star.style.animationDelay = `${delay}s`;
    
    star.addEventListener('animationend', () => {
        star.remove();
    });
    $(".background-stars").append(star);
}
function sustainStars() {
    // Make a star every 0.8 sec wtih 1s max delay.
    makeStar(1);
    setTimeout(sustainStars, 800);
}

$(function () {
    // Immediately spawn 3 stars.
    for(var i=0; i<3; i++) {
        makeStar(0);
    }
    // Spawn 3 more stars with a random delay within 2 seconds.
    for(var i=0; i<3; i++) {
        makeStar(2);
    }
    // Sustain star spawning.
    sustainStars();
})
