
const database = {
  MONGO_URI: process.env.MONGODB_URI
};

// const serverport = {
//   PORT: process.env.PORT,
// };

const secretKey = {
  JWT_SECRET: process.env.JWT_SECRET,
};

export { database ,secretKey};