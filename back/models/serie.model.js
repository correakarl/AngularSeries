const mongoose = require('mongoose');
const { Schema } = mongoose;

const imgSchema = new Schema({
    img: { type: String },
});

const categorySchema = new Schema({
    catName: { type: String },
    catImg: { type: imgSchema },
});

const serieSchema = new Schema({
    title: { type: String, required: true },
    thumbnail: { type: imgSchema },
    gallery: { type: [imgSchema] },
    category: { type: [categorySchema], sparse: true },
    chapters: { type: Number },
    emissionYear: { type: Number} ,
    resume: { type: String, required: true, default: null },
});

//serieSchema.index({ 'category.catName': 1 }, { unique: true });

module.exports = mongoose.model("Serie", serieSchema, "series");
