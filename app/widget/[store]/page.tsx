import { redirect } from "next/navigation"

export default async function OldWidgetRoute({
  params,
}: {
  params: Promise<{ store: string }>
}) {
  const { store } = await params
  redirect(`/embed/${store}`)
}
