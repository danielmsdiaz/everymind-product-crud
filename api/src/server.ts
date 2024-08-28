import express from  "express"
import dotenv from "dotenv"
import cors from "cors"
import productRoutes from "./routes/apiRoutes";

dotenv.config();
const server = express();

server.use(cors());
server.use(express.urlencoded({extended: true}));
server.use(express.json());
server.use("/api", productRoutes);

server.listen(process.env.PORT, () => {
    console.log(`Escutando a porta ${process.env.PORT}`);
});

export default server