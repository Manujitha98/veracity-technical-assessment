const jwt = require("jsonwebtoken");
//export function to generate auth token

export default function generateAuthToken(user) {
  const token = jwt.sign(
    {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "1h" }
  );
  return token;
}
