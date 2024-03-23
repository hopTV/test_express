const { notFound, errHandler } = require("../middlewares/errorHandle");
const userRouter = require("./user");
const productRouter = require("./product");
const categoryRouter = require("./category");
const blogCategoryRouter = require("./blogCategory");
const blogRouter = require("./blog");

const initRouter = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/category", blogCategoryRouter);
  app.use("/api/blog", blogRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRouter;
