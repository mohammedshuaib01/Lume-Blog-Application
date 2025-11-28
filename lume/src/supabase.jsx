import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://vrlhwezkjjgaxcqarmhq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZybGh3ZXprampnYXhjcWFybWhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNjY1MTMsImV4cCI6MjA3OTY0MjUxM30.G3OuME5k3FHr03jwq8U8AMgBvYPb2QOy2RtY6BqteTE"
);