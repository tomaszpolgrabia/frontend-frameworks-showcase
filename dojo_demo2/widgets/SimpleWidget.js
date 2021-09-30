define([
  'dojo/_base/declare',
  'dojo/dom-construct',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dojo/text!widgets/SimpleWidget.html'
], function(declare, domConstruct, _WidgetBase, _TemplatedMixin, template) {
  return declare([_WidgetBase, _TemplatedMixin], {
    templateString: template,

    constructor: function(props) {
       this._idx = 0;
    },

    postCreate: function() {
      this.inherited(arguments);
    },

    clickMeHandle: function() {
      console.log('Click me handle');

      var item = domConstruct.create('div', { innerHTML: this._idx++ });
      domConstruct.place(item, this.point, 'only');
    }
  });
});