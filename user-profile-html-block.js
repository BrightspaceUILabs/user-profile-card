
let profileCardAccess;
const hasProfileCardAccess = () => {
	if (profileCardAccess) return profileCardAccess;

	profileCardAccess = new Promise(resolve => {

		if (!D2L.LP) {
			resolve(false);
			return;
		}

		D2L.LP.Web.UI.Rpc.Connect(
			D2L.LP.Web.UI.Rpc.Verbs.GET,
			new D2L.LP.Web.Http.UrlLocation('/d2l/lp/profilecardsaccess/AccessCheck'),
			null,
			{ success: response => resolve(response) }
		);
	});

	return profileCardAccess;
};

export async function htmlBlockUserProfileRenderer(elem) {

	const mentions = elem.querySelectorAll('[data-mentions-id]');
	if (mentions.length === 0) return elem;

	const hasAccess = await hasProfileCardAccess();
	if (!hasAccess) return elem;

	mentions.forEach(mention => {

		const userId = mention.getAttribute('data-mentions-id');
		if (!userId) return;

		const anchor = document.createElement('a');
		anchor.href = `/d2l/lp/profilecardsaccess/UserProfile?userId=${parseInt(userId)}`;
		anchor.target = '_blank';
		anchor.innerText = mention.innerText;

		mention.innerText = '';
		mention.appendChild(anchor);

	});

	return elem;

}
