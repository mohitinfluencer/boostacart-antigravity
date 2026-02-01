"use client"

import type React from "react"
import { useEffect, useRef, type ReactNode } from "react"

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  customSize?: boolean
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = "", customSize = true }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e

      if (cardRef.current) {
        cardRef.current.style.setProperty("--x", x.toFixed(2))
        cardRef.current.style.setProperty("--xp", (x / window.innerWidth).toFixed(2))
        cardRef.current.style.setProperty("--y", y.toFixed(2))
        cardRef.current.style.setProperty("--yp", (y / window.innerHeight).toFixed(2))
      }
    }

    document.addEventListener("pointermove", syncPointer)
    return () => document.removeEventListener("pointermove", syncPointer)
  }, [])

  // Using theme colors: blue (220) to purple (280) gradient
  const base = 240 // slate-blue base
  const spread = 60 // subtle spread to purple

  const getInlineStyles = () => {
    return {
      "--base": base,
      "--spread": spread,
      "--radius": "12",
      "--border": "1",
      "--backdrop": "rgb(15 23 42 / 0.5)", // slate-900/50
      "--backup-border": "rgb(30 41 59 / 0.5)", // slate-800/50
      "--size": "200",
      "--outer": "1",
      "--border-size": "calc(var(--border, 1) * 1px)",
      "--spotlight-size": "calc(var(--size, 150) * 1px)",
      "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 240) 70% 60% / 0.15), transparent
      )`,
      backgroundColor: "var(--backdrop, transparent)",
      backgroundSize: "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
      backgroundPosition: "50% 50%",
      backgroundAttachment: "fixed",
      border: "var(--border-size) solid var(--backup-border)",
      position: "relative" as const,
      touchAction: "none" as const,
    }
  }

  const beforeAfterStyles = `
    [data-spotlight]::before,
    [data-spotlight]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
    
    [data-spotlight]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 240) 80% 65% / 0.8), transparent 100%
      );
      filter: brightness(1.5);
    }
    
    [data-spotlight]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 0% 100% / 0.4), transparent 100%
      );
    }
    
    [data-spotlight] [data-spotlight-inner] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }
    
    [data-spotlight] > [data-spotlight-inner]::before {
      inset: -10px;
      border-width: 10px;
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-spotlight
        style={getInlineStyles()}
        className={`rounded-xl relative backdrop-blur-sm ${className}`}
      >
        <div ref={innerRef} data-spotlight-inner></div>
        {children}
      </div>
    </>
  )
}

export { SpotlightCard }
