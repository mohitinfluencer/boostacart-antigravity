"use client"

export default function DiscountPreloader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4 max-w-md w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🎉 Preparing your exclusive discount…</h2>
          <p className="text-gray-600">Almost there 👀</p>
        </div>

        <div className="space-y-3">
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
        </div>
      </div>

      <style jsx>{`
        .skeleton-line {
          height: 12px;
          background: linear-gradient(
            90deg,
            #e5e7eb 0%,
            #f3f4f6 50%,
            #e5e7eb 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.2s ease-in-out infinite;
          border-radius: 6px;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  )
}
