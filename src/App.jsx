import { createElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import {
  Download,
  Grip,
  ImageUp,
  LayoutTemplate,
  Palette,
  RotateCcw,
  Save,
  Sparkles,
  Type,
  WandSparkles,
} from 'lucide-react'
import CanvasStage from './components/CanvasStage'
import {
  generateDesignVariations,
  getDefaultPrompt,
  getPaletteTokens,
  getPromptSuggestions,
} from './lib/designEngine'

const STORAGE_KEY = 'magic-layout-lab-workspace-v2'
const defaultPrompt = getDefaultPrompt()
const fallbackVariations = generateDesignVariations(defaultPrompt, 1)
const fallbackSelectionId =
  fallbackVariations[0].elements.find((element) => element.type === 'text')?.id ||
  fallbackVariations[0].elements.find((element) => element.type !== 'shape')?.id ||
  fallbackVariations[0].elements[0].id

function getFallbackWorkspace() {
  return {
    prompt: defaultPrompt,
    variations: fallbackVariations,
    activeVariationId: fallbackVariations[0].id,
    selectedElementId: fallbackSelectionId,
  }
}

function getSavedWorkspace() {
  if (typeof window === 'undefined') {
    return getFallbackWorkspace()
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)

    if (!raw) {
      return getFallbackWorkspace()
    }

    const parsed = JSON.parse(raw)

    if (
      parsed?.version !== 2 ||
      !Array.isArray(parsed.variations) ||
      !parsed.variations.length ||
      typeof parsed.prompt !== 'string' ||
      typeof parsed.activeVariationId !== 'string'
    ) {
      return getFallbackWorkspace()
    }

    return {
      prompt: parsed.prompt,
      variations: parsed.variations,
      activeVariationId: parsed.activeVariationId,
      selectedElementId: parsed.selectedElementId,
    }
  } catch {
    return getFallbackWorkspace()
  }
}

const initialWorkspace = getSavedWorkspace()

function sanitizeFileName(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('Unable to read image file.'))
    reader.readAsDataURL(file)
  })
}

function VariationCard({ variation, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group rounded-[1.75rem] border p-3 text-left transition duration-300 ${
        active
          ? 'border-slate-900/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.16)]'
          : 'border-white/70 bg-white/70 hover:-translate-y-1 hover:border-slate-900/20 hover:bg-white hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)]'
      }`}
    >
      <CanvasStage
        variation={variation}
        interactive={false}
        showChrome={false}
        className="rounded-[1.25rem]"
      />
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-semibold text-slate-950">
            {variation.name}
          </p>
          <p className="mt-1 text-sm text-slate-500">{variation.meta.detail}</p>
        </div>
        <div className="flex items-center gap-1.5">
          {getPaletteTokens(variation.palette).map((token) => (
            <span
              key={`${variation.id}-${token}`}
              className="h-3.5 w-3.5 rounded-full border border-black/5"
              style={{ backgroundColor: token }}
            />
          ))}
        </div>
      </div>
    </button>
  )
}

function PanelTitle({ icon, eyebrow, title, body }) {
  return (
    <div>
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
        {createElement(icon, { className: 'h-3.5 w-3.5' })}
        {eyebrow}
      </div>
      <h2 className="font-display text-[1.85rem] font-semibold leading-none text-slate-950">
        {title}
      </h2>
      <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">{body}</p>
    </div>
  )
}

function App() {
  const [prompt, setPrompt] = useState(initialWorkspace.prompt)
  const [variations, setVariations] = useState(initialWorkspace.variations)
  const [activeVariationId, setActiveVariationId] = useState(initialWorkspace.activeVariationId)
  const [selectedElementId, setSelectedElementId] = useState(initialWorkspace.selectedElementId)
  const [notice, setNotice] = useState({
    tone: 'idle',
    message: 'Drag anything on the canvas. Resize from the corner handle and drop your own image into placeholders.',
  })
  const [isExporting, setIsExporting] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const stageRef = useRef(null)
  const dragRef = useRef(null)
  const fileInputRef = useRef(null)
  const pendingImageTargetIdRef = useRef(null)

  const activeVariation = useMemo(
    () => variations.find((variation) => variation.id === activeVariationId) || variations[0],
    [activeVariationId, variations],
  )

  const selectedElement = useMemo(
    () => activeVariation?.elements.find((element) => element.id === selectedElementId) || null,
    [activeVariation, selectedElementId],
  )

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 2,
        prompt,
        variations,
        activeVariationId,
        selectedElementId,
      }),
    )
  }, [activeVariationId, isHydrated, prompt, selectedElementId, variations])

  useEffect(() => {
    if (!activeVariation) {
      return
    }

    const hasSelection = activeVariation.elements.some(
      (element) => element.id === selectedElementId,
    )

    if (!hasSelection) {
      const firstEditable =
        activeVariation.elements.find((element) => element.type === 'text') ||
        activeVariation.elements.find((element) => element.type !== 'shape')
      setSelectedElementId(firstEditable?.id || activeVariation.elements[0]?.id || null)
    }
  }, [activeVariation, selectedElementId])

  useEffect(() => {
    const handlePointerMove = (event) => {
      const dragState = dragRef.current

      if (!dragState) {
        return
      }

      const dx = event.clientX - dragState.startX
      const dy = event.clientY - dragState.startY

      if (dragState.mode === 'move') {
        const nextX = Math.max(
          0,
          Math.min(
            dragState.cols - dragState.w,
            dragState.originX + Math.round(dx / dragState.cellWidth),
          ),
        )
        const nextY = Math.max(
          0,
          Math.min(
            dragState.rows - dragState.h,
            dragState.originY + Math.round(dy / dragState.cellHeight),
          ),
        )

        if (nextX === dragState.lastX && nextY === dragState.lastY) {
          return
        }

        dragState.lastX = nextX
        dragState.lastY = nextY

        setVariations((currentVariations) =>
          currentVariations.map((variation) => {
            if (variation.id !== dragState.variationId) {
              return variation
            }

            return {
              ...variation,
              elements: variation.elements.map((element) =>
                element.id === dragState.elementId
                  ? { ...element, x: nextX, y: nextY }
                  : element,
              ),
            }
          }),
        )

        return
      }

      const nextW = Math.max(
        dragState.minW,
        Math.min(
          dragState.cols - dragState.originX,
          dragState.originW + Math.round(dx / dragState.cellWidth),
        ),
      )
      const nextH = Math.max(
        dragState.minH,
        Math.min(
          dragState.rows - dragState.originY,
          dragState.originH + Math.round(dy / dragState.cellHeight),
        ),
      )

      if (nextW === dragState.lastW && nextH === dragState.lastH) {
        return
      }

      dragState.lastW = nextW
      dragState.lastH = nextH

      setVariations((currentVariations) =>
        currentVariations.map((variation) => {
          if (variation.id !== dragState.variationId) {
            return variation
          }

          return {
            ...variation,
            elements: variation.elements.map((element) =>
              element.id === dragState.elementId
                ? { ...element, w: nextW, h: nextH }
                : element,
            ),
          }
        }),
      )
    }

    const handlePointerUp = () => {
      dragRef.current = null
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [])

  const updateActiveVariation = useCallback(
    (updater) => {
      setVariations((currentVariations) =>
        currentVariations.map((variation) =>
          variation.id === activeVariationId ? updater(variation) : variation,
        ),
      )
    },
    [activeVariationId],
  )

  const updateElementById = useCallback(
    (elementId, updater) => {
      updateActiveVariation((variation) => ({
        ...variation,
        elements: variation.elements.map((element) =>
          element.id === elementId ? updater(element) : element,
        ),
      }))
    },
    [updateActiveVariation],
  )

  const updateSelectedElement = useCallback(
    (updater) => {
      if (!selectedElementId) {
        return
      }

      updateElementById(selectedElementId, updater)
    },
    [selectedElementId, updateElementById],
  )

  const generateFromPrompt = useCallback((nextPrompt) => {
    const nextVariations = generateDesignVariations(nextPrompt, Date.now())
    const firstEditable =
      nextVariations[0].elements.find((element) => element.type === 'text') ||
      nextVariations[0].elements.find((element) => element.type !== 'shape')

    setPrompt(nextPrompt)
    setVariations(nextVariations)
    setActiveVariationId(nextVariations[0].id)
    setSelectedElementId(firstEditable?.id || nextVariations[0].elements[0].id)
    setNotice({
      tone: 'success',
      message: 'Three fresh layout directions are ready. Pick one, resize it, and drop in your own image if you want.',
    })
  }, [])

  const handleElementPointerDown = useCallback(
    (event, element) => {
      if (!activeVariation || !stageRef.current) {
        return
      }

      if (event.button !== 0 && event.pointerType !== 'touch') {
        return
      }

      event.preventDefault()
      event.stopPropagation()
      setSelectedElementId(element.id)

      const rect = stageRef.current.getBoundingClientRect()
      dragRef.current = {
        mode: 'move',
        variationId: activeVariation.id,
        elementId: element.id,
        startX: event.clientX,
        startY: event.clientY,
        originX: element.x,
        originY: element.y,
        cellWidth: rect.width / activeVariation.format.cols,
        cellHeight: rect.height / activeVariation.format.rows,
        cols: activeVariation.format.cols,
        rows: activeVariation.format.rows,
        w: element.w,
        h: element.h,
        lastX: element.x,
        lastY: element.y,
      }
    },
    [activeVariation],
  )

  const handleResizePointerDown = useCallback(
    (event, element) => {
      if (!activeVariation || !stageRef.current) {
        return
      }

      event.preventDefault()
      event.stopPropagation()
      setSelectedElementId(element.id)

      const rect = stageRef.current.getBoundingClientRect()
      dragRef.current = {
        mode: 'resize',
        variationId: activeVariation.id,
        elementId: element.id,
        startX: event.clientX,
        startY: event.clientY,
        originX: element.x,
        originY: element.y,
        originW: element.w,
        originH: element.h,
        cellWidth: rect.width / activeVariation.format.cols,
        cellHeight: rect.height / activeVariation.format.rows,
        cols: activeVariation.format.cols,
        rows: activeVariation.format.rows,
        minW: element.type === 'shape' ? 1 : 2,
        minH: 1,
        lastW: element.w,
        lastH: element.h,
      }
    },
    [activeVariation],
  )

  const applyImageToElement = useCallback(
    async (file, elementId) => {
      if (!file || !file.type.startsWith('image/')) {
        setNotice({
          tone: 'error',
          message: 'Please choose an image file so I can place it in the selected placeholder.',
        })
        return
      }

      const dataUrl = await readFileAsDataUrl(file)
      updateElementById(elementId, (element) => ({
        ...element,
        style: {
          ...element.style,
          src: dataUrl,
        },
      }))
      setNotice({
        tone: 'success',
        message: 'Image placed on the canvas. It will stay there through local autosave and export.',
      })
    },
    [updateElementById],
  )

  const handleImageInputRequest = useCallback((elementId) => {
    pendingImageTargetIdRef.current = elementId
    fileInputRef.current?.click()
  }, [])

  const handleFileInputChange = useCallback(
    async (event) => {
      const file = event.target.files?.[0]
      const targetId = pendingImageTargetIdRef.current
      event.target.value = ''

      if (!file || !targetId) {
        return
      }

      try {
        await applyImageToElement(file, targetId)
      } catch {
        setNotice({
          tone: 'error',
          message: 'I could not read that image file. Try a PNG, JPG, or WEBP image.',
        })
      }
    },
    [applyImageToElement],
  )

  const handleImageDrop = useCallback(
    async (event, element) => {
      const file = event.dataTransfer?.files?.[0]

      if (!file) {
        return
      }

      setSelectedElementId(element.id)

      try {
        await applyImageToElement(file, element.id)
      } catch {
        setNotice({
          tone: 'error',
          message: 'Drop a single PNG, JPG, or WEBP image onto the placeholder.',
        })
      }
    },
    [applyImageToElement],
  )

  const resetWorkspace = useCallback(() => {
    const resetPrompt = getDefaultPrompt()
    const nextVariations = generateDesignVariations(resetPrompt, Date.now())
    const firstEditable =
      nextVariations[0].elements.find((element) => element.type === 'text') ||
      nextVariations[0].elements.find((element) => element.type !== 'shape')

    setPrompt(resetPrompt)
    setVariations(nextVariations)
    setActiveVariationId(nextVariations[0].id)
    setSelectedElementId(firstEditable?.id || nextVariations[0].elements[0].id)
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY)
    }
    setNotice({
      tone: 'success',
      message: 'Workspace reset. You are back to a clean prompt and fresh design directions.',
    })
  }, [])

  const handleExport = useCallback(async () => {
    if (!stageRef.current || !activeVariation) {
      return
    }

    setIsExporting(true)
    setNotice({ tone: 'idle', message: 'Rendering your PNG now...' })

    try {
      await new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(resolve))
      })

      const dataUrl = await toPng(stageRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: activeVariation.palette.canvas,
      })
      const anchor = document.createElement('a')
      anchor.download = `${sanitizeFileName(activeVariation.prompt || 'magic-design')}.png`
      anchor.href = dataUrl
      anchor.click()
      setNotice({ tone: 'success', message: 'PNG exported successfully.' })
    } catch (error) {
      setNotice({
        tone: 'error',
        message: 'The PNG export hit a browser rendering issue. Try again in a second.',
      })
      console.error(error)
    } finally {
      setIsExporting(false)
    }
  }, [activeVariation])

  if (!activeVariation) {
    return null
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff7ea_0%,#eef3ff_42%,#e8ecf7_100%)] text-slate-900">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleFileInputChange}
      />

      <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="panel-surface flex flex-col gap-6 rounded-[2rem] px-5 py-5 shadow-[0_30px_120px_rgba(15,23,42,0.12)] sm:px-6 lg:px-8 lg:py-7">
          <header className="flex flex-col gap-4 border-b border-slate-900/8 pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                <WandSparkles className="h-3.5 w-3.5" />
                Magic Layout Lab
              </div>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[0.94] tracking-[-0.03em] text-slate-950 sm:text-5xl xl:text-6xl">
                Prompt in, polished directions out.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                A client-side Magic Design-style editor built with React, Tailwind, and a lightweight grid engine.
                Generate three visual directions instantly, drag, resize, drop in your own imagery, and export the final canvas as a PNG.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-slate-500">
              <span className="rounded-full border border-slate-900/10 bg-white/70 px-3 py-2">3 variations</span>
              <span className="rounded-full border border-slate-900/10 bg-white/70 px-3 py-2">grid snap</span>
              <span className="rounded-full border border-slate-900/10 bg-white/70 px-3 py-2">resize handles</span>
              <span className="rounded-full border border-slate-900/10 bg-white/70 px-3 py-2">local autosave</span>
            </div>
          </header>

          <div className="grid gap-5 xl:grid-cols-[320px,minmax(0,1fr),320px]">
            <aside className="panel-inner rounded-[1.75rem] p-5 sm:p-6">
              <PanelTitle
                icon={Sparkles}
                eyebrow="Prompt"
                title="Generate layouts"
                body="Describe the creative, and the app will synthesize title copy, hierarchy, image placeholders, and color direction across three variations."
              />

              <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                onKeyDown={(event) => {
                  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                    generateFromPrompt(prompt)
                  }
                }}
                className="mt-3 h-32 w-full resize-none rounded-[1.4rem] border border-slate-900/10 bg-white px-4 py-4 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900/25 focus:ring-4 focus:ring-slate-900/5"
                placeholder="Instagram post for coffee shop"
              />

              <div className="mt-4 flex flex-wrap gap-2">
                {getPromptSuggestions().map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => generateFromPrompt(suggestion)}
                    className="rounded-full border border-slate-900/10 bg-white/80 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-slate-900/20 hover:text-slate-950"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row xl:flex-col">
                <button
                  type="button"
                  onClick={() => generateFromPrompt(prompt)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  <Sparkles className="h-4 w-4" />
                  Generate variations
                </button>
                <button
                  type="button"
                  onClick={handleExport}
                  disabled={isExporting}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-900/10 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-900/25 disabled:cursor-wait disabled:opacity-60"
                >
                  <Download className="h-4 w-4" />
                  {isExporting ? 'Exporting...' : 'Export PNG'}
                </button>
              </div>

              <div className={`mt-6 rounded-[1.4rem] border px-4 py-4 text-sm leading-6 ${
                notice.tone === 'error'
                  ? 'border-rose-200 bg-rose-50 text-rose-700'
                  : notice.tone === 'success'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-slate-900/10 bg-white/80 text-slate-600'
              }`}>
                {notice.message}
              </div>

              <div className="mt-6 rounded-[1.35rem] border border-slate-900/8 bg-white/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Workspace
                    </p>
                    <p className="mt-1 font-display text-xl font-semibold text-slate-950">
                      Autosaved locally
                    </p>
                  </div>
                  <Save className="h-4 w-4 text-slate-500" />
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The current prompt, selected direction, uploaded images, and edits persist in your browser automatically.
                </p>
                <button
                  type="button"
                  onClick={resetWorkspace}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900/20 hover:text-slate-950"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset workspace
                </button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                {[
                  {
                    icon: LayoutTemplate,
                    title: 'Grid engine',
                    body: `${activeVariation.format.cols} x ${activeVariation.format.rows} layout for ${activeVariation.format.label.toLowerCase()}.`,
                  },
                  {
                    icon: Grip,
                    title: 'Direct manipulation',
                    body: 'Move elements freely, then resize them by dragging the lower-right handle.',
                  },
                  {
                    icon: Palette,
                    title: 'Palette-aware',
                    body: 'Each direction carries its own color system and atmosphere.',
                  },
                ].map(({ icon, title, body }) => (
                  <div key={title} className="rounded-[1.35rem] border border-slate-900/8 bg-white/75 p-4">
                    <div className="inline-flex rounded-full bg-slate-100 p-2 text-slate-700">
                      {createElement(icon, { className: 'h-4 w-4' })}
                    </div>
                    <p className="mt-3 font-display text-lg font-semibold text-slate-950">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
                  </div>
                ))}
              </div>
            </aside>

            <main className="panel-inner rounded-[1.75rem] p-4 sm:p-5 lg:p-6">
              <div className="flex flex-col gap-4 border-b border-slate-900/8 pb-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Active direction
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-3xl font-semibold text-slate-950">
                      {activeVariation.name}
                    </h2>
                    <span className="rounded-full border border-slate-900/10 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600">
                      {activeVariation.meta.channel}
                    </span>
                    <span className="rounded-full border border-slate-900/10 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600">
                      {activeVariation.meta.subject}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {getPaletteTokens(activeVariation.palette).map((token) => (
                    <span
                      key={`${activeVariation.id}-${token}`}
                      className="h-9 w-9 rounded-full border border-black/5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)]"
                      style={{ backgroundColor: token }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(243,244,246,0.7))] p-3 sm:p-4 lg:p-5">
                <CanvasStage
                  variation={activeVariation}
                  selectedElementId={selectedElementId}
                  onSelectElement={setSelectedElementId}
                  onElementPointerDown={handleElementPointerDown}
                  onResizePointerDown={handleResizePointerDown}
                  onImageDrop={handleImageDrop}
                  onClearSelection={() => setSelectedElementId(null)}
                  stageRef={stageRef}
                  showChrome={!isExporting}
                />
              </div>

              <div className="mt-5 rounded-[1.4rem] border border-slate-900/8 bg-white/70 px-4 py-4 text-sm text-slate-600 sm:flex sm:items-center sm:justify-between">
                <p>
                  Drag elements directly on the canvas to move them between grid cells. Resize from the lower-right corner. Drop image files onto placeholders or use the inspector upload button.
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 sm:mt-0">
                  Fast generation · no backend
                </p>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Variations
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-slate-950">
                      Choose your direction
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500">At least three distinct treatments on every prompt.</p>
                </div>
                <div className="mt-4 grid gap-4 lg:grid-cols-3">
                  {variations.map((variation) => (
                    <VariationCard
                      key={variation.id}
                      variation={variation}
                      active={variation.id === activeVariationId}
                      onSelect={() => {
                        setActiveVariationId(variation.id)
                        const firstEditable =
                          variation.elements.find((element) => element.type === 'text') ||
                          variation.elements.find((element) => element.type !== 'shape')
                        setSelectedElementId(firstEditable?.id || variation.elements[0]?.id || null)
                      }}
                    />
                  ))}
                </div>
              </div>
            </main>

            <aside className="panel-inner rounded-[1.75rem] p-5 sm:p-6">
              <PanelTitle
                icon={Type}
                eyebrow="Inspector"
                title="Edit selected element"
                body="Keep generation fast, then refine the active title block, image placeholder, or accent shape without leaving the canvas."
              />

              {selectedElement ? (
                <div className="mt-6 space-y-5">
                  <div className="rounded-[1.35rem] border border-slate-900/8 bg-white/80 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          Selected
                        </p>
                        <p className="mt-1 font-display text-xl font-semibold text-slate-950">
                          {selectedElement.role}
                        </p>
                      </div>
                      <div className="rounded-full border border-slate-900/10 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                        {selectedElement.x}, {selectedElement.y} · {selectedElement.w} x {selectedElement.h}
                      </div>
                    </div>
                  </div>

                  {selectedElement.type === 'text' ? (
                    <>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          Copy
                        </label>
                        <textarea
                          value={selectedElement.content}
                          onChange={(event) =>
                            updateSelectedElement((element) => ({
                              ...element,
                              content: event.target.value,
                            }))
                          }
                          className="mt-3 h-28 w-full resize-none rounded-[1.2rem] border border-slate-900/10 bg-white px-4 py-4 text-sm leading-6 text-slate-900 outline-none transition focus:border-slate-900/25 focus:ring-4 focus:ring-slate-900/5"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          Font family
                        </label>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {[
                            ['display', 'Display'],
                            ['sans', 'Sans'],
                            ['serif', 'Serif'],
                          ].map(([value, label]) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() =>
                                updateSelectedElement((element) => ({
                                  ...element,
                                  style: { ...element.style, font: value },
                                }))
                              }
                              className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                                selectedElement.style.font === value
                                  ? 'border-slate-950 bg-slate-950 text-white'
                                  : 'border-slate-900/10 bg-white text-slate-600 hover:border-slate-900/20 hover:text-slate-950'
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          <span>Scale</span>
                          <span>{selectedElement.style.size.toFixed(1)} cqw</span>
                        </div>
                        <input
                          type="range"
                          min="0.8"
                          max="7"
                          step="0.1"
                          value={selectedElement.style.size}
                          onChange={(event) =>
                            updateSelectedElement((element) => ({
                              ...element,
                              style: {
                                ...element.style,
                                size: Number(event.target.value),
                              },
                            }))
                          }
                          className="mt-3 w-full accent-slate-950"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          Alignment
                        </label>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {[
                            ['left', 'Left'],
                            ['center', 'Center'],
                            ['right', 'Right'],
                          ].map(([value, label]) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() =>
                                updateSelectedElement((element) => ({
                                  ...element,
                                  style: { ...element.style, align: value },
                                }))
                              }
                              className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                                selectedElement.style.align === value
                                  ? 'border-slate-950 bg-slate-950 text-white'
                                  : 'border-slate-900/10 bg-white text-slate-600 hover:border-slate-900/20 hover:text-slate-950'
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : null}

                  {selectedElement.type === 'image' ? (
                    <>
                      {selectedElement.style.src ? (
                        <div className="overflow-hidden rounded-[1.3rem] border border-slate-900/8 bg-slate-50">
                          <img
                            src={selectedElement.style.src}
                            alt="Selected canvas asset"
                            className="h-44 w-full object-cover"
                          />
                        </div>
                      ) : null}

                      <div>
                        <label className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          Placeholder label
                        </label>
                        <input
                          value={selectedElement.content}
                          onChange={(event) =>
                            updateSelectedElement((element) => ({
                              ...element,
                              content: event.target.value,
                            }))
                          }
                          className="mt-3 w-full rounded-[1.2rem] border border-slate-900/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900/25 focus:ring-4 focus:ring-slate-900/5"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <button
                          type="button"
                          onClick={() => handleImageInputRequest(selectedElement.id)}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                        >
                          <ImageUp className="h-4 w-4" />
                          {selectedElement.style.src ? 'Replace image' : 'Upload image'}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updateSelectedElement((element) => ({
                              ...element,
                              style: {
                                ...element.style,
                                src: '',
                              },
                            }))
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-900/10 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900/20 hover:text-slate-950"
                        >
                          <RotateCcw className="h-4 w-4" />
                          Reset placeholder
                        </button>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          <span>Corner radius</span>
                          <span>{selectedElement.style.radius.toFixed(1)} cqw</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="4"
                          step="0.1"
                          value={selectedElement.style.radius}
                          onChange={(event) =>
                            updateSelectedElement((element) => ({
                              ...element,
                              style: {
                                ...element.style,
                                radius: Number(event.target.value),
                              },
                            }))
                          }
                          className="mt-3 w-full accent-slate-950"
                        />
                      </div>
                    </>
                  ) : null}

                  {selectedElement.type === 'shape' ? (
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                        <span>Opacity</span>
                        <span>{selectedElement.style.opacity.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0.2"
                        max="1"
                        step="0.05"
                        value={selectedElement.style.opacity}
                        onChange={(event) =>
                          updateSelectedElement((element) => ({
                            ...element,
                            style: {
                              ...element.style,
                              opacity: Number(event.target.value),
                            },
                          }))
                        }
                        className="mt-3 w-full accent-slate-950"
                      />
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="mt-6 rounded-[1.35rem] border border-dashed border-slate-900/15 bg-white/70 p-5 text-sm leading-6 text-slate-500">
                  Tap any layer on the canvas to edit it here.
                </div>
              )}

              <div className="mt-6 rounded-[1.35rem] border border-slate-900/8 bg-white/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Color palette
                    </p>
                    <p className="mt-1 font-display text-xl font-semibold text-slate-950">
                      {activeVariation.palette.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getPaletteTokens(activeVariation.palette).map((token) => (
                      <span
                        key={`${activeVariation.palette.id}-${token}`}
                        className="h-8 w-8 rounded-full border border-black/5"
                        style={{ backgroundColor: token }}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Each variation gets its own palette pairing, so the same prompt can swing editorial, bold, or softer without hitting a backend.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
