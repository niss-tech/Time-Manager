import { app } from "./app.js";
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });

app.listen(PORT, () => console.log(`🚀 API running on port ${PORT}`));
