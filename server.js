const app = require("./index");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/notely";
  await mongoose.connect(MONGODB_URI);
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server Listening on Port : ${PORT}`);
});
