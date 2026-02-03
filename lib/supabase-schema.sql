-- AIMAP Supabase Schema
-- Run this in the Supabase SQL Editor to create the necessary tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Trips table - stores all trip form data and generated itinerary
CREATE TABLE IF NOT EXISTS trips (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  trip_name TEXT NOT NULL,
  form_data JSONB NOT NULL,
  itinerary_data JSONB,  -- Generated itinerary stored as JSON
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'generating', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS trips_user_id_idx ON trips(user_id);
CREATE INDEX IF NOT EXISTS trips_status_idx ON trips(status);
CREATE INDEX IF NOT EXISTS trips_created_at_idx ON trips(created_at DESC);

-- Enable Row Level Security
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert trips (for anonymous users)
CREATE POLICY "Anyone can create trips" ON trips
  FOR INSERT
  WITH CHECK (true);

-- Policy: Users can view their own trips
CREATE POLICY "Users can view own trips" ON trips
  FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Policy: Users can update their own trips
CREATE POLICY "Users can update own trips" ON trips
  FOR UPDATE
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Policy: Users can delete their own trips
CREATE POLICY "Users can delete own trips" ON trips
  FOR DELETE
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_trips_updated_at
  BEFORE UPDATE ON trips
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- User preferences table (for storing recurring preferences)
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  default_origin TEXT,
  default_currency TEXT DEFAULT 'USD',
  dietary_restrictions TEXT[],
  travel_preferences JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for user_preferences
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Policy: Users can manage their own preferences
CREATE POLICY "Users can manage own preferences" ON user_preferences
  FOR ALL
  USING (auth.uid() = user_id);

-- Trigger for user_preferences updated_at
CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
