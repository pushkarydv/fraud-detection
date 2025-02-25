import mongoose from 'mongoose';
const { models, model, Schema } = mongoose;

// Shared sub-schemas for common structures
const DeveloperSchema = new Schema(
  {
    name: String,
    id: String,
    internalId: String,
    email: String,
    website: String,
    privacyPolicy: String,
    address: String,
    legalName: String,
    legalEmail: String,
    legalAddress: String,
    legalPhone: String,
    url: String, // iOS specific
  },
  { _id: false }
);

const VersionSchema = new Schema(
  {
    number: String,
    changelog: String,
    released: Date,
    lastUpdated: Date,
    minimumOsVersion: String,
    maximumOsVersion: String,
    osVersionText: String,
    currentVersionScore: Number, // iOS specific
    currentVersionReviews: Number, // iOS specific
  },
  { _id: false }
);

const MetricsSchema = new Schema(
  {
    ratings: {
      average: Number,
      averageText: String,
      total: Number,
      distribution: {
        1: Number,
        2: Number,
        3: Number,
        4: Number,
        5: Number,
      },
    },
    reviews: Number,
    installs: {
      text: String,
      min: Number,
      max: Number,
    },
  },
  { _id: false }
);

const MediaSchema = new Schema(
  {
    screenshots: [String],
    video: String,
    videoImage: String,
    previewVideo: String,
    ipadScreenshots: [String], // iOS specific
    appletvScreenshots: [String], // iOS specific
  },
  { _id: false }
);

// Google Play App Schema
const GplayAppSchema = new Schema(
  {
    // Basic Information
    appId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: String,
    summary: String,
    icon: String,
    url: { type: String, required: true },
    headerImage: String,

    // Categorization
    category: String,
    categoryId: String,
    categories: [
      {
        name: String,
        id: String,
      },
    ],
    contentRating: String,
    contentRatingDescription: String,

    // Pricing & IAP
    price: Number,
    currency: String,
    priceText: String,
    isFree: Boolean,
    hasInAppPurchases: Boolean,
    iapRange: String,

    // Developer Information
    developer: DeveloperSchema,

    // Version & Updates
    version: VersionSchema,

    // Metrics
    metrics: MetricsSchema,

    // Media
    media: MediaSchema,

    // Features & Additional Info
    features: {
      isEditorChoice: Boolean,
      hasAds: Boolean,
      isPreregister: Boolean,
      isEarlyAccess: Boolean,
      isPlayPassAvailable: Boolean,
      requiredFeatures: [
        {
          name: String,
          description: String,
        },
      ],
    },

    // Comments
    comments: [String],
  },
  {
    timestamps: true,
  }
);

// App Store App Schema
const AppStoreAppSchema = new Schema(
  {
    // Basic Information
    appId: { type: String, required: true, index: true },
    appleId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: String,
    summary: String,
    icon: String,
    url: { type: String, required: true },

    // Categorization
    category: String,
    categoryId: Number,
    categories: [
      {
        name: String,
        id: String,
      },
    ],
    contentRating: String,

    // Pricing & IAP
    price: Number,
    currency: String,
    isFree: Boolean,
    hasInAppPurchases: Boolean,

    // Developer Information
    developer: DeveloperSchema,

    // Version & Updates
    version: VersionSchema,

    // Metrics
    metrics: MetricsSchema,

    // Media
    media: MediaSchema,

    features: {
      supportedDevices: [String],
      languages: [String],
      size: String,
    },
  },
  {
    timestamps: true,
  }
);

const GplayAppModel = models.GplayApp || model('GplayApp', GplayAppSchema);
const AppStoreAppModel =
  models.AppStoreApp || model('AppStoreApp', AppStoreAppSchema);

export { GplayAppModel, AppStoreAppModel };
