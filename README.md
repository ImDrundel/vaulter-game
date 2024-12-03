## Project Conventions

### Branch Naming Convention

```bash
git branch <category>/<description>
```

Where `category` is either:

- `feat` - adding, refactoring or removing a feature.
- `fix` - fixing a bug.

Where `description` has to:

1. Be kebab cased.
2. Shortly describe issue/feature.

Example:

```bash
git branch feature/create-new-button-component
git branch bugfix/button-overlap-form-on-mobile
```

### Commit Naming Convention

```bash
git commit -m '<category>: <description>; <description>; ...'
```

where `category` is either:

- `feat` - adding a new feature.
- `fix` - fixing a bug.
- `refactor` - changing code for peformance or convenience purpose.
- `chore` - everything else (writing documentation, formatting, adding tests, cleaning useless code etc.).

Where `description` has to:

1. Be a short statement describing the change.

Example:

```bash
git commit -m 'feat: add new button component; add new button components to templates'
git commit -m 'fix: add the stop directive to button component to prevent propagation'
git commit -m 'refactor: rewrite button component in TypeScript'
git commit -m 'chore: write button documentation'
```

<sub>Based on condensed [article](https://dev.to/varbsan/a-simplified-convention-for-naming-branches-and-commits-in-git-il4).</sub>
