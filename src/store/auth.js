import { apiAuth } from "../service/api";

export const user = "@auth/user";
export const token = "@auth/token";

export const isAuthenticated = () => !!sessionStorage.getItem(token);

export const getToken = () => sessionStorage.getItem(token);
export const getUser = () => JSON.parse(sessionStorage.getItem(user));

export const logout = () => {
  sessionStorage.removeItem(user);
  sessionStorage.removeItem(token);

  document.location.href = "/";
};
export const makeLogin = async (emailUser, pass) => {
  try {
    const response = await apiAuth.post("login", {
      email: emailUser,
      password: pass,
    });

    var data = response.data;
    sessionStorage.setItem(
      user,
      JSON.stringify({ email: data.email, user: data.username, id: data.id })
    );
    sessionStorage.setItem(token, data.token.token);

    window.location.reload();
  } catch (error) {
    return "Falha";
  }
};
