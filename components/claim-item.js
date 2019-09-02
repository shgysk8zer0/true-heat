customElements.define('claim-item', class ClaimItemElement extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: 'open'});

		fetch(new URL('claim-item.html', import.meta.url)).then(async resp => {
			const parser = new DOMParser();
			const html = await resp.text();
			const doc = parser.parseFromString(html, 'text/html');
			doc.querySelector('.edit-btn-container').addEventListener('click', () => this.edit());
			const frag = document.createDocumentFragment();
			frag.append(...doc.head.children, ...doc.body.children);
			frag.querySelector('[name="status"]').addEventListener('change', event => {
				this.shadowRoot.getElementById('container').dataset.status = event.target.value;
				this.dataset.status = event.target.value;
			}, {
				passive: true,
			});
			this.shadowRoot.append(frag);
			this.dispatchEvent(new Event('ready'));
		});
	}

	get ready() {
		return new Promise(resolve => {
			if (this.shadowRoot instanceof ShadowRoot && this.shadowRoot.childElementCount !== 0) {
				resolve();
			} else {
				this.addEventListener('ready', () => resolve(), {once: true});
			}
		});
	}

	get uuid() {
		return this.getAttribute('uuid');
	}

	set uuid(uuid) {
		this.setAttribute('uuid', uuid);
	}

	set customer(val) {
		const el = document.createElement('span');
		el.slot = 'customer';
		el.textContent = val;
		this.append(el);
	}

	set date(val) {
		if (! (val instanceof Date)) {
			val = new Date(val);
		}
		const el = document.createElement('time');
		el.slot = 'date';
		el.textContent = val.toLocaleDateString();
		el.dateTime = val.toISOString();
		this.append(el);
	}

	set status(val) {
		this.shadowRoot.getElementById('container').dataset.status = val;
		this.shadowRoot.querySelector('[name="status"]').value = val;
	}

	get status() {
		return this.shadowRoot.querySelector('[name="status"]').value;
	}

	view() {
		location.hash = `#claim/${this.uuid}`;
	}

	edit() {
		location.hash = `#claim/${this.uuid}/edit`;
	}
});

