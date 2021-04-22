import '@brightspace-ui/core/components/button/button-subtle.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/focus-trap/focus-trap.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/inputs/input-textarea.js';
import 'd2l-users/components/d2l-profile-image.js';
import { bodySmallStyles, bodyStandardStyles, heading2Styles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { html, LitElement } from 'lit-element/lit-element.js';
import { getUniqueId } from '@brightspace-ui/core/helpers/uniqueId.js';
import { linkStyles } from '@brightspace-ui/core/components/link/link.js';
import { LocalizeUserProfileCard } from './localize-user-profile-card.js';
import { offscreenStyles } from '@brightspace-ui/core/components/offscreen/offscreen.js';
import { profileCardStyles } from './user-profile-card-styles.js';

const keyCodes = {
	DOWN: 40,
	ENTER: 13,
	ESCAPE: 27
};

const openerGap = 10; /* spacing between card and opener */
const viewportMargin = 18;
class UserProfileCard extends LocalizeUserProfileCard(LitElement) {

	static get properties() {
		return {
			displayName: { type: String, attribute: 'display-name' },
			href: { type: String },
			image: { type: String },
			online: { type: Boolean },
			showEmail: { type: Boolean, attribute: 'show-email' },
			showIM: { type: Boolean, attribute: 'show-im' },
			showProgress: { type: Boolean, attribute: 'show-progress' },
			showStatus: { type: Boolean, attribute: 'show-status' },
			small: { type: Boolean, attribute: 'small-opener' },
			medium: { type: Boolean, attribute: 'medium-opener' },
			large: { type: Boolean, attribute: 'large-opener' },
			xLarge: { type: Boolean, attribute: 'xlarge-opener' },
			tagline: { type: String, reflect: true },
			token: { type: Object,
				converter: {
					fromAttribute(value) {
						const retVal = String(value);
						return retVal;
					},
					toAttribute(value) {
						const retVal = Object(value);
						return retVal;
					}
				}
			},
			userAttributes: { type: Array, attribute: 'user-attributes', reflect: true },
			website: { type: String },
			_showAwards: { type: Boolean, attribute: false },
			_isOpen: { type: Boolean },
			_isHovering: { type: Boolean },
			_openedAbove: {
				type: Boolean,
				reflect: true,
				attribute: 'opened-above'
			},
		};
	}

	static get styles() {
		return [ bodyStandardStyles,
			bodySmallStyles,
			heading2Styles,
			labelStyles,
			linkStyles,
			offscreenStyles,
			profileCardStyles
		];
	}

	constructor() {
		super();
		this.displayName = '';
		this.online = false;
		this.progressViewable = false;
		this.showEmail = false;
		this.showIM = false;
		this.showProgress = false;
		this._showAwards = false;
		this.showStatus = false;
		this.tagline = '';
		this.website = '';
		this.userAttributes = [];

		this._dismissTimerId = getUniqueId();
		this._isOpen = false;
		this._isHovering = false;

		this._onOutsideClick = this._onOutsideClick.bind(this);
		this._reposition = this._reposition.bind(this);
	}

	connectedCallback() {
		super.connectedCallback();
		document.body.addEventListener('click', this._onOutsideClick);
		window.addEventListener('resize', this._reposition);
		this.addEventListener('keydown', this._onKeyDown);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		document.body.removeEventListener('click', this._onOutsideClick);
		window.removeEventListener('resize', this._reposition);
	}

	firstUpdated() {
		if (!this.small && !this.large && !this.xLarge) {
			this.medium = true;
		}
		const awardSlot = this.shadowRoot.querySelector('slot[name=awards-icons]');
		const awardNodes = awardSlot.assignedNodes();
		if (awardNodes.length !== 0) {
			this._showAwards = true;
		}
		this._opener = this.shadowRoot.querySelector('.d2l-labs-user-profile-card-opener');
		this._card = this.shadowRoot.querySelector('.d2l-labs-profile-card');
		this._pointer = this.shadowRoot.querySelector('.d2l-labs-profile-card-pointer');
	}

	render() {
		this.userAttributes.map((item) => {
			return html`<li>${item}</li>`;
		});

		const hidden = !this._isOpen && !this._isHovering;
		const openAlert = hidden ? this.localize('profileCardClosed') : this.localize('profileCardOpened');
		return html`
			<d2l-profile-image ?small=${this.small} ?medium=${this.medium} ?large=${this.large} ?xlarge=${this.xlarge}
				aria-expanded="${!hidden}"
				aria-haspopup="true"
				aria-label="${this.localize('profileCardOpener', { displayName : this.displayName })}"
				class="d2l-labs-user-profile-card-opener"
				href=${this.href}
				.token=${this.token}
				tabindex="0"
				@mouseenter=${this._onMouseEnter}
				@mouseleave=${this._onMouseLeave}
				@touchstart=${this._onOpenerTouch}
				@keydown=${this._onOpenerKeyDown}
				@click=${this._onOpenerClick}
			></d2l-profile-image>
			<d2l-focus-trap ?trap="${this._isOpen}">
				<d2l-offscreen role="alert">${openAlert}</d2l-offscreen>
				<div class="d2l-labs-profile-card-pointer" ?hidden="${hidden}">
					<div></div>
				</div>
				<div class="d2l-labs-profile-card" ?hidden="${hidden}"
					@mouseenter=${this._onMouseEnter}
					@mouseleave=${this._onMouseLeave}>
						<div class="d2l-labs-profile-card-image-wrapper"
								@click="${this._onProfileImageClick}">
							${this.image ? html`
								<img class="d2l-labs-profile-card-image d2l-link" title="${this.localize('openProfile', { displayName : this.displayName })}"
									src="${this.image}"/>
							` : ''}
						</div>
					<div class="d2l-labs-profile-card-basic-info">
						<a class="d2l-heading-2 d2l-labs-profile-card-name d2l-link" tabindex="0" title="${this.localize('openProfile', { displayName : this.displayName })}" @click="${this._onDisplayNameClick}">${this.displayName}</a>
						${this._renderOnlineStatus()}
						${this.userAttributes.length > 0 ? html`
							<ul class="d2l-labs-profile-card-attributes d2l-body-small">
								${this.userAttributes.map((item) => html`<li>${item}</li>`)}
							</ul>` : html`` }
					</div>
					${this._renderProfileCardContent()}
					${this._renderAwardIcons()}
					${this._renderContactInfo()}
				</div>
			</d2l-focus-trap>
		`;
	}

	close() {
		this._isOpen = false;
		this._isHovering = false;
	}

	async open() {
		this._isOpen = true;
		this._isHovering = true;
		await this.updateComplete;
		this._reposition();
		const name = this.shadowRoot.querySelector('.d2l-labs-profile-card-name');
		name.focus();
		this.dispatchEvent(new CustomEvent('d2l-labs-user-profile-card-opened'));
	}

	_onDisplayNameClick() {
		this.dispatchEvent(new CustomEvent('d2l-labs-user-profile-card-profile'));
	}

	_onEmailClick() {
		this.dispatchEvent(new CustomEvent('d2l-labs-user-profile-card-email'));
	}

	_onKeyDown(e) {
		if (e.keyCode === keyCodes.ESCAPE && this._isOpen) {
			this.close();
			this._opener.focus();
		}
	}

	_onMessageClick() {
		this.dispatchEvent(new CustomEvent('d2l-labs-user-profile-card-message'));
	}

	_onMouseEnter() {
		clearTimeout(this._dismissTimerId);
		this._isHovering = true;
		this._reposition();
	}

	_onMouseLeave() {
		//Wait before closing so we don't lose hover when we jump from opener to card
		clearTimeout(this._dismissTimerId);
		this._dismissTimerId = setTimeout(() => {
			this._isHovering = false;
		}, 300);
	}

	_onOpenerClick() {
		//If we're hovering it's already showing, so force-close it.
		if (this._isHovering) {
			this.close();
		} else {
			this.open();
		}
	}

	_onOpenerKeyDown(e) {
		if (e.keyCode !== keyCodes.ENTER && e.keyCode !== keyCodes.DOWN) return;
		e.preventDefault();
		this.open();
	}

	_onOpenerTouch(e) {
		//Prevents touch from triggering mouseover/hover behavior
		e.preventDefault();
		this._isOpen = !this._isOpen;
	}

	_onOutsideClick(e) {
		if (this._isOpen && e.target !== this._opener && !this.contains(e.target)) {
			this.close();
		}
	}

	_onProfileImageClick() {
		this.dispatchEvent(new CustomEvent('d2l-labs-user-profile-card-profile'));
	}

	_onProgressClick() {
		this.dispatchEvent(new CustomEvent('d2l-labs-user-profile-card-progress'));
	}

	_renderAwardIcons() {
		return html`
			<div class="${this._showAwards ? 'd2l-labs-profile-card-awards' : '' }">
				<slot name="awards-icons"></slot>
			</div>
		`;
	}

	_renderContactInfo() {
		if (this.showEmail || this.showIM || this.showProgress) {
			return html`
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
			</div>`;
		}
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

	_renderProfileCardContent() {
		return html`
			<div class="d2l-labs-profile-card-content">
				${this.tagline !== '' ? html`<div>${this.tagline}</div>` : html``}
				<div class="d2l-profile-card-media">
					<slot name="social-media-icons"></slot>
					${this.website !== '' ? html`<d2l-link class="d2l-profile-card-website" href="#">${this.website}</d2l-link>` : ''}
				</div>
			</div>
		`;
	}

	async _reposition() {
		await this.updateComplete;
		const openerRect = this._opener.getBoundingClientRect();
		const cardRect = this._card.getBoundingClientRect();
		const spaceAround = {
			above: openerRect.top - viewportMargin,
			below: window.innerHeight - (openerRect.top + openerRect.height) - viewportMargin,
			left: openerRect.left - viewportMargin,
			right: document.documentElement.clientWidth - (openerRect.left + openerRect.width) - viewportMargin
		};

		//Vertical
		this._openedAbove = spaceAround.below < cardRect.height && spaceAround.above > spaceAround.below;
		const top = this._openedAbove ?
			-(cardRect.height + openerRect.height + openerGap - 8)
			: openerGap + 15;
		this._card.style.top = `${top}px`;
		const pointerTop = this._openedAbove ? -openerRect.height - openerGap - 2 : openerGap + 8;
		this._pointer.style.top = `${pointerTop}px`;

		//Horizontal
		if (spaceAround.left > spaceAround.right) {
			this._card.style.left = '';
			const right = -Math.min((cardRect.width - openerRect.width) / 2, spaceAround.right);
			this._card.style.right = `${right}px`;

		} else {
			this._card.style.right = '';
			const left = -Math.min((cardRect.width - openerRect.width) / 2, spaceAround.left);
			this._card.style.left = `${left}px`;
		}
	}
}
customElements.define('d2l-labs-user-profile-card', UserProfileCard);
