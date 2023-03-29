const { PORT = 8080 } = "postgres://yiqomcrm:b5uJrZh72kiDfLzhUCVOA1faTZkPIuwP@otto.db.elephantsql.com/yiqomcrm";

const app = require("./app");
const knex = require("./db/connection");

const listener = () => console.log(`Listening on Port ${PORT}!`);

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch(console.error);
