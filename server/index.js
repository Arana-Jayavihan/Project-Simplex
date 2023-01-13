import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import dotenv from "dotenv/config";
import cors from "cors";
import logger from "./utils/logger.js";
import { connect } from "./utils/dbConection.js";

//Routes
import userRoutes from "./routes/UserRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";
import InvProductroutest from "../server/routes/InvProductroutes.js";
//import categoryRoutes from "./routes/CategoryRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
//import initDataRoutes from "./routes/initialDataRoutes.js";
import FAQs from "./routes/customerService.routes/FAQs.js";
import ContactUs from "./routes/contactUs.routes/contactUs.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
//import productRoutes from "./routes/ProductRoutes.js";
import initDataRoutes from "./routes/initialDataRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import orderadminRoutes from "./routes/order.adminRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
const filePath = fileURLToPath(import.meta.url);
const dirName = path.dirname(filePath);

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.static(path.join(dirName, "uploads")));

app.use(InvProductroutest);
// app.use('/api', userRoutes)
// app.use('/api', adminRoutes)
// app.use('/api', categoryRoutes)
// app.use('/api', productRoutes)
// app.use('/api', initDataRoutes)

app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", initDataRoutes);
app.use("/api", cartRoutes);
app.use("/api", initDataRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", orderadminRoutes);
//app.use("/unregCus", unregisteredCustomerRoutes);

//FAQs
app.use("/api/FAQs", FAQs);

//Contact-Us
app.use("/api/Contacts", ContactUs);

const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  logger.info(`Server is up and runnig on : ${PORT} 🚀🚀🚀`);
  connect();
});
