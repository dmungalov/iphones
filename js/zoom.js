+ function(t) {
    "use strict";

    function o() {
        this._activeZoom = this._initialScrollPosition = this._initialTouchPosition = this._touchMoveListener = null,
        this._$document = t(document),
        this._$window = t(window),
        this._$body = t(document.body)
    }

    function i(o) {
        this._fullHeight = this._fullWidth = this._overlay = this._targetImageWrap = null,
        this._targetImage = o,
        this._$body = t(document.body)
    }
    o.prototype.listen = function() {
        this._$body.on("click", '[data-action="zoom"]', t.proxy(this._zoom, this))
    };
    o.prototype._zoom = function(o) {
        var e = o.target;
        !e || "IMG" != e.tagName || e.width >= window.innerWidth - i.OFFSET || (this._activeZoomClose(!0), this._activeZoom = new i(e), this._activeZoom.zoomImage(), this._$window.on("scroll.zoom", t.proxy(this._scrollHandler, this)), this._$document.on("click.zoom", t.proxy(this._clickHandler, this)), this._$document.on("keyup.zoom", t.proxy(this._keyHandler, this)), this._$document.on("touchstart.zoom", t.proxy(this._touchStart, this)), o.stopPropagation())
    };
    o.prototype._activeZoomClose = function(t) {
        this._activeZoom && (t ? this._activeZoom.dispose() : this._activeZoom.close(), this._$window.off(".zoom"), this._$document.off(".zoom"), this._activeZoom = null)
    }, o.prototype._scrollHandler = function(t) {
        null === this._initialScrollPosition && (this._initialScrollPosition = window.scrollY);
        var o = this._initialScrollPosition - window.scrollY;
        Math.abs(o) >= 40 && this._activeZoomClose()
    }, o.prototype._keyHandler = function(t) {
        27 == t.keyCode && this._activeZoomClose()
    }, o.prototype._clickHandler = function(t) {
        t.stopPropagation(), t.preventDefault(), this._activeZoomClose()
    }, o.prototype._touchStart = function(o) {
        this._initialTouchPosition = o.touches[0].pageY, t(o.target).on("touchmove.zoom", t.proxy(this._touchMove, this))
    }, o.prototype._touchMove = function(o) {
        Math.abs(o.touches[0].pageY - this._initialTouchPosition) > 10 && (this._activeZoomClose(), t(o.target).off("touchmove.zoom"))
    }, i.OFFSET = 80, i._MAX_WIDTH = 2560, i._MAX_HEIGHT = 4096, i.prototype.zoomImage = function() {
        var o = document.createElement("img");
        o.onload = t.proxy(function() {
            this._fullHeight = Number(o.height), this._fullWidth = Number(o.width), this._zoomOriginal()
        }, this), o.src = this._targetImage.src
    }, i.prototype._zoomOriginal = function() {
        this._targetImageWrap = document.createElement("div"), this._targetImageWrap.className = "zoom-img-wrap", this._targetImage.parentNode.insertBefore(this._targetImageWrap, this._targetImage), this._targetImageWrap.appendChild(this._targetImage), t(this._targetImage).addClass("zoom-img").attr("data-action", "zoom-out"), this._overlay = document.createElement("div"), this._overlay.className = "zoom-overlay", document.body.appendChild(this._overlay), this._calculateZoom(), this._triggerAnimation()
    }, i.prototype._calculateZoom = function() {
        this._targetImage.offsetWidth;
        var t = this._fullWidth,
            o = this._fullHeight,
            e = (window.scrollY, t / this._targetImage.width),
            a = window.innerHeight - i.OFFSET,
            s = window.innerWidth - i.OFFSET,
            r = t / o,
            n = s / a;
        this._imgScaleFactor = s > t && a > o ? e : n > r ? a / o * e : s / t * e
    }, i.prototype._triggerAnimation = function() {
        this._targetImage.offsetWidth;
        var o = t(this._targetImage).offset(),
            i = window.scrollY,
            e = i + window.innerHeight / 2,
            a = window.innerWidth / 2,
            s = o.top + this._targetImage.height / 2,
            r = o.left + this._targetImage.width / 2;
        this._translateY = e - s, this._translateX = a - r, t(this._targetImage).css("transform", "scale(" + this._imgScaleFactor + ")"), t(this._targetImageWrap).css("transform", "translate(" + this._translateX + "px, " + this._translateY + "px) translateZ(0)"), this._$body.addClass("zoom-overlay-open")
    }, i.prototype.close = function() {
        this._$body.removeClass("zoom-overlay-open").addClass("zoom-overlay-transitioning"), t(this._targetImage).css("transform", ""), t(this._targetImageWrap).css("transform", ""), t(this._targetImage).one(t.support.transition.end, t.proxy(this.dispose, this)).emulateTransitionEnd(300)
    }, i.prototype.dispose = function() {
        this._targetImageWrap && this._targetImageWrap.parentNode && (t(this._targetImage).removeClass("zoom-img").attr("data-action", "zoom"), this._targetImageWrap.parentNode.replaceChild(this._targetImage, this._targetImageWrap), this._overlay.parentNode.removeChild(this._overlay), this._$body.removeClass("zoom-overlay-transitioning"))
    }, (new o).listen()
}(jQuery);
