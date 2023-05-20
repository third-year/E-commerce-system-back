const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const { lookUpGeoJSON } = require("geojson-places");
const { lookUpRaw } = require("geojson-places");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter the product name"],
    },
    description: {
      type: String,
      required: [true, "Enter the product description"],
    },
    price: {
      type: Number,
      required: [true, "Enter the product price"],
    },
    image: {
      type: String,
      required: [true, "Enter the product image"],
    },
    quantity: {
      type: Number,
      required: [true, "Enter the product quantity"],
    },
    address: {
      type: [Number],
      required: [true, "Enter the product address"],
    },
    rating: {
      type: Number,
    },
    category: {
      type: String,
      enum: ["clothes"],
      required: [true, "Enter the product categorie"],
    },
    status: {
      type: String,
      enum: ["new", "old"],
      required: [true, "Enter the product status new or old"],
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.virtual("readableAddress").get(function () {
  // latitude/longitude
 // lookUpRaw(43.73828, 7.42542);
 return lookUpRaw(this.address[0], this.address[1]);
});
productSchema.plugin(mongoosePaginate);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
