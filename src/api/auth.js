import api from "./api";

export async function registerUser(payload) {
  const res = await api.post("/users", payload);
  return res.data;
}

export async function loginUser({ email, password }) {
  const res = await api.get("/users", {
    params: {
      email,
    },
  });

  const users = res.data;

  if (!users || users.length === 0) {
    throw new Error("此帳號尚未註冊");
  }

  const user = users[0];

  if (user.password !== password) {
    throw new Error("密碼錯誤");
  }

  return user;
}
