-- SkillAlert SA Database Schema Updates

-- Add official_source column to opportunities table (if not already present)
-- This tracks the verified source of each opportunity
ALTER TABLE opportunities 
ADD COLUMN IF NOT EXISTS official_source TEXT DEFAULT 'Unknown';

-- Create index on official_source for faster filtering
CREATE INDEX IF NOT EXISTS idx_opportunities_official_source ON opportunities(official_source);

-- Ensure all existing records have an official_source if null
UPDATE opportunities 
SET official_source = 'Legacy' 
WHERE official_source IS NULL;

-- Make official_source NOT NULL after updating existing records
ALTER TABLE opportunities 
ALTER COLUMN official_source SET NOT NULL;
