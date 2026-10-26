import { defineConfig, devices } from "@playwright/test";
export default defineConfig({timeout:90000,testDir:"./tests/e2e",use:{baseURL:"http://127.0.0.1:3100",trace:"on-first-retry"},webServer:{command:"npm run dev -- -p 3100 -H 127.0.0.1",url:"http://127.0.0.1:3100",reuseExistingServer:false},projects:[{name:"chrome",use:{...devices["Desktop Chrome"],channel:"chrome"}}]});
