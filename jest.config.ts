import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  verbose: true,
};

export default config;
