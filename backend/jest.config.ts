import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["./tests"],
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,
};

export default config;
