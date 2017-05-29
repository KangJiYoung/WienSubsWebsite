
$(document).ready(function () {

    var width = $(".place").width();
    $(".place").height(width / 79 * 106);
    $(".score").each(function () {
        $(this).find("span").css("font-size", "100%");
        if ($(this).height() < $(".place").height() * 0.8) {
            return;
        }
        var newFontSizePerc = 80;
        while ($(this).height() > $(".place").height() * 0.8) {
            $(this).find("span").css("font-size", newFontSizePerc + "%");
            newFontSizePerc - 10;
            if (newFontSizePerc == 30)
                break;
        }
    });

    var slideShow = $(".slideshow");
    var currentWidth = $(slideShow).width();
    var resizedHeight = currentWidth / 16 * 9;
    $(slideShow).height(resizedHeight);

    $(".show-top-10").click(function () {
        var targetToShow = $(this).attr("data-target");
        $(targetToShow).toggleClass("show");
        if ($(targetToShow).hasClass("show")) {
            $(this).find("i").removeClass("fa-angle-double-down");
            $(this).find("i").addClass("fa-angle-double-up");
        } else {
            $(this).find("i").addClass("fa-angle-double-down");
            $(this).find("i").removeClass("fa-angle-double-up");
        }
    })
});

$(function () {

    updateFbLikeBox();
    // Slideshow Commands
    $(".next-slide").click(function () {
        var currentSlide = $(".anime-recom .slides .active");
        var slideIndex = $(currentSlide).attr("data-index");
        var nextSlideIndex;

        if (slideIndex == 4)
            nextSlideIndex = 1;
        else
            nextSlideIndex = parseInt(slideIndex) + 1;

        makeSlideActive(nextSlideIndex);
    })

    $(".prev-slide").click(function () {
        var currentSlide = $(".anime-recom .slides .active");
        var slideIndex = $(currentSlide).attr("data-index");
        var nextSlideIndex;

        if (slideIndex == 1)
            nextSlideIndex = 4;
        else
            nextSlideIndex = parseInt(slideIndex) - 1;

        makeSlideActive(nextSlideIndex);
    })

    function makeSlideActive(slideIndex) {
        var slideToShow = $('.anime-recom .slides .slide[data-index="' + slideIndex + '"]');
        $(".anime-recom .slides .active").removeClass("active");
        $(slideToShow).addClass("active");
    }



    $(window).resize(function () {
        var slideShow = $(".slideshow");
        var currentWidth = $(slideShow).width();
        var resizedHeight = currentWidth / 16 * 9;
        $(slideShow).height(resizedHeight);

        var width = $(".place").width();
        $(".place").height(width / 79 * 106);

        $(".score").each(function () {
            $(this).find("span").css("font-size", "100%");
            if ($(this).height() > $(".place").height() * 0.8) {
                $(this).find("span").css("font-size", "70%");
                return;
            }
        });

        updateFbLikeBox();
    })

    $(".more-genre-btn").click(function () {
        var moreGenre = $(".more-genre");
        if (moreGenre.css("display") == "none") {
            $(".more-genre").css("display", "inline");
            $(this).removeClass("fa-angle-double-down");
            $(this).addClass("fa-angle-double-up");
        } else {
            $(".more-genre").css("display", "none");
            $(this).removeClass("fa-angle-double-up");
            $(this).addClass("fa-angle-double-down");
        }
    });

    $(".show-chat").click(function () {
        var chat = $(".chat");
        if (!chat.hasClass("chat-showed")) {
            $(chat).addClass("chat-showed");
            $(this).find("i").removeClass("fa-angle-double-up");
            $(this).find("i").addClass("fa-angle-double-down");
        } else {
            $(chat).removeClass("chat-showed");
            $(this).find("i").removeClass("fa-angle-double-down");
            $(this).find("i").addClass("fa-angle-double-up");
        }
    });

    $(".show-disclaimer").click(function () {
        $(".disclaimer").toggleClass("show-disc");
    })
})

function updateFbLikeBox() {
    var likeBox = $("#facebook-like-box");
    var likeBoxContainer = $(".fb-like-box-container");
    var containerWidthInt = parseInt($(likeBoxContainer).width());
    if (containerWidthInt > 500)
        containerWidthInt = 500;
    $(likeBox).attr("src", srcFacebookFormat(containerWidthInt, $(likeBox).height()));
    $(likeBox).attr("width", containerWidthInt);
}

function srcFacebookFormat(width, height) {
    return "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fwiensub%2F&tabs&width=" + width + "&height=" + height + "&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=531637330233211";
}
