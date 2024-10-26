import Axios from "./Axios.js"

// Đăng ký người dùng mới
const registerService = async (user) => {
  const { data } = await Axios.post("/users", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

// Đăng xuất người dùng
const logoutService = () => {
  localStorage.removeItem("userInfo");
  return null;
}

// Đăng nhập người dùng
const loginService = async (user) => {
  const { data } = await Axios.post("/users/login", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

export { registerService, logoutService, loginService };
