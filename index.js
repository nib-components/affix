function Affix(el, options) {
  _.bindAll(this, '_onWindowScroll');
  this._onWindowScroll = _.throttle(this._onWindowScroll, 50);
  this.el = $(el);
  this.scrollPoint = this.el.offset().top;
  this.isFixed = false;
  this.window = $(window);
  this.window.on('scroll', this._onWindowScroll);
}

Affix.prototype.remove = function(){
  this.window.off('scroll', this._onWindowScroll);
};

Affix.prototype._onWindowScroll = function(event){
  var scrollY = $(window).scrollTop();

  if( scrollY >= this.scrollPoint && this.isFixed === false ) {
    this.el.addClass('is-fixed');
    this.isFixed = true;
  }
  else if( scrollY < this.scrollPoint && this.isFixed === true ) {
    this.el.removeClass('is-fixed');
    this.isFixed = false;
  }
};

Affix.create = function(selector, options) {
  $(selector).each(function(){
    return new Affix(this, options);
  });
};

module.exports = Affix;