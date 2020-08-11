//database connection

module.exports = (mongoose, config) => {
  const database = mongoose.connection;

  //set our Mongoose promise library to Promise
  mongoose.Promise = Promise;
  mongoose.connect(config.database, {
    useMongoClient: true,
    promiseLibrary: global.Promise
  });
  //do a standard mongoose connection.
  database.on('error', error => console.log(`Connection to BudgetManager database failed: ${error}`));
  database.on('connected', () => console.log('Connected to BudgetManager database'));
  database.on('disconnected', () => console.log('Disconnected from BudgetManager database'));
  process.on('SIGINT', () => {
    database.close(() => {
      console.log('BudgetManager terminated, connection closed');
      process.exit(0);
    })
  });
};
