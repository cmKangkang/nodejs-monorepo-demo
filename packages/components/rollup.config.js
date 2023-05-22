import dts from 'rollup-plugin-dts'
import npm from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import json from '@rollup/plugin-json'
// import alias from '@rollup/plugin-alias'
// import esbuild from 'rollup-plugin-esbuild'
import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'

import pkg from './package.json' assert { type: 'json' }

export default [
  // dts
  {
    input: './index.ts',
    output: {
      file: pkg.types,
      format: 'es',
    },
    plugins: [dts()],
  },

  // code
  {
    input: './index.ts',
    output: [
      // cjs
      {
        file: pkg.main,
        format: 'cjs',
        indent: false,
        // exports: 'default',
      },
      {
        file: pkg.module,
        format: 'es',
        indent: false,
      },
      // {
      //   file: pkg.unpkg,
      //   format: "umd",
      //   name: "PangJuUtils",
      //   globals: {},
      //   plugins: []
      // }
    ],
    plugins: [
      // 解析第三方模块
      npm({ modulesOnly: true, extensions: ['.js', '.ts', '.jsx', '.tsx'] }),
      // commonjs模块转es6模块
      commonjs({ extensions: ['.js', '.ts'] }),
      typescript(),
      // 配置babel
      babel({
        exclude: '**/node_modules/**',
        babelHelpers: 'runtime',
        extensions: ['.js', '.ts'],
      }),
      // 代码压缩
      // terser({
      //     compress: {
      //         // 去除 console
      //         drop_console: true,
      //         pure_getters: true,
      //         unsafe: true,
      //         unsafe_comps: true,
      //         warnings: false
      //     },
      // }),
    ],
  },
]
