export function setEncodedPasswordCookie() {
  // Pre-encoded Base64 password for CTF
  const encodedPassword = "cGFzc3dvcmQ6UGFydHk=";

  // Set the encoded password in cookies with SameSite attribute
  document.cookie = `encodedPassword=${encodedPassword}; path=/; SameSite=Lax;`;
} 