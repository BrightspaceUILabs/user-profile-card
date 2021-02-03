import '@brightspace-ui/core/components/button/button-subtle.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/inputs/input-textarea.js';
import { bodySmallStyles, bodyStandardStyles, heading2Styles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { inputStyles } from '@brightspace-ui/core/components/inputs/input-styles.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

const editMessage = 'Click to edit tagline';

class UserProfileCard extends LocalizeMixin(LitElement) {

	static get properties() {
		return {
			_isEditing: { type : Boolean },
			editable: {type: Boolean},
			online: { type: Boolean },
			userAttributes: { type: Array, attribute: 'user-attributes', reflect: true },
			tagline: { type: String, reflect: true },
			progressViewable: { type: Boolean, attribute: 'progress-viewable' }
		};
	}

	static get styles() {
		const profileLayout = css`
			.d2l-labs-profile-card {
				display: grid;
				width: 600px;
				grid-template-columns: [start illustration-start] 22px [info-start] 94px [illustration-end basic-info-start] auto [basic-info-end info-end] 22px [end];
				grid-template-rows: [start header-start] 116px [header-end tagline-start] auto [tagline-end awards-start] auto [awards-end contact-start] auto [contact-end end];
				border: 1px solid var(--d2l-color-mica);
				border-radius: 6px;
				box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
				overflow: hidden;
			}
			::slotted([slot=illustration]) {
				grid-column: illustration-start / illustration-end;
				grid-row: header-start / header-end;
			}
			.d2l-labs-profile-card-basic-info {
				grid-column: basic-info-start / end;
				grid-row: header-start / header-end;
			}

			::slotted([slot=illustration]),
			.d2l-labs-profile-card-basic-info {
				grid-row: header-start / header-end;
				border-bottom: 1px solid var(--d2l-color-mica);
				overflow: hidden;
				width: 100%;
				height: 100%;
			}
			.d2l-labs-profile-card-awards {
				grid-column: start / end;
				grid-row: awards-start / awards-end;
				border-top: 1px solid var(--d2l-color-mica);
				overflow: hidden;
				width: 100%;
				height: 100%;
			}
			.d2l-labs-profile-card-contact {
				grid-column: start / end;
				grid-row: contact-start / contact-end;
				border-top: 1px solid var(--d2l-color-mica);
				background-color: var(--d2l-color-regolith);
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
		.d2l-profile-card-media {
			display: flex;

			align-items: center;
		}
		::slotted([slot=website]) {
			margin-left: 40px;
		}
		::slotted([slot=social-media-icons]) {
			display: grid;
			grid-gap: 14px;
			grid-auto-flow: column;
			grid-auto-columns: 24px;
			margin: 13px 0;
			margin-top: 11px;
		}
		.d2l-profile-card-tagline:hover {
			background-color: var(--d2l-color-sylvite);
			transition: background-color .2s ease-in;
		}
		@media (prefers-reduced-motion)
		{
			.d2l-profile-card-tagline:hover {
				background-color: inherit;
				transition: none;
			}
		}
		`;

		const awards = css`
		.d2l-labs-profile-card-awards {
			grid-column: start / end;
			grid-row: 3 / 4;
			padding: 22px 26px;
			color: black;
			display: flex;
			flex-direction: column;
		}
		::slotted([slot=awards-icons]) {
			display: grid;
			grid-gap: 14px;
			grid-auto-flow: column;
			grid-auto-columns: 40px;
			margin: 5px 0;
		}
		`;

		const contact = css`
		.d2l-labs-profile-card-contact {
			grid-column: start / end;
			grid-row: media-start / media-end;
			padding: 22px;
			color: black;
		}

		.d2l-profile-card-contact-info {
			display: flex;
			justify-content: space-between;
		}

		::slotted([slot=contact-items]) {
			display: grid;
			grid-gap: 14px;
			grid-auto-flow: column;
			grid-auto-columns: 24px;
			margin: 13px 0;
			margin-top: 11px;
		}
		`;

		return [ bodyStandardStyles, bodySmallStyles, heading2Styles, inputStyles, labelStyles, profileLayout, basicInfo, content, awards, contact, css`
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
			'en': { 'online': 'Online', 'offline': 'Offline', 'none': 'None' }
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
		this.editable = false;
		this.online = false;
		this.tagline = '';
		this.userAttributes = [];
		this._isEditing = false;
		this.progressViewable = false;
	}

	render() {
		this.userAttributes.map((item) => {
			console.log(item);
			return html`<li>${item}</li>`;
		});

		const classes = { 'd2l-labs-profile-card': true, 'd2l-is-editing': this._isEditing};

		return html`
			<div class="${classMap(classes)}">
				<slot name="illustration"></slot>
				<div class="d2l-labs-profile-card-basic-info">
					<h2 class="d2l-heading-2 d2l-labs-profile-card-name"><slot>${this.localize('none')}</slot></h2>
					<div class="d2l-labs-profile-card-status d2l-label-text">
					${ this.online ? html`
						<d2l-icon icon="tier2:dot"></d2l-icon>${this.localize('online')}
					` : html`
						<d2l-icon icon="tier2:dot"></d2l-icon>${this.localize('offline')}
					`}
					</div>
					<ul class="d2l-labs-profile-card-attributes d2l-body-small">
						${this.userAttributes.map((item) => html`<li>${item}</li>`)}
					</ul>
				</div>
				</slot>
				<div class="d2l-labs-profile-card-content">
					${this._generateTaglineHtml()}
					<div class="d2l-profile-card-media">
						<slot name="social-media-icons"></slot>
						<slot name="website"></slot>
					</div>
				</div>
				<div class="d2l-labs-profile-card-awards">
					<slot name="awards-icons"></slot>
				</div>
				<div class="d2l-labs-profile-card-contact">
					<div class="d2l-profile-card-contact-info">
						<div>
							<d2l-button-subtle id="email" text="Email" icon="tier1:email" @click="${this._onEmailClick}"></d2l-button-subtle>
							<d2l-button-subtle id="message" text="Instant Message" icon="tier1:add-message" @click="${this._onMessageClick}"></d2l-button-subtle>
						</div>
						${ this.progressViewable ? html`<d2l-button-subtle id="progress" text="User Progress" icon="tier1:user-progress" @click="${this._onProgressClick}"></d2l-button-subtle>` : html`` }
					</div>
				</div>
			</div>
		`;
	}

	// Add focus to the tagline textarea after it is rendered
	update() {
		super.update();
		if (this._isEditing) {
			this.shadowRoot.querySelector('d2l-input-textarea').focus();
		}
	}

	_generateTaglineHtml() {
		if (this.editable && this._isEditing) {
			return html`<d2l-input-textarea
				@focusout="${this._onTextareaFocusout}"
				rows="2"
				value="${this.tagline}">
			</d2l-input-textarea>`;
		} else if (this.editable) {
			return html `<span name="tagline" title="${editMessage}" class="d2l-profile-card-tagline"
				@click="${this._onTaglineClick}">${this.tagline ? this.tagline : editMessage}</span>
			`;
		} else {
			return html `<span name="tagline">${this.tagline}</span>`;
		}
	}

	_onTaglineClick() {
		this._isEditing = true;
	}

	_onTextareaFocusout(evt) {
		this._isEditing = false;
		this.tagline = evt.target.value;

		this.dispatchEvent(new CustomEvent('d2l-labs-user-profile-card-tagline-updated', {
			details: {
				tagline: this.tagline
			}
		}));
	}

	_onEmailClick() {
		this.dispatchEvent(new CustomEvent('d2l-labs-user-profile-card-email'));
	}

	_onMessageClick() {
		this.dispatchEvent(new CustomEvent('d2l-labs-user-profile-card-message'));
	}

	_onProgressClick() {
		this.dispatchEvent(new CustomEvent('d2l-labs-user-profile-card-progress'));
	}
}
customElements.define('d2l-labs-user-profile-card', UserProfileCard);
