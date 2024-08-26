/**
 * Project: AnimalShelter
 * File: db/models/user.js
 * Author: Jarrale Butts
 * Created: 2024-08-19
 * Purpose: Models the schema for creating users.
 */

import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Creates the mongoose model
export const User = mongoose.model('user', userSchema)
