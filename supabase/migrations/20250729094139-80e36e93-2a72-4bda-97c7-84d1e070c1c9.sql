-- Create news table for managing news articles
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_bg TEXT NOT NULL,
  title_en TEXT,
  content_bg TEXT NOT NULL,
  content_en TEXT,
  excerpt_bg TEXT,
  excerpt_en TEXT,
  category TEXT NOT NULL DEFAULT 'новини',
  image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create reports table for managing reports and documents
CREATE TABLE public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_bg TEXT NOT NULL,
  title_en TEXT,
  description_bg TEXT,
  description_en TEXT,
  document_url TEXT,
  report_type TEXT NOT NULL DEFAULT 'доклад',
  keywords_bg TEXT[],
  keywords_en TEXT[],
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create members table for council members
CREATE TABLE public.members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name_bg TEXT NOT NULL,
  name_en TEXT,
  position_bg TEXT NOT NULL,
  position_en TEXT,
  biography_bg TEXT,
  biography_en TEXT,
  photo_url TEXT,
  order_index INTEGER DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create settings table for site configuration
CREATE TABLE public.settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value_bg TEXT,
  value_en TEXT,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('documents', 'documents', true),
  ('images', 'images', true);

-- Enable Row Level Security
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for news table
CREATE POLICY "News are viewable by everyone" 
ON public.news FOR SELECT 
USING (published = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create news" 
ON public.news FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update news" 
ON public.news FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete news" 
ON public.news FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- RLS Policies for reports table
CREATE POLICY "Reports are viewable by everyone" 
ON public.reports FOR SELECT 
USING (published = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create reports" 
ON public.reports FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update reports" 
ON public.reports FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete reports" 
ON public.reports FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- RLS Policies for members table
CREATE POLICY "Members are viewable by everyone" 
ON public.members FOR SELECT 
USING (active = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage members" 
ON public.members FOR ALL 
USING (auth.uid() IS NOT NULL);

-- RLS Policies for settings table
CREATE POLICY "Settings are viewable by everyone" 
ON public.settings FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage settings" 
ON public.settings FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Storage policies for documents bucket
CREATE POLICY "Documents are publicly accessible" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'documents');

CREATE POLICY "Authenticated users can upload documents" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'documents' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update documents" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'documents' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete documents" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'documents' AND auth.uid() IS NOT NULL);

-- Storage policies for images bucket
CREATE POLICY "Images are publicly accessible" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'images' AND auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON public.news
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON public.settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default settings
INSERT INTO public.settings (key, value_bg, value_en, description) VALUES
  ('site_title', 'Фискален съвет на България', 'Fiscal Council of Bulgaria', 'Main site title'),
  ('site_description', 'Обективност, прозрачност и фискална устойчивост', 'Objectivity, transparency and fiscal sustainability', 'Site description/motto'),
  ('contact_address', '1000 София, ул. „Княз Дондуков" № 1, партер', '1000 Sofia, 1 Knyaz Dondukov Str., ground floor', 'Contact address'),
  ('contact_phone', '+359 2 123 4567', '+359 2 123 4567', 'Contact phone'),
  ('contact_email', 'info@fiscal-council.bg', 'info@fiscal-council.bg', 'Contact email');