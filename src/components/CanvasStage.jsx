import { ImagePlus } from 'lucide-react'

function withAlpha(hex, alpha) {
  const safeHex = hex.replace('#', '')
  const chunk = safeHex.length === 3
    ? safeHex.split('').map((char) => char + char).join('')
    : safeHex

  const red = Number.parseInt(chunk.slice(0, 2), 16)
  const green = Number.parseInt(chunk.slice(2, 4), 16)
  const blue = Number.parseInt(chunk.slice(4, 6), 16)

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

function resolveColor(palette, role) {
  if (role === 'muted') {
    return palette.muted
  }

  if (role === 'accent') {
    return palette.accent
  }

  if (role === 'paper') {
    return '#fffdf8'
  }

  if (role === 'paperSoft') {
    return 'rgba(255, 253, 248, 0.82)'
  }

  return palette.ink
}

function resolveFontClass(font) {
  if (font === 'display') {
    return 'font-display'
  }

  if (font === 'serif') {
    return 'font-serif'
  }

  return 'font-sans'
}

function resolveAlignment(align) {
  if (align === 'center') {
    return 'items-center text-center'
  }

  if (align === 'right') {
    return 'items-end text-right'
  }

  return 'items-start text-left'
}

function shapeFill(palette, style) {
  if (style.fillRole === 'accentSoft') {
    return `linear-gradient(135deg, ${withAlpha(palette.accent2, 0.3)} 0%, ${palette.accentSoft} 100%)`
  }

  if (style.fillRole === 'paper') {
    return `linear-gradient(135deg, ${withAlpha('#fffdf8', 0.85)} 0%, ${withAlpha('#fffdf8', 0.45)} 100%)`
  }

  return `linear-gradient(135deg, ${palette.accent} 0%, ${palette.accent2} 100%)`
}

function imageFill(palette, tone) {
  if (tone === 'secondary') {
    return `linear-gradient(135deg, ${palette.accentSoft} 0%, ${withAlpha(palette.accent2, 0.7)} 100%)`
  }

  return `linear-gradient(145deg, ${palette.accent} 0%, ${palette.accent2} 100%)`
}

function RenderElement({ element, palette }) {
  if (element.type === 'shape') {
    return (
      <div
        className="h-full w-full"
        style={{
          borderRadius: `${element.style.radius}cqw`,
          background: shapeFill(palette, element.style),
          opacity: element.style.opacity,
          boxShadow: `0 20px 50px ${withAlpha(palette.accent, 0.2)}`,
          transform: `rotate(${element.style.rotate || 0}deg)`,
        }}
      />
    )
  }

  if (element.type === 'image') {
    return (
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          borderRadius: `${element.style.radius}cqw`,
          background: imageFill(palette, element.style.tone),
          border: `1px solid ${withAlpha(palette.ink, 0.1)}`,
          boxShadow: `0 24px 60px ${withAlpha(palette.ink, 0.12)}`,
        }}
      >
        {element.style.src ? (
          <img
            src={element.style.src}
            alt={element.content}
            className="absolute inset-0 h-full w-full object-cover"
            draggable="false"
          />
        ) : null}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 20% 20%, ${withAlpha('#fffdf8', 0.32)} 0%, transparent 32%), linear-gradient(180deg, transparent 0%, ${withAlpha('#020617', 0.5)} 100%)`,
          }}
        />
        {!element.style.src ? (
          <div
            className="absolute inset-[8%] rounded-[2cqw] border border-white/35"
            style={{
              backgroundImage: `linear-gradient(45deg, ${withAlpha('#fffdf8', 0.15)} 25%, transparent 25%, transparent 50%, ${withAlpha('#fffdf8', 0.15)} 50%, ${withAlpha('#fffdf8', 0.15)} 75%, transparent 75%, transparent 100%)`,
              backgroundSize: '2.4cqw 2.4cqw',
            }}
          />
        ) : null}
        <div className="absolute bottom-[9%] left-[9%] right-[9%] flex items-end justify-between gap-3 text-white">
          <div className="min-w-0">
            <p className="font-display text-[1.2cqw] uppercase tracking-[0.24em] text-white/80">
              {element.style.src ? 'Uploaded image' : 'Placeholder'}
            </p>
            <p className="mt-[0.5cqw] font-sans text-[1.65cqw] font-semibold leading-tight text-white">
              {element.content}
            </p>
          </div>
          <div className="rounded-full border border-white/35 bg-white/10 p-[0.8cqw] backdrop-blur-sm">
            <ImagePlus className="h-[2cqw] w-[2cqw]" strokeWidth={1.6} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`flex h-full w-full flex-col justify-start whitespace-pre-wrap ${resolveAlignment(element.style.align)} ${resolveFontClass(element.style.font)}`}
      style={{
        color: resolveColor(palette, element.style.colorRole),
        fontSize: `${element.style.size}cqw`,
        fontWeight: element.style.weight,
        lineHeight: element.style.lineHeight,
        letterSpacing: element.style.uppercase ? element.style.tracking : 'normal',
        textTransform: element.style.uppercase ? 'uppercase' : 'none',
      }}
    >
      {element.content}
    </div>
  )
}

export default function CanvasStage({
  variation,
  selectedElementId,
  onSelectElement,
  onElementPointerDown,
  onResizePointerDown,
  onImageDrop,
  onClearSelection,
  stageRef,
  interactive = true,
  showChrome = interactive,
  className = '',
}) {
  const { cols, rows, width, height } = variation.format
  const ElementTag = 'div'

  return (
    <div
      ref={stageRef}
      className={`relative isolate w-full overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 shadow-[0_30px_120px_rgba(15,23,42,0.22)] ${className}`}
      style={{
        aspectRatio: `${width} / ${height}`,
        background: variation.background.base,
        boxShadow: `${variation.background.inset}, 0 30px 120px ${withAlpha(variation.palette.ink, 0.14)}`,
        containerType: 'inline-size',
      }}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) {
          onClearSelection?.()
        }
      }}
    >
      <div className="absolute inset-0" style={{ background: variation.background.overlay }} />
      <div className="absolute inset-0 opacity-70" style={{ background: variation.background.texture }} />
      {interactive && showChrome ? (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(to right, ${variation.palette.line} 1px, transparent 1px), linear-gradient(to bottom, ${variation.palette.line} 1px, transparent 1px)`,
            backgroundSize: `${100 / cols}% 100%, 100% ${100 / rows}%`,
          }}
        />
      ) : null}

      {variation.elements.map((element) => {
        const isSelected = interactive && selectedElementId === element.id

        return (
          <ElementTag
            key={element.id}
            className={`absolute m-0 border-0 bg-transparent p-0 text-left ${interactive ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'} ${isSelected ? 'z-20' : ''}`}
            style={{
              left: `${(element.x / cols) * 100}%`,
              top: `${(element.y / rows) * 100}%`,
              width: `${(element.w / cols) * 100}%`,
              height: `${(element.h / rows) * 100}%`,
              zIndex: element.style.layer,
              touchAction: 'none',
            }}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            onClick={() => onSelectElement?.(element.id)}
            onPointerDown={(event) => onElementPointerDown?.(event, element)}
            onDragOver={(event) => {
              if (interactive && element.type === 'image') {
                event.preventDefault()
              }
            }}
            onDrop={(event) => {
              if (interactive && element.type === 'image') {
                event.preventDefault()
                onImageDrop?.(event, element)
              }
            }}
          >
            <RenderElement element={element} palette={variation.palette} />
            {isSelected && showChrome ? (
              <>
                <div className="pointer-events-none absolute inset-0 rounded-[1.4cqw] border border-white/95 shadow-[0_0_0_1px_rgba(15,23,42,0.35)]" />
                <div className="pointer-events-none absolute -top-[1.5cqw] left-0 rounded-full bg-slate-950/88 px-[1.2cqw] py-[0.55cqw] font-sans text-[1cqw] font-semibold uppercase tracking-[0.2em] text-white">
                  {element.role}
                </div>
                <button
                  type="button"
                  className="absolute -bottom-[0.6cqw] -right-[0.6cqw] flex h-[2.4cqw] w-[2.4cqw] items-center justify-center rounded-full border border-white/90 bg-slate-950 text-white shadow-[0_8px_24px_rgba(15,23,42,0.28)]"
                  onPointerDown={(event) => onResizePointerDown?.(event, element)}
                >
                  <span className="text-[1.1cqw] leading-none">+</span>
                </button>
              </>
            ) : null}
          </ElementTag>
        )
      })}
    </div>
  )
}

