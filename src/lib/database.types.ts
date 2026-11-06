export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      essays: {
        Row: {
          id: string
          user_id: string
          content: string
          target_college: string
          prompt: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          target_college: string
          prompt: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          target_college?: string
          prompt?: string
          created_at?: string
          updated_at?: string
        }
      }
      essay_feedback: {
        Row: {
          id: string
          essay_id: string
          suggestions: string[]
          improved_content: string
          strengths: string[]
          weaknesses: string[]
          style_analysis: string
          impact_analysis: string
          created_at: string
        }
        Insert: {
          id?: string
          essay_id: string
          suggestions: string[]
          improved_content: string
          strengths: string[]
          weaknesses: string[]
          style_analysis: string
          impact_analysis: string
          created_at?: string
        }
        Update: {
          id?: string
          essay_id?: string
          suggestions?: string[]
          improved_content?: string
          strengths?: string[]
          weaknesses?: string[]
          style_analysis?: string
          impact_analysis?: string
          created_at?: string
        }
      }
    }
  }
}