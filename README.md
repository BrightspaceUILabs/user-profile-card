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
> - [ ] [Accessibility tests](https://github.com/BrightspaceUI/guide/wiki/Testing#automated-accessibility-testing-with-axe)
> - [ ] [Visual diff tests](https://github.com/BrightspaceUI/visual-diff)
> - [ ] [Localization](https://github.com/BrightspaceUI/guide/wiki/Localization) with Serge (if applicable)
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
<d2l-labs-user-profile-card online user-attributes=["Adminstrator","she/her"]>
    <img slot="illustration" src="maya.jpg" width="116px" height="116px" />
    Maya Jones
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
|user-attributes|Array|A list of attributes for the user such as role and pronouns|
|progress-viewable|Boolean|Whether the current viewer can access the users progress|
|editable|Boolean|Whether the tagline is editable by the current viewer|
|tagline|String|The tagling for the user|


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

```shell
# run visual-diff tests
npm run test:diff

# subset of visual-diff tests:
npm run test:diff -- -g some-pattern

# update visual-diff goldens
npm run test:diff:golden
```

Golden snapshots in source control must be updated by Travis CI. To trigger an update, press the "Regenerate Goldens" button in the pull request `visual-difference` test run.

## Versioning, Releasing & Deploying

All version changes should obey [semantic versioning](https://semver.org/) rules.

Releases use the [semantic-release](https://semantic-release.gitbook.io/) tooling and the [angular preset](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) for commit message syntax. Upon release, the version in `package.json` is updated, a tag and GitHub release is created and a new package will be deployed to NPM.

Commits prefixed with `feat` will trigger a minor release, while `fix` or `perf` will trigger a patch release. A commit containing `BREAKING CHANGE` will cause a major release to occur.

Other useful prefixes that will not trigger a release: `build`, `ci`, `docs`, `refactor`, `style` and `test`. More details in the [Angular Contribution Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type).
