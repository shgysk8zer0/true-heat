customElements.define('app-footer', class AppFooterElement extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({mode: 'open'});

		fetch(new URL('app-footer.html', import.meta.url)).then(async resp => {
			const parser = new DOMParser();
			const html = await resp.text();
			const doc = parser.parseFromString(html, 'text/html');
			const frag = document.createDocumentFragment();
			frag.append(...doc.head.children, ...doc.body.children);

			try {
				const page = location.hash.split('/')[0];
				const current = frag.querySelector(`a[href="${page}"]`);
				if (current instanceof HTMLElement) {
					current.classList.add('active');
				}
			} catch(err) {
				console.error(err);
			}

			this.shadowRoot.append(frag);
		});
	}
});
