const Waitlist = require('../models/waitlistModel');

const admAccess = async (req, res) => {
  try {
    const adm_pass = process.env.ADM_PASS;
    const password = req.body.password;
    console.log(adm_pass, password, " do there match??");
    if (adm_pass.toString() !== password.toString()) {
        // console.log("no match", adm_pass.toString() , password.toString())
      return res
        .status(400)
        .json({ success: false, message: "credential is incorrect!!" });
    }
    // Generate token
    const token = jwt.sign(
      { id: 1, username: "Admin" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000, // 1 hour
      })
      .json({ success: true, message: "Login successful", redirectUrl: "/11199830083%22/adm" });
  } catch (error) {
    console.log(error); 
    res.status(500).json({ success: false, message: "An Error occured" });
  }
};


// Create a new waitlist entry
const createWaitlistEntry = async (req, res) => {
    console.log("accessed");
    console.log(req.body);
  try {
    const data = req.body;

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

    if (data.wantToBeVerifier === 'yes' && data.location) {
      processedData.verifierLocations = Array.isArray(data.location)
        ? data.location
        : [data.location];
    }

    const waitlistEntry = new Waitlist(processedData);
    const savedEntry = await waitlistEntry.save();

    res.status(201).json({
      success: true,
      data: savedEntry,
      message: 'Successfully joined the waitlist!'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Failed to join waitlist'
    });
  }
};

// Get all waitlist entries with optional filters
const getAllWaitlistEntries = async (req, res) => {
  try {
    const filters = req.query;
    const query = {};

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

    res.status(200).json({
      success: true,
      data: entries,
      count: entries.length,
      message: 'Waitlist entries retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Failed to retrieve waitlist entries'
    });
  }
};

// Get waitlist entry by ID
const getWaitlistEntryById = async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await Waitlist.findById(id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Waitlist entry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: entry,
      message: 'Waitlist entry retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Failed to retrieve waitlist entry'
    });
  }
};

// Get waitlist entry by email
const getWaitlistEntryByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const entry = await Waitlist.findOne({ email: email.toLowerCase() });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Waitlist entry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: entry,
      message: 'Waitlist entry retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Failed to retrieve waitlist entry'
    });
  }
};

// Get waitlist statistics
const getWaitlistStats = async (req, res) => {
  try {
    const totalEntries = await Waitlist.countDocuments();
    const verifierCount = await Waitlist.countDocuments({ wantToBeVerifier: 'yes' });
    const nonVerifierCount = await Waitlist.countDocuments({ wantToBeVerifier: 'no' });

    const industryStats = await Waitlist.aggregate([
      { $group: { _id: '$industry', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const languageStats = await Waitlist.aggregate([
      { $group: { _id: '$language', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalEntries,
        verifierCount,
        nonVerifierCount,
        industryBreakdown: industryStats, 
        languageBreakdown: languageStats
      },
      message: 'Waitlist statistics retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Failed to retrieve waitlist statistics'
    });
  }
};

module.exports = {
admAccess, 
  createWaitlistEntry,
  getAllWaitlistEntries,
  getWaitlistEntryById,
  getWaitlistEntryByEmail,
  getWaitlistStats
};
