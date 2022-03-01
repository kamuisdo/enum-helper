import typescript from 'rollup-plugin-typescript2';

export default {
	input: 'src/index.ts',
	output: [
		{ file: 'dist/index.umd.js',name:'enum-helper', format: 'umd', sourcemap: true },
		{ file: 'dist/index.es5.js', format: 'es', sourcemap: true },
		{ file: 'dist/index.js', format: 'cjs', sourcemap: true },
	],
	plugins: [
		typescript(/*{ plugin options }*/)
	]
}
