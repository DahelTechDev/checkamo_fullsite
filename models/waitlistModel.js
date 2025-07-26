const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Full name cannot exceed 100 characters']
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    // match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  
  address: {
    type: String,
    default: null,
    trim: true,
    maxlength: [200, 'Address cannot exceed 200 characters']
  },
  
  interests: [{
    type: String,
    required: true,
  }],
  
  industry: {
    type: String,
    required: [true, 'Industry is required'],
  },
  
  language: {
    type: String,
    required: [true, 'Language preference is required'],
    default: 'English'
  },
  
  wantToBeVerifier: {
    type: String,
    required: [true, 'Verifier preference is required'],
    enum: ['yes', 'no'],
    lowercase: true
  },
  
  // This field is only populated if wantToBeVerifier is 'yes'
  verifierLocations: [{
    type: String,
    trim: true,
    validate: {
      validator: function(locations) {
        // Only validate if user wants to be verifier
        if (this.wantToBeVerifier === 'yes') {
          return locations && locations.length > 0;
        }
        return true;
      },
      message: 'At least one location is required for verifiers'
    }
  }],
  
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  
  position: {
    type: Number,
    default: 0
  },
  
  joinedAt: {
    type: Date,
    default: Date.now
  },
  
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Pre-save middleware to update position and lastUpdated
waitlistSchema.pre('save', async function(next) {
  if (this.isNew) {
    // Set position for new entries
    const count = await this.constructor.countDocuments();
    this.position = count + 1;
  }
  this.lastUpdated = new Date();
  next();
});

// Index for better query performance
waitlistSchema.index({ position: 1 });
waitlistSchema.index({ status: 1 });
waitlistSchema.index({ wantToBeVerifier: 1 });

// Virtual for displaying formatted join date
waitlistSchema.virtual('formattedJoinDate').get(function() {
  return this.joinedAt.toLocaleDateString();
});

module.exports = mongoose.model('Waitlist', waitlistSchema);