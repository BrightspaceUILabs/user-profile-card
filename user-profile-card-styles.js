import '@brightspace-ui/core/components/colors/colors.js';
import { css } from 'lit-element/lit-element.js';

export const profileCardStyles = css`
:host {
	position: relative;
}

/* Card */
.d2l-labs-profile-card {
	position: absolute;
	background-color: white;
	display: grid;
	width: 520px;
	grid-template-columns: [start] 20px [illustration-start] 100px [illustration-end] 18px [basic-info-start] minmax(0px, 70%) [basic-info-end] 20px [end];
	grid-template-rows: [start] 20px [basic-info-start] 120px [illustration-end] auto [basic-info-end awards-start] auto [awards-end contact-start] auto [contact-end end];
	border: 1px solid var(--d2l-color-gypsum);
	border-radius: 6px;
	box-shadow: 0 4px 8px 0 rgba(73, 76, 78, 0.2), 0 6px 20px 0 rgba(73, 76, 78, 0.2); /* ferrite */
	z-index: 1001;
}

@media (max-width: 615px) {
	.d2l-labs-profile-card {
		max-width: 90vw;
		grid-template-columns: [start] 0px [illustration-start] 72px [illustration-end] 18px [basic-info-start] minmax(0px, 80%) [basic-info-end] 20px [end];
		grid-template-rows: [start] 12px [basic-info-start] 72px [illustration-end] auto [basic-info-end awards-start] auto [awards-end contact-start] auto [contact-end end];
	}
}

.d2l-labs-profile-card-fading {
	transition: opacity 0.4s ease-out;
	opacity: 0;
}
.d2l-labs-profile-card[hidden],
.d2l-labs-profile-card-pointer[hidden] {
	display: none;
}
.d2l-labs-profile-card-pointer {
	clip: rect(-5px, 21px, 8px, -7px);
	left: calc(50% - 10px);
	display: inline-block;
	position: absolute;
	z-index: 1002;
}
.d2l-labs-profile-card-pointer > div {
	background-color: white;
	border: 1px solid var(--d2l-color-gypsum);
	border-radius: 0.1rem;
	box-shadow: -4px -4px 12px -5px rgba(73, 76, 78, 0.2); /* ferrite */
	height: 16px;
	-webkit-transform: rotate(45deg);
	transform: rotate(45deg);
	width: 16px;
}
:host([opened-above]) .d2l-labs-profile-card-pointer {
		clip: rect(9px, 21px, 22px, -3px);
	}
:host([opened-above]) .d2l-labs-profile-card-pointer > div {
	box-shadow: 4px 4px 12px -5px rgba(73, 76, 78, 0.2); /* ferrite */
}
@media (max-width: 615px) {
	.d2l-labs-profile-card-pointer,
	.d2l-labs-profile-card-pointer > div  {
		display: none;
	}
}

/* Profile Image */
.d2l-labs-profile-card-image {
	grid-column: illustration-start / illustration-end;
	grid-row: basic-info-start / illustration-end;
	border-radius: 6px;
	width: 100px;
	height: 100px;
	margin-left: 20px;
	margin-top: 20px;
}
:host([dir="rtl"]) .d2l-labs-profile-card-image {
	margin-left: auto;
	margin-right: 20px;
}
.d2l-labs-profile-card-image-wrapper {
  position: relative;
}
.d2l-labs-profile-card-image-wrapper:after {
	content:"";
	position: absolute;
	border-radius: 6px;
	box-sizing: border-box;
	width: 100px;
	height: 100px;
	top: 20px;
	left: 20px;
	opacity:0.2;
	border: 1px solid var(--d2l-color-tungsten);
}
:host([dir="rtl"]) .d2l-labs-profile-card-image-wrapper:after {
	left: auto;
	right: 20px;
}

@media (max-width: 615px) {
	.d2l-labs-profile-card-image {
		grid-row: start / illustration-end;
		border-radius: 0px;
		border-top-left-radius: 6px;
		margin-left: -1px;
		margin-top: -1px;
		width: 72px;
		height: 72px;
	}
	:host([dir="rtl"]) .d2l-labs-profile-card-image {
		border-radius: 0px;
		border-top-right-radius: 6px;
		margin-left: auto;
		margin-right: -1px;
	}
	.d2l-labs-profile-card-image-wrapper:after {
		border-radius: 0px;
		border-top-left-radius: 6px;
		left: -1px;
		top: -1px;
		width: 72px;
		height: 72px;
	}
	:host([dir="rtl"]) .d2l-labs-profile-card-image-wrapper:after {
		left: auto;
		right: -1px;
	}
}

/*Basic Info */
.d2l-labs-profile-card-basic-info {
	grid-column: basic-info-start / basic-info-end;
	grid-row: basic-info-start / basic-info-end;
	vertical-align: middle;
	margin-bottom: 12px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
}
.d2l-labs-profile-card-name-and-online {
	display: flex;
}
.d2l-labs-profile-card-name {
	margin: 0;
}
.d2l-labs-profile-card-status {
	grid-column: online-start / online-end;
	grid-row: online-start / online-end;
	align-self: center;
	display:flex;
	align-items: center;
	margin-left: 18px;
}
:host([dir="rtl"]) .d2l-labs-profile-card-status {
	margin-left: auto;
	margin-right: 18px;
}
:host([online]) .d2l-labs-profile-card-status {
	color: var(--d2l-color-olivine-minus-1);
}
:host([online]) .d2l-labs-profile-card-status d2l-icon {
	color: var(--d2l-color-olivine);
}
.d2l-labs-profile-card-attributes {
	align-self: flex-start;
	display:flex;
	margin: 0;
	padding: 0;
	margin-top: 6px;
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
.d2l-labs-profile-card-tagline {
	display: -webkit-box;
  -webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
	margin-top: 12px;
}
.d2l-labs-profile-card-media {
	margin-top: 6px;
	display: flex;
	align-items: center;
}
::slotted([slot=social-media-icons]) {
	display: grid;
	grid-gap: 14px;
	grid-auto-flow: column;
	grid-auto-columns: 24px;
	margin-right: 12px;
	width: 100px;
}
:host([dir="rtl"]) ::slotted([slot=social-media-icons])  {
	margin-right: 0;
	margin-left: 12px;
}
.d2l-labs-profile-card-website {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Awards */
.d2l-labs-profile-card-awards {
	grid-column: start / end;
	grid-row: awards-start / awards-end;
	border-top: 1px solid var(--d2l-color-mica);
	color: black;
	display: flex;
}
::slotted([slot=awards-icons]) {
	display: grid;
	grid-gap: 14px;
	grid-auto-flow: column;
	grid-auto-columns: 40px;
	margin: 18px 20px;
}

/* Contact */
.d2l-labs-profile-card-contact {
	grid-column: start / end;
	grid-row: contact-start / contact-end;
	border-top: 1px solid var(--d2l-color-mica);
	background-color: var(--d2l-color-regolith);
	padding: 12px 20px;
}
`;
