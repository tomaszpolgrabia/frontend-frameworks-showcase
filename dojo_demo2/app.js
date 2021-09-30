require([
	'dojo/dom',
	'dojo/dom-construct',
	'widgets/SimpleWidget.js',
], function(dom, domConstruct, SimpleWidget) {
	new SimpleWidget({})
		.placeAt(
			dom.byId('appContainer'));
});