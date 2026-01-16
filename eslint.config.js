//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
    ...tanstackConfig,
    {
        ignores: [
            ".output/**",
            ".vinxi/**",
            "dist/**",
            "eslint.config.js",
            "prettier.config.js",
            "vite.config.ts"
        ]
    }
]
