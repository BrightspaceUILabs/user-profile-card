import { UserProfileCardController, UserProfileCardControllerErrors } from '../user-profile-card-controller';
import { assert } from '@open-wc/testing';
import { Rels } from 'd2l-hypermedia-constants';
import sinon from 'sinon';

describe('instantiates properly and throws the correct errors', () => {
	it('accepts a proper href and token string', () => {
		assert.doesNotThrow(() => {
			new UserProfileCardController('href', 'token');
		});
	});

	it('throws an error when empty string given for href', () => {
		assert.throws(() => {
			new UserProfileCardController('', 'token');
		}, UserProfileCardControllerErrors.MISSING_BASE_HREF);
	});

	it('throws an error for null href', () => {
		assert.throws(() => {
			new UserProfileCardController(null, 'token');
		}, UserProfileCardControllerErrors.MISSING_BASE_HREF);
	});

	it('throws an error for non string href', () => {
		assert.throws(() => {
			new UserProfileCardController(20, 'token');
		}, UserProfileCardControllerErrors.INVALID_TYPE_BASE_HREF);
	});
});

describe('getEnrolledUser', () => {
	it('gets correct enrolled user info', async() => {
		const canonicalUserHref = 'canonicalUserHref';
		const enrolledUserHref = 'enrolledUserHref';
		const emailPath = 'emailPath';
		const isOnline = 'isOnline';
		const pagerPath = 'pagerPath';
		const orgDefinedId = 'orgDefinedId';
		const userProfileImage = 'userProfileImage';
		const userProfilePath = 'userProfilePath';
		const displayName = 'displayName';

		const controller = new UserProfileCardController(enrolledUserHref, 'token');

		sinon.stub(controller, '_getEntityFromHref').returns({
			entity: {
				getSubEntityByRel: (r) => {
					if (r === Rels.pager) {
						return { properties: { path: pagerPath } };
					} else if (r === Rels.email) {
						return { properties: { path: emailPath } };
					} else if (r === Rels.displayName) {
						return { properties: { name: displayName } };
					} else if (r === Rels.orgDefinedId) {
						return { properties: { orgDefinedId: orgDefinedId } };
					} else if (r === Rels.userProfile) {
						return {
							properties:
								{
									path: userProfilePath,
									isOnline: isOnline
								},
							getSubEntityByRel: (r) => {
								if (r === Rels.profileImage) {
									return {
										getLinkByRel: (r) => {
											if (r === 'alternate') {
												return { href: userProfileImage };
											}
										}
									};
								}
							}
						};
					}
				},
				getLinkByRel: (r) => {
					if (r === Rels.Users.canonicalUser) {
						return { href: canonicalUserHref };
					}
				}
			}
		});

		const enrolledUser = await controller.getEnrolledUser();
		assert.equal(enrolledUser.canonicalUserHref, canonicalUserHref);
		assert.equal(enrolledUser.displayName, displayName);
		assert.equal(enrolledUser.emailPath, emailPath);
		assert.equal(enrolledUser.onlineStatus, isOnline);
		assert.equal(enrolledUser.orgDefinedId, orgDefinedId);
		assert.equal(enrolledUser.pagerPath, pagerPath);
		assert.equal(enrolledUser.userProfilePath, userProfilePath);
		assert.equal(enrolledUser.userProfileImage, userProfileImage);
	});
});

describe('getProfileCardSettings', () => {
	it('gets the profile card settings', async() => {
		const testCardSettings = {
			showPicture: true,
			showTagline: false,
			showHomepageUrl: true,
			showSocial: true,
			showOnlineStatus: true,
			showRole: true,
			showBadgeTrophy: false,
			showOrgDefinedId: true
		};
		const controller = new UserProfileCardController('href', 'token');
		sinon.stub(controller, '_getEntityFromHref').returns({ properties: testCardSettings });

		const profileCardSettings = await controller.getProfileCardSettings();
		assert.deepEqual(profileCardSettings, testCardSettings);
	});

	it('fails closed when settings are not available', async() => {
		const closedCardSettings = {
			showPicture: false,
			showTagline: false,
			showHomepageUrl: false,
			showSocial: false,
			showOnlineStatus: false,
			showRole: false,
			showBadgeTrophy: false,
			showOrgDefinedId: false
		};

		const controller = new UserProfileCardController('href', 'token');
		sinon.stub(controller, '_getEntityFromHref').returns(undefined);

		const profileCardSettings = await controller.getProfileCardSettings();
		assert.deepEqual(profileCardSettings, closedCardSettings);
	});
});
