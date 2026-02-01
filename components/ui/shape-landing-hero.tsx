"use client"

export function HeroGeometric({
  badge = "Design Collective",
  title1 = "Elevate Your Digital Vision",
  title2 = "Crafting Exceptional Websites",
}: {
  badge?: string
  title1?: string
  title2?: string
}) {
  return (
    <section className="relative w-full pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-8 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <span className="text-sm text-gray-400 font-medium">{badge}</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="text-white block mb-2">{title1}</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{title2}</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Crafting exceptional digital experiences through innovative design and cutting-edge technology.
        </p>
      </div>
    </section>
  )
}
