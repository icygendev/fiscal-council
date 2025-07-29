-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');

-- Create user_roles table to assign roles to users
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create policies for user_roles table
CREATE POLICY "Admins can manage all user roles" 
ON public.user_roles 
FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() AND role = 'admin'
    )
);

CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (user_id = auth.uid());

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
        AND role = _role
    )
$$;

-- Create helper function to check if user is admin or editor
CREATE OR REPLACE FUNCTION public.can_manage_content(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
        AND role IN ('admin', 'editor')
    )
$$;

-- Update news table RLS policies
DROP POLICY IF EXISTS "Authenticated users can create news" ON public.news;
DROP POLICY IF EXISTS "Users can update news" ON public.news;
DROP POLICY IF EXISTS "Users can delete news" ON public.news;

CREATE POLICY "Admins and editors can create news" 
ON public.news 
FOR INSERT 
WITH CHECK (public.can_manage_content(auth.uid()));

CREATE POLICY "Admins and editors can update news" 
ON public.news 
FOR UPDATE 
USING (public.can_manage_content(auth.uid()));

CREATE POLICY "Admins and editors can delete news" 
ON public.news 
FOR DELETE 
USING (public.can_manage_content(auth.uid()));

-- Update publications table RLS policies
DROP POLICY IF EXISTS "Authenticated users can create publications" ON public.publications;
DROP POLICY IF EXISTS "Users can update publications" ON public.publications;
DROP POLICY IF EXISTS "Users can delete publications" ON public.publications;

CREATE POLICY "Admins and editors can create publications" 
ON public.publications 
FOR INSERT 
WITH CHECK (public.can_manage_content(auth.uid()));

CREATE POLICY "Admins and editors can update publications" 
ON public.publications 
FOR UPDATE 
USING (public.can_manage_content(auth.uid()));

CREATE POLICY "Admins and editors can delete publications" 
ON public.publications 
FOR DELETE 
USING (public.can_manage_content(auth.uid()));

-- Update reports table RLS policies
DROP POLICY IF EXISTS "Authenticated users can create reports" ON public.reports;
DROP POLICY IF EXISTS "Users can update reports" ON public.reports;
DROP POLICY IF EXISTS "Users can delete reports" ON public.reports;

CREATE POLICY "Admins and editors can create reports" 
ON public.reports 
FOR INSERT 
WITH CHECK (public.can_manage_content(auth.uid()));

CREATE POLICY "Admins and editors can update reports" 
ON public.reports 
FOR UPDATE 
USING (public.can_manage_content(auth.uid()));

CREATE POLICY "Admins and editors can delete reports" 
ON public.reports 
FOR DELETE 
USING (public.can_manage_content(auth.uid()));

-- Update members table RLS policies
DROP POLICY IF EXISTS "Authenticated users can manage members" ON public.members;

CREATE POLICY "Only admins can manage members" 
ON public.members 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Update settings table RLS policies
DROP POLICY IF EXISTS "Authenticated users can manage settings" ON public.settings;

CREATE POLICY "Only admins can manage settings" 
ON public.settings 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Fix the existing function security issue
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Create trigger for user_roles updated_at
CREATE TRIGGER update_user_roles_updated_at
    BEFORE UPDATE ON public.user_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();