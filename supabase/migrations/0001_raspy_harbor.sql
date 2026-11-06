/*
  # Create essays and feedback tables

  1. New Tables
    - `essays`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `content` (text)
      - `target_college` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `essay_feedback`
      - `id` (uuid, primary key)
      - `essay_id` (uuid, references essays)
      - `suggestions` (text[])
      - `improved_content` (text)
      - `strengths` (text[])
      - `weaknesses` (text[])
      - `style_analysis` (text)
      - `impact_analysis` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

CREATE TABLE IF NOT EXISTS essays (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  target_college text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS essay_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  essay_id uuid REFERENCES essays NOT NULL,
  suggestions text[] NOT NULL,
  improved_content text NOT NULL,
  strengths text[] NOT NULL,
  weaknesses text[] NOT NULL,
  style_analysis text NOT NULL,
  impact_analysis text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE essays ENABLE ROW LEVEL SECURITY;
ALTER TABLE essay_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own essays"
  ON essays
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read feedback for their essays"
  ON essay_feedback
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM essays
      WHERE essays.id = essay_feedback.essay_id
      AND essays.user_id = auth.uid()
    )
  );