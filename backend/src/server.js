const connect = require("./configs/db");
const app = require("./index");

app.listen(8080, async () => {
  try {
    await connect();
    console.log("MongoDb connected");
  } catch (error) {
    console.log(error);
  }
  console.log("listening on port 8080");
});
