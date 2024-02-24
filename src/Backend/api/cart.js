import {connectDB} from "@/Backend/mongoose";
import {Product} from "@/Backend/Schemas/Product";

export default async function handle(req,res) {
  await connectDB();
  const ids = req.body.ids;
  res.json(await Product.find({_id:ids}));
}