# Contributing Guide

Thanks for your interest in improving this project.

## Development Workflow

1. Fork the repository.
2. Create a feature branch from `main`.
3. Make focused changes with clear commit messages.
4. Test locally before opening a pull request.
5. Open a PR with context, screenshots (if UI changes), and testing notes.

## Local Setup

```bash
git clone https://github.com/ManikantaPerla07/Zerodha
cd Zerodha

npm install --prefix backend
npm install --prefix dashboard
npm run build --prefix dashboard
node backend/index.js
```

## Pull Request Checklist

- Keep PR scope small and focused.
- Update documentation when behavior changes.
- Do not commit credentials or `.env` files.
- Ensure build still succeeds:

```bash
npm run build --prefix dashboard
```

## Code Style

- Keep naming descriptive and consistent.
- Avoid large unrelated refactors in feature PRs.
- Prefer readable, maintainable code over clever shortcuts.

## Security

If you discover a security issue, do not open a public issue with secrets.
Share details privately with the repository owner.
