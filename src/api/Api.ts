import axios from "axios";

const getToken = () => localStorage.getItem("authToken");

// const getToken =
//   "9d92b55c908c4080512fc428f3f461136b43eb81c17899cbc3c3e765a060b42ec2e6cf0ad46f172d65bb4e1973428c4ce4ac5322c7880328a074f63d4c90612f365ad153b116e4b3c1c4bd67b1deb9e4db575f0fde9c03ce01ebacb1dca5cd8a93792a384797a60739d9ea6abe6c6b012c0ab509250f84173668f359a0a6d5c5d0d2b9d4a29d30929fa422d9acd79db1af4f34a0bfc1ee6c9d77a96756106897c095663d9952d223bf314bf212648d030b31949a3de3a6496d6a8c3a43919f810ac772caa7dc7f48d87f087afa2b05f822b1c9666baecf905f948a1ac1da97514a797429ffd97d3e45741c4d62507ad622315b21409779968309a91c2a460921877f6e82cdc78d1c1bda97f9067de1fb253a6f86a37da34cdda4347330ddad4db6a98fd44d887bf173dd1e27a1a7ffcc7a0b655aded1b109";
export const api = axios.create({
  baseURL: "https://sonil-dev.void.co.mz/api/v4",
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    // const token = getToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
