import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { toolId } = await request.json();

    if (!toolId) {
      return new Response(JSON.stringify({ error: 'Tool ID is required' }), { status: 400 });
    }

    // Use the service role key to bypass RLS — the anon key cannot
    // call increment_upvotes RPC because EXECUTE is not granted to anon.
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500 });
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Try the atomic RPC function first
    const { error: rpcError } = await adminClient.rpc('increment_upvotes', { row_id: toolId });

    if (rpcError) {
      // Fallback: direct read + update if RPC doesn't exist or fails
      const { data: tool } = await adminClient
        .from('tools_directory')
        .select('upvotes')
        .eq('id', toolId)
        .single();

      if (!tool) {
        return new Response(JSON.stringify({ error: 'Tool not found' }), { status: 404 });
      }

      const { error: updateError } = await adminClient
        .from('tools_directory')
        .update({ upvotes: (tool.upvotes || 0) + 1 })
        .eq('id', toolId);

      if (updateError) {
        return new Response(JSON.stringify({ error: updateError.message }), { status: 500 });
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Upvote error:', error);
    return new Response(JSON.stringify({ error: 'Failed to upvote' }), { status: 500 });
  }
};
