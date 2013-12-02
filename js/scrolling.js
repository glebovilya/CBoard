define(['jquery-ui-1.10.3.custom.min'],function () {
     Scrolling = function(options) {
        this.options = options || false;
        this.windowWidth = false;
        this.windowBottom = false;
        this.screen = false;
        this.screenPaddingTop = this.options.screenPaddingTop || 0;
        this.screenPosition = false;
        this.screenBottom = false;
        this.isWheel = false;
        this.wheelTimer = false;
        this.isCursor = false;
        this.scrollEnabled = true;
        this.scrollSpeed = this.options.scrollSpeed || 50;
        this.scrollbar = false;
        this.scroller = false;
    }

    Scrolling.prototype = {
        wheel: function (event) {
            if (false == !!this.scrollEnabled) return;
            var _this = this;
            this.isWheel = true;
            this.showScrollbar();
            var direction = event.detail || event.wheelDelta || false;
            if (Math.abs(direction) == 120) direction = Math.round(direction / -40);
            this.getScreenBottom();
            if (direction > 0) {
                if (this.screenBottom > 0) this.moveScreen(this.screen.offset().top - this.scrollSpeed);
                if (this.screenBottom <= 0) this.moveScreen(this.screen.offset().top + Math.abs(this.screenBottom));
            }
            else {
                if ((this.screen.offset().top + this.scrollSpeed) <= 0) this.moveScreen(this.screen.offset().top + this.scrollSpeed);
                if (this.screen.offset().top > (-1 * this.scrollSpeed)) this.moveScreen(0);
            }
            this.scroll();
            if (!!this.wheelTimer) window.clearInterval(this.wheelTimer);
            this.wheelTimer = window.setInterval(function () {
                _this.isWheel = false;
                _this.hideScrollbar();
            }, 1000);
        },
        initScrollbar: function () {
            var _this = this;
            this.scrollbar = $("#scrollbar");
            this.scroller = $("#scroller");
            this.scroller.draggable({
                axis: "y",
                containment: _this.scrollbar,
                drag: function () {
                    _this.scroll();
                }
            });
        },
        setScrollbarCursor: function (event) {
            if (false == !!this.scrollEnabled) return;
            this.getWindowWidth();
            if (event.screenX >= (this.windowWidth - 30)) {
                this.isCursor = true;
                this.showScrollbar();
            }
            else {
                this.isCursor = false;
                this.hideScrollbar();
            }
        },
        showScrollbar: function () {
            this.scrollbar.fadeIn(500);
        },
        hideScrollbar: function () {
            if ((false == !!this.isWheel) && (false == !!this.isCursor)) this.scrollbar.fadeOut(500);
        },
        scroll: function () {
            this.initScreen();
            this.getWindowBottom();
            this.getScreenBottom();
            this.getScreenPosition();
            this.windowBottom -= 6; //Костыль :(
            /* SCREEN */
            var screendata = {
                current_position: Math.abs(this.screenPosition),
                max_position: this.screen.height() - this.windowBottom + this.screenPaddingTop,
                current_percent: 0,
                visible_percent: 0
            }
            screendata.current_percent = Math.round((screendata.current_position * 100) / screendata.max_position);
            screendata.visible_percent = Math.round((this.screen.height() - screendata.max_position) * 100 / this.screen.height());
            (screendata.visible_percent >= 100) ? this.scrollEnabled = false : this.scrollEnabled = true;
            if (false == !!this.scrollEnabled) return;
            if (screendata.current_position >= screendata.max_position) {
                screendata.current_position = screendata.max_position;
                this.moveScreen(-1 * screendata.max_position);
            }
            /* SCROLLER */
            var scrollerdata = {
                height: this.scroller.height(),
                top: parseInt(this.scroller.css("top")) || 0,
                max_top: this.windowBottom - this.scroller.height() - this.screenPaddingTop,
                current_top: 0,
                percent: 0
            }
            scrollerdata.percent = Math.round((scrollerdata.top * 100) / scrollerdata.max_top);
            scrollerdata.current_top = Math.round((scrollerdata.max_top * screendata.current_percent) / 100);
            if (scrollerdata.current_top <= 0) scrollerdata.current_top = 0;
            if (scrollerdata.current_top > scrollerdata.max_top) scrollerdata.current_top = scrollerdata.max_top;
            this.scrollbar.css("height", (this.windowBottom - this.screenPaddingTop) + "px");
            this.scroller.css("height", screendata.visible_percent + "%");
            this.scroller.css("top", scrollerdata.current_top + "px");
            if (false == !!this.isWheel) this.moveScreen(-1 * Math.round((screendata.max_position * scrollerdata.percent) / 100));
        },
        initScreen: function () {
            this.screen = $(".screen");
        },
        moveScreen: function (top) {
            this.screen.css("top", top + "px");
        },
        getScreenPosition: function () {
            this.screenPosition = this.screen.offset().top;
        },
        getScreenBottom: function () {
            this.getWindowBottom();
            this.getScreenPosition();
            this.screenBottom = this.screen.height() + this.screenPosition - this.windowBottom + this.screenPaddingTop;
        },
        getWindowWidth: function () {
            this.windowWidth = $(window).width();
        },
        getWindowBottom: function () {
            this.windowBottom = $(window).height();
        }
    }
    return Scrolling;
});