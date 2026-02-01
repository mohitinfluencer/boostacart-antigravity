import StoreWidget from "@/components/widget/StoreWidget"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function EmbedPage({
  params,
}: {
  params: Promise<{ domain: string }>
}) {
  const { domain } = await params
  return <StoreWidget domain={domain} />
}
