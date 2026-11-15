import next from "eslint-config-next";

const config = [
  ...next,
  {
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;
