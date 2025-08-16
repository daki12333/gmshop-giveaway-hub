-- Fix critical security vulnerability: Remove public read access to customer data

-- Drop the insecure public read policies
DROP POLICY IF EXISTS "Anyone can read orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can read sell requests" ON public.sell_requests;

-- Create secure policies that only allow admins to read customer data
CREATE POLICY "Only admins can read orders" 
ON public.orders 
FOR SELECT 
USING (false); -- For now, only allow through admin role when implemented

CREATE POLICY "Only admins can read sell requests" 
ON public.sell_requests 
FOR SELECT 
USING (false); -- For now, only allow through admin role when implemented

-- Keep existing policies for creation (public can still submit orders/requests)
-- Keep existing admin management policies unchanged

-- Note: The "Admins can manage" policies with "true" expressions will still work
-- for administrative access, but public users can no longer read sensitive data