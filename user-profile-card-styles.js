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
	width: 600px;
	grid-template-columns: [start illustration-start] 5rem [info-start] 0px [illustration-end basic-info-start] auto [basic-info-end info-end] auto [end];
	grid-template-rows: [start header-start] 5rem [header-end tagline-start] auto [tagline-end awards-start] auto [awards-end contact-start] auto [contact-end end];
	border: 1px solid var(--d2l-color-gypsum);
	border-radius: 6px;
	box-shadow: 0 4px 8px 0 rgba(73, 76, 78, 0.2), 0 6px 20px 0 rgba(73, 76, 78, 0.2); /* ferrite */
	z-index: 1001;
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

/* Layout */
.d2l-labs-profile-card-image {
	grid-column: illustration-start / illustration-end;
	grid-row: header-start / header-end;
	border-top-left-radius: 6px;
	margin-left: -1px;
	margin-top: -1px;
	width: calc(5rem + 2px);
	height: calc(5rem + 2px);
	z-index: 10;
	background-origin: border-box;
}
.d2l-labs-profile-card-image-wrapper {
    position:relative;
}
.d2l-labs-profile-card-image-wrapper:after {
	content:"";
	position:absolute;
	border-top-left-radius: 6px;
	top: -1px;
	left: -1px;
	box-sizing: border-box;
	width: calc(5rem + 2px);
	height: calc(5rem + 2px);
	opacity:0.2;
	border: 1px solid  var(--d2l-color-tungsten);
}

.d2l-labs-profile-card-basic-info {
	grid-column: basic-info-start / end;
	grid-row: header-start / header-end;
}

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

/*Basic Info */
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

/* Content */
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
.d2l-profile-card-website {
	margin-left: 0.6rem;
}
::slotted([slot=social-media-icons]) {
	display: grid;
	grid-gap: 14px;
	grid-auto-flow: column;
	grid-auto-columns: 24px;
	margin: 13px 0;
	margin-top: 11px;
}

/* Awards */
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

/* Contact */
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
