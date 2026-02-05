import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = getSupabaseServer();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase não configurado" },
      { status: 500 }
    );
  }

  const payload = await request.json().catch(() => null);
  const token = payload?.token as string | undefined;
  const userId = payload?.user_id as string | undefined;

  if (!token || !userId) {
    return NextResponse.json(
      { error: "Campos obrigatórios: token, user_id" },
      { status: 400 }
    );
  }

  const { data: invitation, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("token", token)
    .is("accepted_at", null)
    .single();

  if (error || !invitation) {
    return NextResponse.json(
      { error: "Convite inválido ou expirado." },
      { status: 400 }
    );
  }

  const { error: linkError } = await supabase.from("company_users").insert({
    company_id: invitation.company_id,
    user_id: userId,
    role: invitation.role,
  });

  if (linkError) {
    return NextResponse.json({ error: linkError.message }, { status: 500 });
  }

  const { error: inviteError } = await supabase
    .from("invitations")
    .update({ accepted_at: new Date().toISOString() })
    .eq("id", invitation.id);

  if (inviteError) {
    return NextResponse.json({ error: inviteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
