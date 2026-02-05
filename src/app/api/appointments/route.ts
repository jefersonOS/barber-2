import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function GET() {
  const supabase = getSupabaseServer();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase não configurado" },
      { status: 500 }
    );
  }

  const { data, error } = await supabase
    .from("appointments")
    .select("*, clients(name), professionals(name), services(name)")
    .limit(50);

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
  if (!payload?.company_id || !payload?.scheduled_at) {
    return NextResponse.json(
      { error: "Campos obrigatórios: company_id, scheduled_at" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("appointments")
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
    .from("appointments")
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
    .from("appointments")
    .delete()
    .eq("id", payload.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
