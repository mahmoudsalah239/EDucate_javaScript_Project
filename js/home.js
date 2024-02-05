
let up_btn = document.getElementById("up_btn");

function handle_scrolling() {
    if (window.scrollY > 300) {
        up_btn.style.display = "block";
    }
    else {
        up_btn.style.display = "none";
    }
}

window.onscroll = handle_scrolling;

// up_btn.addEventListener("click", )

$(".carousel").carousel({
    interval: 2000
});
