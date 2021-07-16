import 'd2l-polymer-siren-behaviors/store/entity-store.js';
import { Rels } from 'd2l-hypermedia-constants';

export const UserProfileCardControllerErrors = {
	MISSING_BASE_HREF: 'D2L-Labs-Profile-Card: No User HREF Provided',
	INVALID_TYPE_BASE_HREF: 'D2L-Labs-Profile-Card: Invalid User HREF Type'
};
export class UserProfileCardController {

	static getDefaultProfileCardSettings() {
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
			const userProfileCardSettingsHref = enrolledUserEntity.entity.getLinkByRel(Rels.Users.settingsProfileCard).href;
			const userPronounEntity = enrolledUserEntity.entity.getSubEntityByRel(Rels.userPronouns);

			let displayName = undefined;
			let emailPath = undefined;
			let onlineStatus = undefined;
			let orgDefinedId = undefined;
			let pagerPath = undefined;
			let userProfileImage = undefined;
			let userProfilePath = undefined;
			let userProfileSettings = UserProfileCardController.getDefaultProfileCardSettings();
			let pronouns = undefined;

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
			if (userPronounEntity) {
				pronouns = userPronounEntity.properties.pronouns;
			}

			if (userProfileCardSettingsHref) {
				const profileSettingsEntity = await this._getEntityFromHref(userProfileCardSettingsHref, false);
				if (profileSettingsEntity && profileSettingsEntity.entity && profileSettingsEntity.entity.properties) {
					userProfileSettings = profileSettingsEntity.entity.properties;
				}
			}

			return {
				canonicalUserHref,
				displayName,
				emailPath,
				onlineStatus,
				orgDefinedId,
				pagerPath,
				userProfileImage,
				userProfilePath,
				pronouns,
				userProfileSettings
			};
		}

		return undefined;
	}

	async _getEntityFromHref(targetHref, bypassCache) {
		return await window.D2L.Siren.EntityStore.fetch(targetHref, this.token, bypassCache);
	}
}
