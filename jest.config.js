import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./", // raiz do projeto Next
});

const customJestConfig = {
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.tsx"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};

// 🔑 export ESM
export default createJestConfig(customJestConfig);
