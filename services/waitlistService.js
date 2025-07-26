const Waitlist = require('../models/waitlistModel');

// Create a new waitlist entry
const createWaitlistEntry = async (data) => {
  try {
    // Process the data to match our schema
    const processedData = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      interests: Array.isArray(data.interests) ? data.interests : [data.interests],
      industry: data.industry,
      language: data.language,
      wantToBeVerifier: data.wantToBeVerifier,
      verifierLocations: []
    };

    // If user wants to be a verifier, store locations in verifierLocations
    if (data.wantToBeVerifier === 'yes' && data.location) {
      processedData.verifierLocations = Array.isArray(data.location) 
        ? data.location 
        : [data.location];
    }

    const waitlistEntry = new Waitlist(processedData);
    const savedEntry = await waitlistEntry.save();
    
    return {
      success: true,
      data: savedEntry,
      message: 'Successfully joined the waitlist!'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: 'Failed to join waitlist'
    };
  }
};

// Get all waitlist entries
const getAllWaitlistEntries = async (filters = {}) => {
  try {
    const query = {};
    
    // Apply filters if provided
    if (filters.wantToBeVerifier) {
      query.wantToBeVerifier = filters.wantToBeVerifier;
    }
    
    if (filters.industry) {
      query.industry = new RegExp(filters.industry, 'i');
    }
    
    if (filters.language) {
      query.language = new RegExp(filters.language, 'i');
    }

    const entries = await Waitlist.find(query).sort({ createdAt: -1 });
    
    return {
      success: true,
      data: entries,
      count: entries.length,
      message: 'Waitlist entries retrieved successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: 'Failed to retrieve waitlist entries'
    };
  }
};

// Get waitlist entry by ID
const getWaitlistEntryById = async (id) => {
  try {
    const entry = await Waitlist.findById(id);
    
    if (!entry) {
      return {
        success: false,
        message: 'Waitlist entry not found'
      };
    }
    
    return {
      success: true,
      data: entry,
      message: 'Waitlist entry retrieved successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: 'Failed to retrieve waitlist entry'
    };
  }
};

// Get waitlist entry by email
const getWaitlistEntryByEmail = async (email) => {
  try {
    const entry = await Waitlist.findOne({ email: email.toLowerCase() });
    
    if (!entry) {
      return {
        success: false,
        message: 'Waitlist entry not found'
      };
    }
    
    return {
      success: true,
      data: entry,
      message: 'Waitlist entry retrieved successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: 'Failed to retrieve waitlist entry'
    };
  }
};

// Get waitlist statistics
const getWaitlistStats = async () => {
  try {
    const totalEntries = await Waitlist.countDocuments();
    const verifierCount = await Waitlist.countDocuments({ wantToBeVerifier: 'yes' });
    const nonVerifierCount = await Waitlist.countDocuments({ wantToBeVerifier: 'no' });
    
    // Get industry breakdown
    const industryStats = await Waitlist.aggregate([
      {
        $group: {
          _id: '$industry',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    // Get language breakdown
    const languageStats = await Waitlist.aggregate([
      {
        $group: {
          _id: '$language',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    return {
      success: true,
      data: {
        totalEntries,
        verifierCount,
        nonVerifierCount,
        industryBreakdown: industryStats,
        languageBreakdown: languageStats
      },
      message: 'Waitlist statistics retrieved successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: 'Failed to retrieve waitlist statistics'
    };
  }
};

module.exports = {
  createWaitlistEntry,
  getAllWaitlistEntries,
  getWaitlistEntryById,
  getWaitlistEntryByEmail,
  getWaitlistStats
};