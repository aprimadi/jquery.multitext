/*!
 * Multitext Plugin v0.1
 *
 * Convert a text field into multiple text field
 *
 * Author: Armin Primadi
 * https://github.com/aprimadi
 */
(function ($) {

  "use strict";

  var Multitext = function (element, options) {
    this.options = $.extend({}, Multitext.DEFAULTS, options)
    this.$element = $(element)

    this.paramName = this.$element.attr('name')
    this.values = this.parseValues(this.$element, options)

    this.render()
    this.bindEvents()
  }

  Multitext.DEFAULTS = {

  }

  Multitext.prototype.parseValues = function ($element, options) {
    var raw
      , values = []

    if (options.values) {
      values = options.values
    } else if ($element.attr('data-value')) {
      raw = $element.attr('data-value')
      try {
        values = JSON.parse(raw)
      } catch (error) { }
    }
    return values
  }

  Multitext.prototype.render = function () {
    var $el
      , self = this

    // Switch element with a <DIV>
    $el = $(
      '<div>' +
        '<div class="multitext-block"></div>' +
        '<div class="multitext-tool"><a href="javascript:void(0)" class="multitext-add">Add Another</a></div>' +
        '</div>'
    )
    $el.insertAfter(this.$element)
    this.$element.remove()
    this.$element = $el

    $.each(this.values, function (index, value) {
      self.addInput(value)
    })
  }

  Multitext.prototype.addInput = function (value) {
    var $el;
    value = value || ''

    $el = $(
      '<div class="multitext-input">' +
        '<input type="text" name="'+this.paramName+'" value="'+value+'">' +
        '<a href="javascript:void(0)" class="multitext-remove"><i class="icon-trash"></i></a>' +
        '</div>'
    )
    this.$element.find('.multitext-block').append($el)
  }

  Multitext.prototype.bindEvents = function () {
    this.$element.on('click', '.multitext-remove', $.proxy(this.remove, this))
    this.$element.on('click', '.multitext-add', $.proxy(this.add, this))
  }

  Multitext.prototype.remove = function (e) {
    var $el = $(e.currentTarget).parents('.multitext-input')
    if (this.$element.find('.multitext-input').length <= 1) {
      $el.find('input').val('')
    } else {
      $el.remove()
    }
  }

  Multitext.prototype.add = function (e) {
    this.addInput()
  }


  // PLUGIN DEFINITION
  // =================

  var old = $.fn.multitext

  $.fn.multitext = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('multitext')
        , options = typeof option == 'object' && option

      if (!data) $this.data('multitext', (data = new Multitext(this, options)))
      if (typeof options == 'string') data[option]()
    })
  }


  // NO CONFLICT
  // ===========

  $.fn.multitext.noConflict = function () {
    $.fn.multitext = old
    return this
  }


})(jQuery);