const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe('d2l-labs-user-profile-card', () => {

	const visualDiff = new VisualDiff('user-profile-card', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await visualDiff.createPage(browser, { viewport: { width: 1500, height: 1000 } });
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

	function setSettings(page, selector) {
		page.$eval(selector, (elem) => {
			elem._userProfileCardSettings = {
				showPicture: true,
				showTagline: true,
				showHomepageUrl: true,
				showSocial: true,
				showOnlineStatus: true,
				showRole: true,
				showBadgeTrophy: true,
				showOrgDefinedId: true
			};
		});
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
			//For some reason it reads the middle of the opener instead of the bottom, so 20px fixes this
			const height = Math.max(openerRect.bottom + 20, cardRect.bottom) - y;
			return {
				x: x - 10,
				y: y - 10,
				width: width + 20,
				height: height + 20
			};
		});
	}

	['rtl', 'ltr'].forEach((dir) => {
		describe(dir, () => {

			before(async() => {
				await page.goto(`${visualDiff.getBaseUrl()}/test/user-profile-card.visual-diff.html?dir=${dir}`, { waitUntil: ['networkidle0', 'load'] });
				await page.bringToFront();
			});

			[
				'default',
				'long-info',
				'with-actions',
				'with-awards',
			].forEach((testName) => {

				it(testName, async function() {
					const selector = `#${testName}`;
					setSettings(page, selector);
					await open(page, selector);
					const rect = await getRect(page, selector);
					await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
				});

			});
		});
	});

	it('hides info with all settings off', async function() {
		const selector = '#all-settings-off';
		await open(page, selector);
		const rect = await getRect(page, selector);
		await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
	});

	[
		'position-top-left',
		'position-top-middle',
		'position-top-right',
		'position-bottom-left',
		'position-bottom-middle',
		'position-bottom-right',
		'position-offset-left',
		'position-offset-right'
	].forEach((testName) => {

		it(testName, async function() {
			const selector = `#${testName}`;
			setSettings(page, selector);
			await open(page, selector);
			const rect = await getRect(page, selector);
			await visualDiff.screenshotAndCompare(page, this.test.fullTitle(), { clip: rect });
		});

	});

});
