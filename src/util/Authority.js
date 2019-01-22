export default function isAdmin() {
  if (sessionStorage.getItem("role") == 1) {
    return true;
  }
  return false;
}
