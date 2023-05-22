import dts from 'rollup-plugin-dts'
import npm from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import json from '@rollup/plugin-json'
// import alias from '@rollup/plugin-alias'
// import esbuild from 'rollup-plugin-esbuild'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'

import pkg from './package.json' assert { type: 'json' }

export default [
  // dts
  // {
  //   input: './index.ts',
  //   output: {
  //     file: pkg.types,
  //     format: 'es',
  //   },
  //   plugins: [dts()],
  // },

  // code
  {
    input: './index.ts',
    output: [
      // cjs
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        // preserveModules: true,
        // preserveModulesRoot: ".", // 将保留的模块放在根级别的此路径下
        // indent: false,
        // exports: 'default',
      },
      {
        file: pkg.module,
        format: 'es',
        // indent: false,
      },
      // {
      //   file: pkg.unpkg,
      //   format: "umd",
      //   name: "PangJuUtils",
      //   globals: {},
      //   plugins: []
      // }
    ],
    external: ['react'],
    plugins: [
      postcss({
        extract: false,
        extensions: ['.css'],
      }),
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
      })
    ],
  },
]
