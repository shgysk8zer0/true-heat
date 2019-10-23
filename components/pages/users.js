import Router from '/js/Router.js';
import '../user-el.js';
import {ENDPOINT} from '/js/consts.js';
import {$} from '/js/std-js/functions.js';
import {alert} from '/js/std-js/asyncDialog.js';
import {getRoles, userCan, loggedIn, getToken} from '/js/functions.js';

class UsersPage extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: 'open'});


		fetch(new URL('users.html', import.meta.url)).then(async resp => {
			const parser = new DOMParser();
			const html = await resp.text();
			const doc = parser.parseFromString(html, 'text/html');
			[...doc.body.children].forEach(el => el.classList.toggle('no-dialog', document.createElement('dialog') instanceof HTMLUnknownElement));
			const frag = document.createDocumentFragment();
			frag.append(...doc.head.children, ...doc.body.children);

			[...frag.querySelectorAll('[data-perms]')].forEach(el => {
				const perms = el.dataset.perms.split(' ').map(p => p.trim());
				el.hidden = ! userCan(...perms);
			});

			const roles = await getRoles();
			const roleOpts = roles.reduce((frag, role) => {
				const opt = document.createElement('option');
				opt.value = role.id;
				opt.textContent = role.name;
				frag.append(opt);
				return frag;
			}, document.createDocumentFragment());

			$('[data-show-modal]', frag).click(event => {
				const target = event.target.closest('[data-show-modal]');
				$(target.dataset.showModal, this.shadowRoot).showModal();
			}, {
				passive: true,
			});


			$('.roles-select', frag).append(roleOpts);
			$('[name="token"]', frag).attr({value: getToken()});

			$('form[name="createUser"]', frag).submit(async event => {
				event.preventDefault();
				const target = event.target;
				const resp = await fetch(new URL('/users/', ENDPOINT), {
					method: 'POST',
					mode: 'cors',
					body: new FormData(target),
					headers: new Headers({
						Accept: 'application/json',
					}),
				});

				if (resp.ok) {
					target.reset();
					await alert('New user created');
				} else {
					throw new Error(`${resp.url} ${resp.status} ${resp.statusText}`);
				}
			});

			$('form[name="createUser"]', frag).reset(async event => {
				event.target.closest('dialog').close();
			});

			this.shadowRoot.append(frag);
			const url = new URL('users/', ENDPOINT);
			url.searchParams.set('token', getToken());
			const userResp = await fetch(url, {mode: 'cors'});
			const users = await userResp.json();
			const list = this.shadowRoot.querySelector('ul');
			if (Array.isArray(users)) {
				await customElements.whenDefined('user-el');
				const HTMLUserElement = customElements.get('user-el');
				users.forEach(user => {
					const li = document.createElement('li');
					const el = new HTMLUserElement();
					el.uuid = user.uuid;
					el.set('name', user.person.name);
					el.role = user.role;
					el.telephone = user.person.telephone;
					el.email = user.person.email;
					if  (typeof user.person.image.url === 'string') {
						el.image = user.person.image.url;
					}
					li.append(el);
					list.append(li);
				});
			}
			console.log(users);
		});
	}
}

customElements.define('user-pages', UsersPage);

Router.setRoute('users', async (...args) => {
	if (loggedIn()) {
		const el = new UsersPage(...args);
		const app = document.body;
		[...app.children].forEach(el => el.remove());
		app.append(el);
	} else {
		location.href = '#login';
	}
});
