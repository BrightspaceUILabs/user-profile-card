import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/icons/icon.js';
import { bodySmallStyles, bodyStandardStyles, heading2Styles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

class UserProfileCard extends LocalizeMixin(LitElement) {

	static get properties() {
		return {
			online: { type: Boolean },
			userAttributes: { type: Array, attribute: 'user-attributes', reflect: true }
		};
	}

	static get styles() {
		const profileLayout = css`
			.d2l-labs-profile-card {
				display: grid;
				width: 600px;
				grid-template-columns: [start illustration-start] 116px [illustration-end basic-info-start] auto [basic-info-end end];
				grid-template-rows: 116px auto;
				border: 1px solid var(--d2l-color-mica);
				border-radius: 6px;
				box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
				overflow: hidden;
			}
			::slotted([slot=illustration]) {
				grid-column: illustration-start / illustration-end;
			}
			.d2l-labs-profile-card-basic-info {
				grid-column: basic-info-start / basic-info-end;
			}
			::slotted([slot=illustration]),
			.d2l-labs-profile-card-basic-info {
				grid-row: 1 / 2;
				border-bottom: 1px solid var(--d2l-color-mica);
				overflow: hidden;
				width: 100%;
				height: 100%;
			}
		`;

		const basicInfo = css`
			.d2l-labs-profile-card-basic-info {
				display: grid;
				grid-template-columns: 22px [start name-start] auto [name-end online-start] auto [online-end end] 22px;
				grid-template-rows: 14px [start online-start name-start] 1.8rem [online-end] auto [name-end] auto [end];
				justify-content: start;
			}
			.d2l-labs-profile-card-name {
				color: var(--d2l-color-celestine);
				grid-column: name-start / name-end;
				grid-row: name-start / name-end;
				margin: 0;
				margin-right: 16px;
			}
			.d2l-labs-profile-card-status {
				grid-column: online-start / online-end;
				grid-row: online-start / online-end;
				align-self: center;
				display:flex;
				align-items: center;
			}
			.d2l-labs-profile-card-status d2l-icon {
				margin: 0 5px;
			}
			:host([online]) .d2l-labs-profile-card-status,
			:host([online]) .d2l-labs-profile-card-status d2l-icon{
				color: var(--d2l-color-olivine-minus-1);
			}
			.d2l-labs-profile-card-attributes {
				grid-column: start / end;
				grid-row: 3 / 4;
				margin: 0;
				padding: 0;
				margin-top: 8px;
			}
			.d2l-labs-profile-card-attributes li {
				display: inline;
			}
			.d2l-labs-profile-card-attributes li:nth-child(n+2)::before {
				display: inline-block;
				content: '';
				border-radius: 0.25rem;
				height: 0.25rem;
				width: 0.25rem;
				margin: 0.05rem 0.35rem;
				background-color: #6E7376;
			}
		`;

		const content = css`
			.d2l-labs-profile-card-content {
				grid-column: start / end;
				grid-row: 2 / 3;
				margin: 22px 26px;
				color: black;
				display: flex;
				flex-direction: column;
			}
			::slotted([slot=website]) {
				margin-top: 11px;
			}
			::slotted([slot=social-media-icons]) {
				display: grid;
				grid-gap: 14px;
				grid-auto-flow: column;
				grid-auto-columns: 24px;
				margin: 13px 0;
			}
		`;
		return [ bodyStandardStyles, bodySmallStyles, heading2Styles, labelStyles, profileLayout, basicInfo, content, css`
			:host {
				display: inline-block;
			}
			:host([hidden]) {
				display: none;
			}
		`];
	}

	static async getLocalizeResources(langs) {
		const langResources = {
			'en': { 'online': 'Online', 'offline': 'Offline' }
		};

		for (let i = 0; i < langs.length; i++) {
			if (langResources[langs[i]]) {
				return {
					language: langs[i],
					resources: langResources[langs[i]]
				};
			}
		}

		return null;
	}

	constructor() {
		super();
		this.online = false;
		this.userAttributes = [];
	}

	render() {
		this.userAttributes.map((item) => {
			console.log(item);
			return html`<li>${item}</li>`;
		});
		return html`
			<div class="d2l-labs-profile-card">
				<slot name="illustration"></slot>
				<div class="d2l-labs-profile-card-basic-info">
					<h2 class="d2l-heading-2 d2l-labs-profile-card-name"><slot>None</slot></h2>
					<div class="d2l-labs-profile-card-status d2l-label-text">
					${ this.online ? html`
						<d2l-icon icon="tier2:online"></d2l-icon>${this.localize('online')}
					` : html`
						<d2l-icon icon="tier2:online"></d2l-icon>${this.localize('offline')}
					`}
					</div>
					<ul class="d2l-labs-profile-card-attributes d2l-body-small">
						${this.userAttributes.map((item) => html`<li>${item}</li>`)}
					</ul>
				</div>
				<div class="d2l-labs-profile-card-content d2l-body-standard">
					<slot name="tagline"></slot>
					<slot name="website"></slot>
					<slot name="social-media-icons"></slot>
				</div>
			</div>
		`;
	}
}
customElements.define('d2l-labs-user-profile-card', UserProfileCard);
