/*eslint no-unused-vars: 0*/
const config = {
	version: '1.0.0-a98',
	stale: [
		'/',
		'/js/index.js',
		'/js/consts.js',
		'/js/functions.js',
		'/js/Router.js',
		'/js/current-year.js',
		'/components/pages/login.js',
		'/components/pages/login.html',
		'/components/error-message.js',
		'/components/error-message.html',
		'/components/toast-message.js',
		'/components/toast-message.html',
		'/components/claim-item.js',
		'/components/claim-item.html',
		'/components/attachment-el.js',
		'/components/attachment-el.html',
		'/components/user-el.js',
		'/components/schema.js',
		'/components/schema-person.js',
		'/components/schema-person.html',
		'/components/schema-postal-address.js',
		'/components/schema-postal-address.html',
		'/components/user-el.html',
		'/components/claim-note.js',
		'/components/claim-note.html',
		'/components/pages/claims.js',
		'/components/pages/claims.html',
		'/components/pages/claims.json',
		'/components/pages/claim.js',
		'/components/pages/claim.html',
		'/components/pages/forgot-password.js',
		'/components/pages/forgot-password.html',
		'/components/pages/register.js',
		'/components/pages/register.html',
		'/components/pages/account.js',
		'/components/pages/account.html',
		'/components/pages/users.js',
		'/components/pages/users.html',
		'/components/pages/profile.js',
		'/components/pages/profile.html',
		'/components/pages/contractors.js',
		'/components/pages/contractors.html',
		'/components/app-footer.js',
		'/components/app-footer.html',
		'/components/logout-button.js',
		'/components/logo-img.js',
		'/components/logo-img.html',
		'/components/back-button.js',
		'/js/routes.js',
		'/js/std-js/deprefixer.js',
		'/js/std-js/shims.js',
		'/js/std-js/md5.js',
		'/js/std-js/Notification.js',
		'/js/std-js/asyncDialog.js',
		'/js/std-js/webShareApi.js',
		'/js/std-js/esQuery.js',
		'/js/std-js/functions.js',
		'/css/styles/index.css',
		'/css/styles/vars.css',
		'/css/styles/layout.css',
		'/css/styles/header.css',
		'/css/styles/nav.css',
		'/css/styles/main.css',
		'/css/styles/sidebar.css',
		'/css/styles/common.css',
		'/css/styles/footer.css',
		'/css/core-css/rem.css',
		'/css/core-css/viewport.css',
		'/css/core-css/element.css',
		'/css/core-css/class-rules.css',
		'/css/core-css/utility.css',
		'/css/core-css/fonts.css',
		'/css/core-css/animations.css',
		'/css/normalize/normalize.css',
		'/css/animate.css/animate.css',
		'/img/icons.svg',
		'/img/apple-touch-icon.png',
		'/img/icon-192.png',
		'/img/favicon.svg',
		'/favicon.ico',
		'/fonts/roboto.woff2',
		'/manifest.json',
	].map(path => new URL(path, location.origin).href),
	fresh: [
		// 'https://cdn.polyfill.io/v2/polyfill.min.js?unknown=polyfill&features=es6,MutationObserver,IntersectionObserver,IntersectionObserverEntry,Object.values,Object.entries,NodeList.prototype.@@iterator,Array.prototype.@@iterator&flags=gated',
		'https://unpkg.com/@webcomponents/custom-elements@1.2.4/custom-elements.min.js',
	]
};
