# Contributing to gh-streak

Thanks for your interest! Contributions of all sizes are welcome.

## Getting started

```bash
git clone https://github.com/hdsm55/gh-streak.git
cd gh-streak
npm test          # run the test suite
node bin/gh-streak.js hdsm55
```

No runtime dependencies — Node.js 18+ is all you need.

## Ways to help

- 🐛 Report bugs or suggest features via [issues](https://github.com/hdsm55/gh-streak/issues).
- 🧪 Add tests for edge cases (timezones, year boundaries, private-only accounts).
- 🌍 Improve the README or add translations.
- 🔧 Implement a roadmap item: `--since`/`--until` (done), green-square graph, Go/Rust ports.

## Pull request checklist

- [ ] `npm test` passes locally
- [ ] Code keeps zero runtime dependencies
- [ ] Public-data-only: never add auth tokens or private endpoints
- [ ] Update README if behaviour changes

## Code of conduct

Be kind and constructive. Harassment or spam is not tolerated.

## License

By contributing you agree your work is released under the [MIT License](./LICENSE).
