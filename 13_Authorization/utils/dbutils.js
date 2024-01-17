const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { ApiError } = require("../Errors/ApiError");

require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nxbmy8u.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const createUser = async (email, pass) => {
  try {
    await client.connect();
    console.log("connected");
    const users = client.db("authorization").collection("users");
    const user = await users.findOne({ email: email });
    if (user) throw new ApiError(400, "User already exist");
    await users.insertOne({
      email: email,
      pass: pass,
    });
    client.close();
    return {
      status: 200,
      message: "User succesfully created",
    };
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError)
      return {
        status: err.status,
        message: err.message,
      };
    return {
      status: 500,
      message: "server error",
    };
  }
}

const getUserByEmail = async (email) => {
  await client.connect();
  const users = client.db("authorization").collection("users");
  const user = await users.findOne({ email: email });
  client.close();
  return user; // null or user:{}
}

const getUserById = async (id) => {
  await client.connect();
  const users = client.db("authorization").collection("users");
  const user = await users.findOne({ _id: new ObjectId(id) });
  client.close();
  return user; // null or user:{}
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};