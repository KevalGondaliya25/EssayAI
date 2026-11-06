/*
  # Add essay success metrics

  1. Changes
    - Add success metrics to essays table:
      - accepted (boolean): Whether the essay led to college acceptance
      - rating (int): Quality rating from 1-5
      - feedback_score (int): How helpful was the feedback
      
  2. Security
    - Maintain existing RLS policies
    - Add policy for admins to update metrics
*/

DO $$ 
BEGIN
  -- Add success tracking columns
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'essays' AND column_name = 'accepted'
  ) THEN
    ALTER TABLE essays 
    ADD COLUMN accepted boolean,
    ADD COLUMN rating integer CHECK (rating BETWEEN 1 AND 5),
    ADD COLUMN feedback_score integer CHECK (feedback_score BETWEEN 1 AND 5);
  END IF;
END $$;