import mongoose from "mongoose";

async function connect() {
  const dbUri = process.env.DBURI as string

  try {
    await mongoose.connect(dbUri);
    console.log("DB connected");
  } catch (error) {
    console.error("Could not connect to db");
    process.exit(1);
  }
}

export default connect;