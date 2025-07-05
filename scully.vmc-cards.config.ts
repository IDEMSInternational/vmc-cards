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
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
    // This helps with cleanup
    handleSIGINT: false,
    handleSIGTERM: false,
  },
  // Force process exit after completion
  hostName: "localhost",
  // Add this to help with hanging
  maxRenderThreads: 1,
};
