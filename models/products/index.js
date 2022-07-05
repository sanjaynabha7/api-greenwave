const { Schema, model } = require('mongoose');

const ProductsSchema = new Schema({
    name: String,
    slug: String,
    permalink: String,
    type: String,
    status: String,
    featured: Boolean,
    catalog_visibility: String,
    description: String,
    short_description: String,
    sku: String,
    price: Number,
    regular_price: Number,
    sale_price: Number,
    on_sale: Boolean,
    purchasable: Boolean,
    total_sales: Number,
    stock_quantity: Object,
    stock_status: String,
    weight: String,
    dimensions: {
        length: String,
        width: String,
        height: String
    },
    average_rating: Number,
    rating_count: Number,
    related_ids: Array,
    categories: Array,
    tags: Array,
    images: [
        {
          src:  String,
          name:  String,
          alt:  String,
        }
      ],
    attributes: Array,
    default_attributes: Array,
    variations: Array,


}, { timestamps: { currentTime: () => Date.now() } });

module.exports = model('Products', ProductsSchema)

