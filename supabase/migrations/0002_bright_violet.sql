/*
  # Add prompt column to essays table

  1. Changes
    - Add 'prompt' column to essays table to store essay prompts
    - Make prompt column required (NOT NULL)
    - Add default empty string value
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'essays' AND column_name = 'prompt'
  ) THEN
    ALTER TABLE essays 
    ADD COLUMN prompt text NOT NULL DEFAULT '';
  END IF;
END $$;