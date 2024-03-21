const { notFound, errHandler } = require("../middlewares/errorHandle");
const userRouter = require("./user");

const initRouter = (app) => {
  app.use("/api/user", userRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRouter;
