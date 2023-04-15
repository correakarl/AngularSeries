const mongoose = require('mongoose');
const { Schema } = mongoose;

const imgSchema = Schema({
    img: { type: String },
    path: { type: String },
});

const categorySchema = Schema({
    catName: { type: String, required: true },
    catImg: { type: imgSchema, required: true },
});

const serieSchema = new Schema({
    title: { type: String, required: true },
    thumbnail: { type: imgSchema },
    gallery: [{ type: imgSchema }],
    category: [{ type: categorySchema, required: true }],
    chapters: { type: Number, required: true },
    emissionYear: { type: Number, required: true },
    resume: { type: String, required: true, default: null },
});

module.exports = mongoose.model("Serie", serieSchema, "series2023");
