# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

### Added
- Professional README structure with architecture, API docs, deployment, and troubleshooting.
- Screenshots scaffold under `docs/screenshots/`.
- Contribution guide (`CONTRIBUTING.md`).

### Changed
- Dashboard API calls now support same-origin fallback when `REACT_APP_API_URL` is unset.
- Backend startup made resilient when `MONGO_URL` is missing.
- Express SPA catch-all route updated for Express 5 compatibility.
- Render build process hardened with clean dependency install.

### Security
- Removed tracked backend `.env` from repository.
- Added `backend/.env.example` for safe environment setup.

## [Initial]
- Initial full-stack Zerodha clone with React dashboard and Express backend.
