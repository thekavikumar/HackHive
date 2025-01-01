const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    githubID: { type: String, required: true, unique: true }, // GitHub ID for the user
    username: { type: String, required: true }, // GitHub username
    email: { type: String, required: true }, // User's email (GitHub email)
    profilePicture: { type: String }, // URL of the GitHub profile picture
    bio: { type: String }, // Bio or description from GitHub
    location: { type: String }, // Location of the user from GitHub
    followers: { type: Number, default: 0 }, // GitHub followers count
    following: { type: Number, default: 0 }, // GitHub following count
    publicRepos: { type: Number, default: 0 }, // Number of public repositories
    contributions: { type: Number, default: 0 }, // Number of contributions (commits, PRs, etc.)
    pullRequests: { type: Number, default: 0 }, // Number of pull requests made
    starsReceived: { type: Number, default: 0 }, // Total stars received across all repositories
    rating: { type: Number, default: 0 }, // Calculated rating based on your algorithm
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }], // List of team room IDs the user belongs to
    lastSynced: { type: Date, default: Date.now }, // Last sync date with GitHub API
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

const User = mongoose.model('User', userSchema);

module.exports = User;
