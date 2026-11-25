import connectDB from "./src/db/dbConnection.js";
import app from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is listening at port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
