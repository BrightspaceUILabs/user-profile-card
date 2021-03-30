const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe('d2l-labs-user-profile-card', () => {

	const visualDiff = new VisualDiff('user-profile-card', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await visualDiff.createPage(browser, { viewport: { width: 900, height: 1500 } });
		await page.goto(`${visualDiff.getBaseUrl()}/test/user-profile-card.visual-diff.html`, { waitUntil: ['networkidle0', 'load'] });
		await page.bringToFront();
	});

	beforeEach(async() => {
		await visualDiff.resetFocus(page);
	});

	after(async() => await browser.close());

	async function open(page, selector) {
		const openEvent = page.$eval(selector, (elem) => {
			const listener = new Promise((resolve) => {
				elem.addEventListener('d2l-labs-user-profile-card-opened', resolve, { once: true });
			});
			elem.open();
			return listener;
		});
		return openEvent;
	}

	async function getRect(page, selector) {
		return page.$eval(selector, (elem) => {
			const opener = elem._opener;
			const card = elem.shadowRoot.querySelector('.d2l-labs-profile-card');
			const openerRect = opener.getBoundingClientRect();
			const cardRect = card.getBoundingClientRect();
			const x = Math.min(openerRect.x, cardRect.x);
			const y = Math.min(openerRect.y, cardRect.y);
			const width = Math.max(openerRect.right, cardRect.right) - x;
			const height = Math.max(openerRect.bottom, cardRect.bottom) - y;
			return {
				x: x - 10,
				y: y - 10,
				width: width + 20,
				height: height + 20
			};
		});
	}

	it('passes visual-diff comparison', async function() {
		const selector = '#default';
		await open(page, selector);
		const rect = await getRect(page, selector);
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('passes visual-diff with actions', async function() {
		const selector = '#with-actions';
		await open(page, selector);
		const rect = await getRect(page, selector);
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	it('passes visual-diff with awards', async function() {
		const selector = '#with-awards';
		await open(page, selector);
		const rect = await getRect(page, selector);
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

});
