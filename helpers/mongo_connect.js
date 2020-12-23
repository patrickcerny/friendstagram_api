//#endregion

mongoose.connection.on("connected", () => {
  console.log("mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoose connection is disconnected");
});

process.on("SIGNIN", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
