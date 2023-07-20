const mongoose = require('mongoose');
const User = require('./userModel');
const Product = require('./productModel');

const reviewSchema = new mongoose.Schema(
    {
      review: {
        type: String,
        required: [true, 'Review can not be empty!']
      },
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required:[true,'Review must belong to a product']
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require:[true,'Review must belong to a user']
      }
},{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

reviewSchema.pre(/^find/,function(next){
  this.populate({
    path:'user',
    select:'fullName image'
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function(productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId }
    },
    {
      $group: {
        _id: '$product',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
  // console.log(stats);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};

reviewSchema.post('save', function() {
  // this points to current review
  this.constructor.calcAverageRatings(this.product);
});

// findByIdAndUpdate
// findByIdAndDelete
/*reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.findOne();
  // console.log(this.r);
  next();
});*/



const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;