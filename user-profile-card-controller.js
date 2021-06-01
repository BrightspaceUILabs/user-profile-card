import 'd2l-polymer-siren-behaviors/store/entity-store.js';
import { Rels } from 'd2l-hypermedia-constants';

export class UserProfileCardController {
	constructor(userHref, token) {
		if (!userHref) {
			throw new Error('D2L-Labs-Profile-Card: No User HREF Provided');
		}

		if (typeof userHref !== 'string') {
			throw new Error('D2L-Labs-Profile-Card: Invalid User HREF Type');
		}

		this.userHref = userHref;
		this.token = token;
	}

	async getEnrolledUser() {
		const root = await this._getRootEntity(false);
		if (root && root.entity) {
			if (this.userHref) {
				const enrolledUserEntity = await this._getEntityFromHref(this.userHref, false);
				const canonicalUserHref = enrolledUserEntity.entity.getLinkByRel(Rels.Users.canonicalUser).href;
				const pagerEntity = enrolledUserEntity.entity.getSubEntityByRel(Rels.pager);
				const emailEntity = enrolledUserEntity.entity.getSubEntityByRel(Rels.email, false);
				const userProfileEntity = enrolledUserEntity.entity.getSubEntityByRel(Rels.userProfile);
				const displayNameEntity = enrolledUserEntity.entity.getSubEntityByRel(Rels.displayName);
				//const userProgressEntity = root.entity.getSubEntityByRel(userProgressAssessmentsRel, false);

				let displayName = undefined;
				let pagerPath = undefined;
				//let userProgressPath = undefined;
				let emailPath = undefined;
				let userProfilePath = undefined;
				let onlineStatus = undefined;
				let userProfileImage = undefined;

				if (displayNameEntity) {
					displayName = displayNameEntity.properties.name;
				}
				if (pagerEntity) {
					pagerPath = pagerEntity.properties.path;
				}
				/* if (userProgressEntity) {
					userProgressPath = userProgressEntity.properties.path;
				} */
				if (emailEntity) {
					emailPath = emailEntity.properties.path;
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
					pagerPath,
					userProfileImage,
					//userProgressPath,
					userProfilePath
				};
			}

			return undefined;
		}
	}

	async _getEntityFromHref(targetHref, bypassCache) {
		return await window.D2L.Siren.EntityStore.fetch(targetHref, this.token, bypassCache);
	}

	_getHref(root, rel) {
		if (root.hasLinkByRel(rel)) {
			return root.getLinkByRel(rel).href;
		}
		return undefined;
	}

	// these are in their own methods so that they can easily be stubbed in testing
	async _getRootEntity(bypassCache) {
		return await window.D2L.Siren.EntityStore.fetch(this.userHref, this.token, bypassCache);
	}
}
