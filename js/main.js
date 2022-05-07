/*
Personal Website Project
@author Vincent Zhang
@since 28 December 2021 - 04 January 2022
*/

var isIdle = false

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
    if(!isIdle)
    {
        makeStar(1);
        setTimeout(sustainStars, 800);
    }
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


// https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
function handleVisibilityChange() {
    // Fixes issue when browser tab is in background, stars continuously spawn but animation does not happen so stars get cluttered and animation at once when user returns.
    if (document.visibilityState === "hidden") {
        isIdle = true;
    } else {
        isIdle = false;
        sustainStars();
    }
}
document.addEventListener("visibilitychange", handleVisibilityChange, false);


// Toggle themes with VZ homepage button.
document.addEventListener("DOMContentLoaded", function() { 
    const key = document.querySelector("#logo");
    const css = document.querySelector("#css-main");
    key.addEventListener("click", function() {

    if (css.getAttribute("href") == "css/main.css") {
        css.href = "css/colorful-theme.css";
    } else {
        css.href = "css/main.css";
    }
    });
});
