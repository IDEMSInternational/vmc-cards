const cardRoutes: string[] = [];
for (const suit of ["C", "S", "H", "D"]) {
  for (let i = 1; i < 14; i++) {
    let value = "" + i;
    if (i === 1) value = "A";
    if (i === 11) value = "J";
    if (i === 12) value = "Q";
    if (i === 13) value = "K";
    cardRoutes.push(`/${value}${suit}`);
  }
}

import { ScullyConfig } from "@scullyio/scully";
export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "vmc-cards",
  outDir: "./dist/static",
  routes: {},
  extraRoutes: cardRoutes,
  puppeteerLaunchOptions: {
    executablePath: process.env.CHROMIUM_PATH || undefined,
  },
};
