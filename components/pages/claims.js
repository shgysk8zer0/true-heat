import Router from '/js/Router.js';
import {ENDPOINT} from '/js/consts.js';
import {userCan, getToken, loggedIn} from '/js/functions.js';
import '../claim-item.js';
import './claim.js';

class ClaimsPage extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: 'open'});

		fetch(new URL('claims.html', import.meta.url)).then(async resp => {
			const parser = new DOMParser();
			const html = await resp.text();
			const doc = parser.parseFromString(html, 'text/html');
			const frag = document.createDocumentFragment();
			frag.append(...doc.head.children, ...doc.body.children);
			const btns = frag.querySelectorAll('[data-filter-status]');

			btns.forEach(btn => {
				btn.addEventListener('click', ({target}) => {
					const btn = target.closest('[data-filter-status]');
					btns.forEach(button => button.disabled = button === btn);
					this.shadowRoot.querySelector('main').dataset.filter = btn.dataset.filterStatus;
				});
			});

			let items = await ClaimsPage.items || [];

			if (location.hash.startsWith('#my-claims')) {
				const user = localStorage.getItem('identifier');
				items = items.filter(item => item.assigned.identifier === user);
			}

			await customElements.whenDefined('claim-item');
			const ClaimItem = customElements.get('claim-item');
			const els = await Promise.all(items.map(async item => {
				const el = new ClaimItem();
				console.dir(item);
				await el.ready;
				el.uuid = item.uuid;
				el.customer = item.customer.name;
				el.status = item.status;
				el.assigned = item.assigned.name;
				el.date = item.created;
				el.slot = 'claim';
				return el;
			}));

			this.shadowRoot.append(frag);
			this.append(...els);
		}).catch(console.error);
	}

	get claims() {
		const slot = this.shadowRoot.querySelector('slot[name="claim"]');
		return slot.assignedElements();
	}

	static get items() {
		return new Promise(async (resolve, reject) => {
			const url = new URL('./Claim/', ENDPOINT);
			url.searchParams.set('token', getToken());

			const resp = await fetch(url);
			if (resp.ok) {
				const items = await resp.json();
				resolve(items.map(item => {
					item.opened = new Date(item.opened);
					return item;
				}));
			} else {
				reject(new Error(`${resp.url} [${resp.status} ${resp.statusText}]`));
			}
		});
	}
}

customElements.define('claims-page', ClaimsPage);

Router.setRoute('claims', async uuid => {
	if (! userCan('listClaims')) {
		location.href = '#my-claims';
	} else if (loggedIn()) {
		const el = new ClaimsPage(uuid);
		console.log(uuid);
		const app = document.body;
		[...app.children].forEach(el => el.remove());
		app.append(el);
	} else {
		location.hash = '#login';
	}
});

Router.setRoute('my-claims', async uuid => {
	if (loggedIn()) {
		const el = new ClaimsPage(uuid);
		console.log(uuid);
		const app = document.body;
		[...app.children].forEach(el => el.remove());
		app.append(el);
	} else {
		location.href = '#login';
	}
});
