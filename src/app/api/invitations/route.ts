import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = getSupabaseServer();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase não configurado" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get("company_id");

  let query = supabase.from("invitations").select("*").order("created_at", {
    ascending: false,
  });

  if (companyId) {
    query = query.eq("company_id", companyId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const supabase = getSupabaseServer();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase não configurado" },
      { status: 500 }
    );
  }

  const payload = await request.json().catch(() => null);
  if (!payload?.company_id || !payload?.email) {
    return NextResponse.json(
      { error: "Campos obrigatórios: company_id, email" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("invitations")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function PUT(request: Request) {
  const supabase = getSupabaseServer();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase não configurado" },
      { status: 500 }
    );
  }

  const payload = await request.json().catch(() => null);
  if (!payload?.id) {
    return NextResponse.json({ error: "Campo obrigatório: id" }, { status: 400 });
  }

  const { id, ...updates } = payload;
  const { data, error } = await supabase
    .from("invitations")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(request: Request) {
  const supabase = getSupabaseServer();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase não configurado" },
      { status: 500 }
    );
  }

  const payload = await request.json().catch(() => null);
  if (!payload?.id) {
    return NextResponse.json({ error: "Campo obrigatório: id" }, { status: 400 });
  }

  const { error } = await supabase
    .from("invitations")
    .delete()
    .eq("id", payload.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
