(function (app, Router) {

	'use strict';

	var router = new Router();

	['all', 'incompleted', 'completed'].forEach(function (filterFlag) {
		router.on(filterFlag, function () {
			todosApp.filterFlag = filterFlag;
		});
	});

	router.configure({
		notfound: function () {
			window.location.hash = '';
			app.filterFlag = 'all';
		}
	});

	router.init();

})(todosApp, Router);
