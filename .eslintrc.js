// module.exports = {
// 	root: true,
// 	rules: {
// 		'no-unused-expressions': 2,
// 		semi: ['error', 'always'],
// 		quotes: ['error', 'single']
// 	},
// 	extends: 'eslint:recommended',
// 	plugins: []
// };

module.exports = {
	root: true,
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: { project: ['./tsconfig.json'] },
	plugins: ['@typescript-eslint'],
	rules: {
		'@typescript-eslint/strict-boolean-expressions': [
			2,
			{
				allowString: false,
				allowNumber: false
			}
		],
		'no-unused-vars': 'error'
	},
	ignorePatterns: ['src/**/*.test.ts', 'src/frontend/generated/*']
};
