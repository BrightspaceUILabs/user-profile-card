import 'd2l-polymer-siren-behaviors/store/entity-store.js';
import { Rels } from 'd2l-hypermedia-constants';

export const UserProfileCardControllerErrors = {
	MISSING_BASE_HREF: 'D2L-Labs-Profile-Card: No User HREF Provided',
	INVALID_TYPE_BASE_HREF: 'D2L-Labs-Profile-Card: Invalid User HREF Type'
};
export class UserProfileCardController {
	constructor(userHref, token) {
		if (!userHref) {
			throw new Error(UserProfileCardControllerErrors.MISSING_BASE_HREF);
		}

		if (typeof userHref !== 'string') {
			throw new Error(UserProfileCardControllerErrors.INVALID_TYPE_BASE_HREF);
		}

		this.userHref = userHref;
		this.token = token;
	}

	async getEnrolledUser() {
		if (this.userHref) {
			const enrolledUserEntity = await this._getEntityFromHref(this.userHref, false);

			const canonicalUserHref = enrolledUserEntity.entity.getLinkByRel(Rels.Users.canonicalUser).href;
			const displayNameEntity = enrolledUserEntity.entity.getSubEntityByRel(Rels.displayName);
			const emailEntity = enrolledUserEntity.entity.getSubEntityByRel(Rels.email, false);
			const orgDefinedIdEntity = enrolledUserEntity.entity.getSubEntityByRel(Rels.orgDefinedId);
			const pagerEntity = enrolledUserEntity.entity.getSubEntityByRel(Rels.pager);
			const userProfileEntity = enrolledUserEntity.entity.getSubEntityByRel(Rels.userProfile);

			let displayName = undefined;
			let emailPath = undefined;
			let onlineStatus = undefined;
			let orgDefinedId = undefined;
			let pagerPath = undefined;
			let userProfileImage = undefined;
			let userProfilePath = undefined;

			if (displayNameEntity) {
				displayName = displayNameEntity.properties.name;
			}
			if (emailEntity) {
				emailPath = emailEntity.properties.path;
			}
			if (orgDefinedIdEntity) {
				orgDefinedId = orgDefinedIdEntity.properties.orgDefinedId;
			}
			if (pagerEntity) {
				pagerPath = pagerEntity.properties.path;
			}
			if (userProfileEntity) {
				const userProfileImageEntity = userProfileEntity.getSubEntityByRel(Rels.profileImage);
				userProfileImage = userProfileImageEntity.getLinkByRel('alternate').href;
				userProfilePath = userProfileEntity.properties.path;
				onlineStatus = userProfileEntity.properties.isOnline;
			}
			return {
				canonicalUserHref,
				displayName,
				emailPath,
				onlineStatus,
				orgDefinedId,
				pagerPath,
				userProfileImage,
				userProfilePath
			};
		}

		return undefined;
	}

	async getProfileCardSettings() {
		const settingsHref = 'https://users.api.proddev.d2l/settings/userProfileCard';
		const profileSettingsEntity = await this._getEntityFromHref(settingsHref, false);
		if (profileSettingsEntity && profileSettingsEntity.properties) {
			return profileSettingsEntity.properties;
		}
		return {
			showPicture: false,
			showTagline: false,
			showHomepageUrl: false,
			showSocial: false,
			showOnlineStatus: false,
			showRole: false,
			showBadgeTrophy: false,
			showOrgDefinedId: false
		};
	}

	async _getEntityFromHref(targetHref, bypassCache) {
		return await window.D2L.Siren.EntityStore.fetch(targetHref, this.token, bypassCache);
	}
}
