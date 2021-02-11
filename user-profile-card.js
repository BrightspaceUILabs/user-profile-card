import '@brightspace-ui/core/components/button/button-subtle.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/inputs/input-textarea.js';
import { bodySmallStyles, bodyStandardStyles, heading2Styles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { inputStyles } from '@brightspace-ui/core/components/inputs/input-styles.js';
import { linkStyles } from '@brightspace-ui/core/components/link/link.js';
import { LocalizeUserProfileCard } from './lang/localize-user-profile-card.js';
import { offscreenStyles } from '@brightspace-ui/core/components/offscreen/offscreen.js';

class UserProfileCard extends LocalizeUserProfileCard(LitElement) {

	static get properties() {
		return {
			displayName: { type: String, attribute: 'display-name' },
			editable: {type: Boolean},
			online: { type: Boolean },
			showEmail: { type: Boolean, attribute: 'show-email' },
			showIM: { type: Boolean, attribute: 'show-im' },
			showProgress: { type: Boolean, attribute: 'show-progress' },
			showStatus: { type: Boolean, attribute: 'show-status' },
			tagline: { type: String, reflect: true },
			userAttributes: { type: Array, attribute: 'user-attributes', reflect: true },
			_showAwards: { type: Boolean, attribute: false},
			_isTagLineButtonFocusing: { type: Boolean },
			_isTaglineEditing: { type: Boolean }
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
				text-align: center;
				line-height: 124px;
				vertical-align: middle;
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
				color: var(--d2l-color-ferrite);
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

			.d2l-profile-card-tagline-container d2l-input-textarea {
				display: none;
			}
			.d2l-is-editing .d2l-profile-card-tagline-container d2l-input-textarea {
				display: block;
			}
			.d2l-is-editing .d2l-profile-card-tagline-container div,
			.d2l-is-editing .d2l-profile-card-tagline-container button {
				display: none;
			}
			.d2l-profile-card-tagline-container div:hover,
			.d2l-profile-card-tagline-focusing div {
				background-color: var(--d2l-color-sylvite);
				transition: background-color .2s ease-in;
			}
			@media (prefers-reduced-motion) {
				.d2l-profile-card-tagline-container div:hover,
				.d2l-profile-card-tagline-focusing div {
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

		return [ bodyStandardStyles,
			bodySmallStyles,
			heading2Styles,
			inputStyles,
			labelStyles,
			offscreenStyles,
			profileLayout,
			basicInfo,
			content,
			awards,
			contact,
			linkStyles, css`
			:host {
				display: inline-block;
			}
			:host([hidden]) {
				display: none;
			}
		`];
	}

	constructor() {
		super();
		this.displayName = '';
		this.editable = false;
		this.online = false;
		this.progressViewable = false;
		this.showEmail = false;
		this.showIM = false;
		this.showProgress = false;
		this._showAwards = false;
		this.showStatus = false;
		this.tagline = '';
		this.userAttributes = [];
		this._isTagLineButtonFocusing = false;
		this._isTaglineEditing = false;
	}

	firstUpdated() {
		const awardSlot = this.shadowRoot.querySelector('slot[name=awards-icons]');
		const awardNodes = awardSlot.assignedNodes();
		if (awardNodes.length !== 0) {
			this._showAwards = true;
		}
	}

	render() {
		this.userAttributes.map((item) => {
			return html`<li>${item}</li>`;
		});

		const classes = { 'd2l-labs-profile-card': true, 'd2l-is-editing': this._isTaglineEditing};

		return html`
			<div class="${classMap(classes)}">
				<slot name="illustration" class="d2l-link" title="${this.localize('openProfile', {displayName : this.displayName})}"  @click="${this._onProfileImageClick}"></slot>
				<div class="d2l-labs-profile-card-basic-info">
					<a class="d2l-heading-2 d2l-labs-profile-card-name d2l-link" title="${this.localize('openProfile', {displayName : this.displayName})}" @click="${this._onDisplayNameClick}">${this.displayName}</a>
					${this._renderOnlineStatus()}
					<ul class="d2l-labs-profile-card-attributes d2l-body-small">
						${this.userAttributes.map((item) => html`<li>${item}</li>`)}
					</ul>
				</div>
				${this._renderProfileCardContent()}
				${this._renderAwardIcons()}
				${ this.showEmail || this.showIM || this.showProgress ? html`
					<div class="d2l-labs-profile-card-contact">
						<div class="d2l-profile-card-contact-info">
							<div>
								${ this.showEmail ? html`<d2l-button-subtle
									@click="${this._onEmailClick}"
									icon="tier1:email"
									id="email"
									text="${this.localize('email')}"></d2l-button-subtle>` : html`` }
								${ this.showIM ? html`<d2l-button-subtle
									@click="${this._onMessageClick}"
									icon="tier1:add-message"
									id="message"
									text="${this.localize('instantMessage')}"></d2l-button-subtle>` : html`` }
							</div>
							${ this.showProgress ? html`<d2l-button-subtle
								@click="${this._onProgressClick}"
								icon="tier1:user-progress"
								id="progress"
								text="${this.localize('userProgress')}" ></d2l-button-subtle>` : html`` }
						</div>
					</div>` : html``}
			</div>
		`;
	}

	_renderOnlineStatus() {
		if (this.showStatus) {
			return html`
				<div class="d2l-labs-profile-card-status d2l-label-text">
					${ this.online ? html`
						<d2l-icon icon="tier2:dot"></d2l-icon>${this.localize('online')}
					` : html`
						<d2l-icon icon="tier2:dot"></d2l-icon>${this.localize('offline')}
					`}
				</div>
			`;
		}
	}

	_renderAwardIcons() {
		return html`
			<div class="${this._showAwards ? 'd2l-labs-profile-card-awards' : '' }">
				<slot name="awards-icons"></slot>
			</div>
		`;
	}

	_renderProfileCardContent() {
		if (this.tagline !== '') {
			return html`
				<div class="d2l-labs-profile-card-content">
					${this._generateTaglineHtml()}
					<div class="d2l-profile-card-media">
						<slot name="social-media-icons"></slot>
						<slot name="website"></slot>
					</div>
				</div>
			`;
		}
	}

	_generateTaglineHtml() {

		if (!this.editable) {
			return html`<div>${this.tagline}</div>`;
		}

		const classes = {
			'd2l-profile-card-tagline-container': true,
			'd2l-profile-card-tagline-focusing': this._isTagLineButtonFocusing
		};

		return html`
			<div class="${classMap(classes)}">
				<button @blur="${this._onTaglineButtonBlur}"
					class="d2l-offscreen"
					@click="${this._onTaglineClick}"
					@focus="${this._onTaglineButtonFocus}">
					${this.localize('editTagline')}
				</button>
				<d2l-input-textarea
					@focusout="${this._onTextareaFocusout}"
					@keyup="${this._onTaglineKeyUp}"
					rows="2"
					value="${this.tagline}">
				</d2l-input-textarea>
				<div class="d2l-profile-card-tagline"
					@click="${this._onTaglineClick}"
					title="${this.localize('editTagline')}">
					${this.tagline ? this.tagline : this.localize('editTagline')}
				</div>
			</div>
		`;
	}

	_onTaglineButtonBlur() {
		this._isTagLineButtonFocusing = false;
	}

	_onTaglineButtonFocus() {
		this._isTagLineButtonFocusing = true;
	}

	async _onTaglineClick() {
		this._isTaglineEditing = true;
		this._originalTagline = this.tagline;
		await this.updateComplete;
		this.shadowRoot.querySelector('d2l-input-textarea').focus();
	}

	async _onTaglineKeyUp(e) {
		if (e.keyCode !== 27) return;
		this.shadowRoot.querySelector('d2l-input-textarea').value = this._originalTagline;
		this._isTaglineEditing = false;
		await this.updateComplete;
		this.shadowRoot.querySelector('.d2l-profile-card-tagline-container button').focus();
	}

	_onTextareaFocusout(e) {
		this._isTaglineEditing = false;
		if (this.tagline === e.target.value) return;

		this.tagline = e.target.value;
		this.dispatchEvent(new CustomEvent('d2l-labs-user-profile-card-tagline-updated', {
			detail: {
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

	_onProfileImageClick() {
		this.dispatchEvent(new CustomEvent('d2l-labs-user-profile-card-profile'));
	}

	_onDisplayNameClick() {
		this.dispatchEvent(new CustomEvent('d2l-labs-user-profile-card-profile'));
	}
}
customElements.define('d2l-labs-user-profile-card', UserProfileCard);
