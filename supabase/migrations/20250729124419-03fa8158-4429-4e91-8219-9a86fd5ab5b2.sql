-- Create publications table
CREATE TABLE public.publications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_bg TEXT NOT NULL,
  title_en TEXT,
  description_bg TEXT,
  description_en TEXT,
  content_bg TEXT,
  content_en TEXT,
  document_url TEXT,
  publication_type TEXT NOT NULL DEFAULT 'публикация',
  published BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;

-- Create policies for publications
CREATE POLICY "Publications are viewable by everyone" 
ON public.publications 
FOR SELECT 
USING ((published = true) OR (auth.uid() IS NOT NULL));

CREATE POLICY "Authenticated users can create publications" 
ON public.publications 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update publications" 
ON public.publications 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete publications" 
ON public.publications 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_publications_updated_at
BEFORE UPDATE ON public.publications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();