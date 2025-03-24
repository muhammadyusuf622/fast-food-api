import app from "./app.js";

app.listen(3000, (err) => {
  if(err) console.log(err.message);
  console.log(`http://localhost:${3000}`);
})