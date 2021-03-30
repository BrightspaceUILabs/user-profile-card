# d2l-labs-user-profile-card

[![NPM version](https://img.shields.io/npm/v/@brightspace-ui-labs/user-profile-card.svg)](https://www.npmjs.org/package/@brightspace-ui-labs/user-profile-card)

> Note: this is a ["labs" component](https://github.com/BrightspaceUI/guide/wiki/Component-Tiers). While functional, these tasks are prerequisites to promotion to BrightspaceUI "official" status:
>
> - [ ] [Design organization buy-in](https://github.com/BrightspaceUI/guide/wiki/Before-you-build#working-with-design)
> - [ ] [design.d2l entry](http://design.d2l/)
> - [ ] [Architectural sign-off](https://github.com/BrightspaceUI/guide/wiki/Before-you-build#web-component-architecture)
> - [ ] [Continuous integration](https://github.com/BrightspaceUI/guide/wiki/Testing#testing-continuously-with-travis-ci)
> - [ ] [Cross-browser testing](https://github.com/BrightspaceUI/guide/wiki/Testing#cross-browser-testing-with-sauce-labs)
> - [ ] [Unit tests](https://github.com/BrightspaceUI/guide/wiki/Testing#testing-with-polymer-test) (if applicable)
> - [x] [Accessibility tests](https://github.com/BrightspaceUI/guide/wiki/Testing#automated-accessibility-testing-with-axe)
> - [x] [Visual diff tests](https://github.com/BrightspaceUI/visual-diff)
> - [x] [Localization](https://github.com/BrightspaceUI/guide/wiki/Localization) with Serge (if applicable)
> - [x] Demo page
> - [x] README documentation

Daylight user profile card.

<img src="/screenshots/screenshot.png" alt="Screenshot of profile card"/>

## Installation

To install from NPM:

```shell
npm install @brightspace-ui-labs/user-profile-card
```

## Usage

```html
<script type="module">
    import '@brightspace-ui-labs/user-profile-card/user-profile-card.js';
</script>
<d2l-labs-user-profile-card online
    display-name="Maya Jones"
    user-attributes=["Adminstrator","she/her"]
    token="sometoken"
    href="somehref">
    <img slot="illustration" src="maya.jpg" width="116px" height="116px" />
    <div slot="tagline">I am a tagline!</div>
    <d2l-link href="#" slot="website">www.mayaSuperWebsite.com</d2l-link>
    <div slot="social-media-icons">
        <d2l-icon icon="tier2:save"></d2l-icon>
        <d2l-icon icon="tier2:browser"></d2l-icon>
        <d2l-icon icon="tier2:send"></d2l-icon>
    </div>
</d2l-labs-user-profile-card>
```

**Properties:**

| Property | Type | Description |
|--|--|--|
|online|Boolean|Whether the user is currently online|
|display-name|String|Name to be displayed for user|
|user-attributes|Array|A list of attributes for the user such as role and pronouns|
|show-email|Boolean|Whether the current viewer can send emails to this user|
|show-im|Boolean|Whether the current viewer can send instant messages to this user|
|show-progress|Boolean|Whether the current viewer can access the users progress|
|editable|Boolean|Whether the tagline is editable by the current viewer|
|tagline|String|The tagline for the user|
|small-opener|Boolean|Use a small user-avatar for the opener (defaults to medium)|
|medium-opener|Boolean|Use a medium user-avatar for the opener (default)|
|large-opener|Boolean|Use a large user-avatar for the opener (defaults to medium)|
|xlarge-opener|Boolean|Use an extra-large user-avatar for the opener (defaults to medium)|
|href|String|Hypermedia href for [user-profile-image](https://github.com/BrightspaceHypermediaComponents/users/blob/master/components/d2l-profile-image-base.js) opener|
|token|String/Object|token for [user-profile-image](https://github.com/BrightspaceHypermediaComponents/users/blob/master/components/d2l-profile-image-base.js) opener|

**Accessibility:**

To make your usage of `d2l-labs-user-profile-card` accessible, use the following properties when applicable:

| Attribute | Description |
|--|--|
| | |

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

### Running the demos

To start an [es-dev-server](https://open-wc.org/developing/es-dev-server.html) that hosts the demo page and tests:

```shell
npm start
```

### Linting

```shell
# eslint and lit-analyzer
npm run lint

# eslint only
npm run lint:eslint

# lit-analyzer only
npm run lint:lit
```

### Testing

```shell
# lint, unit test and visual-diff test
npm test

# lint only
npm run lint

# unit tests only
npm run test:headless

# debug or run a subset of local unit tests
# then navigate to `http://localhost:9876/debug.html`
npm run test:headless:watch
```

### Visual Diff Testing

This repo uses the [@brightspace-ui/visual-diff utility](https://github.com/BrightspaceUI/visual-diff/) to compare current snapshots against a set of golden snapshots stored in source control.

The golden snapshots in source control must be updated by Github Actions.  If your PR's code changes result in visual differences, a PR with the new goldens will be automatically opened for you against your branch.

If you'd like to run the tests locally to help troubleshoot or develop new tests, you can use these commands:

```shell
# Install dependencies locally
npm i mocha -g
npm i @brightspace-ui/visual-diff puppeteer --no-save
# run visual-diff tests
mocha './test/**/*.visual-diff.js' -t 10000
# subset of visual-diff tests:
mocha './test/**/*.visual-diff.js' -t 10000 -g some-pattern
# update visual-diff goldens
mocha './test/**/*.visual-diff.js' -t 10000 --golden
```

## Versioning & Releasing

> TL;DR: Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `master`. Read on for more details...

The [sematic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/master/semantic-release) is called from the `release.yml` GitHub Action workflow to handle version changes and releasing.

### Version Changes

All version changes should obey [semantic versioning](https://semver.org/) rules:
1. **MAJOR** version when you make incompatible API changes,
2. **MINOR** version when you add functionality in a backwards compatible manner, and
3. **PATCH** version when you make backwards compatible bug fixes.

The next version number will be determined from the commit messages since the previous release. Our semantic-release configuration uses the [Angular convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) when analyzing commits:
* Commits which are prefixed with `fix:` or `perf:` will trigger a `patch` release. Example: `fix: validate input before using`
* Commits which are prefixed with `feat:` will trigger a `minor` release. Example: `feat: add toggle() method`
* To trigger a MAJOR release, include `BREAKING CHANGE:` with a space or two newlines in the footer of the commit message
* Other suggested prefixes which will **NOT** trigger a release: `build:`, `ci:`, `docs:`, `style:`, `refactor:` and `test:`. Example: `docs: adding README for new component`

To revert a change, add the `revert:` prefix to the original commit message. This will cause the reverted change to be omitted from the release notes. Example: `revert: fix: validate input before using`.

### Releases

When a release is triggered, it will:
* Update the version in `package.json`
* Tag the commit
* Create a GitHub release (including release notes)
* Deploy a new package to NPM

### Releasing from Maintenance Branches

Occasionally you'll want to backport a feature or bug fix to an older release. `semantic-release` refers to these as [maintenance branches](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration#maintenance-branches).

Maintenance branch names should be of the form: `+([0-9])?(.{+([0-9]),x}).x`.

Regular expressions are complicated, but this essentially means branch names should look like:
* `1.15.x` for patch releases on top of the `1.15` release (after version `1.16` exists)
* `2.x` for feature releases on top of the `2` release (after version `3` exists)
