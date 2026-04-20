import { getLocalStorage, removeLocalStorage } from "./local-storage"

export function useAuth() {
  const user = getLocalStorage("user")
  const token = getLocalStorage("token")
  const isAuthenticated = user && token && user.token === token

  function logout() {
    removeLocalStorage("user")
    removeLocalStorage("token")
  }

  return { isAuthenticated, user, logout }
}