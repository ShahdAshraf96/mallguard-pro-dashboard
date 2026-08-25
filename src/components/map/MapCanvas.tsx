import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, Maximize, Minus, Plus } from "lucide-react";

import { mapBuildings, mapCameras, type MapCamera } from "@/data/mockData";
import { MapLegend } from "./MapLegend";

const MIN_ZOOM = 0.6;
const MAX_ZOOM = 4;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function pinTone(v: number) {
  if (v >= 16) return "#dc2626";
  if (v >= 9) return "#f59e0b";
  if (v >= 3) return "#16a34a";
  return "#2563eb";
}

/** Soft radial heat blob: red core -> amber -> green -> transparent. */
function HeatBlob({ cam }: { cam: MapCamera }) {
  const size = 12 + Math.min(cam.violations, 50) * 0.9; // % of canvas
  const strength = clamp(cam.violations / 40, 0.25, 1);
  return (
    <div
      className="pointer-events-none absolute rounded-full"
      style={{
        left: `${cam.x}%`,
        top: `${cam.y}%`,
        width: `${size}%`,
        height: `${size}%`,
        transform: "translate(-50%, -50%)",
        opacity: strength,
        filter: "blur(10px)",
        background:
          "radial-gradient(circle closest-side, rgba(220,38,38,0.95) 0%, rgba(239,68,68,0.75) 22%, rgba(245,158,11,0.55) 46%, rgba(22,163,74,0.32) 70%, rgba(22,163,74,0) 100%)",
      }}
    />
  );
}

export function MapCanvas({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (cam: MapCamera) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  const zoomAt = useCallback((px: number, py: number, next: number) => {
    setZoom((z) => {
      const clamped = clamp(next, MIN_ZOOM, MAX_ZOOM);
      const k = clamped / z;
      setOffset((o) => ({ x: px - (px - o.x) * k, y: py - (py - o.y) * k }));
      return clamped;
    });
  }, []);

  const zoomAtRef = useRef(zoomAt);
  zoomAtRef.current = zoomAt;
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      zoomAtRef.current(
        e.clientX - rect.left,
        e.clientY - rect.top,
        zoomRef.current * Math.exp(-dy * 0.0015),
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const stepZoom = (factor: number) => {
    const el = containerRef.current;
    if (!el) return;
    zoomAt(el.clientWidth / 2, el.clientHeight / 2, zoom * factor);
  };

  const reset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[460px] w-full overflow-hidden rounded-lg bg-[#eef2f7]"
      onPointerDown={(e) => {
        drag.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d) return;
        setOffset({ x: d.ox + (e.clientX - d.x), y: d.oy + (e.clientY - d.y) });
      }}
      onPointerUp={() => {
        drag.current = null;
      }}
      style={{ cursor: drag.current ? "grabbing" : "grab", touchAction: "none" }}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          transformOrigin: "0 0",
        }}
      >
        {/* floor plan */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.16)_1px,transparent_1px)] bg-[length:36px_36px]" />
        {mapBuildings.map((b) => (
          <div
            key={b.id}
            className="absolute rounded-md border border-slate-300/80 bg-white/70"
            style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` }}
          >
            <span className="absolute left-2 top-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              {b.name}
            </span>
          </div>
        ))}

        {/* heat layer — blobs overlap and blend into one another */}
        <div className="absolute inset-0" style={{ mixBlendMode: "multiply", filter: "blur(6px)" }}>
          {mapCameras.map((c) => (
            <HeatBlob key={c.id} cam={c} />
          ))}
        </div>

        {/* camera pins */}
        {mapCameras.map((c) => (
          <button
            key={c.id}
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => onSelect(c)}
            title={`${c.id} — ${c.violations} violations`}
            className="absolute grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white text-white shadow-md transition-transform hover:scale-110"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              background: pinTone(c.violations),
              outline: selectedId === c.id ? "2px solid #2563eb" : undefined,
              outlineOffset: 2,
            }}
          >
            <Camera className="size-3" />
          </button>
        ))}
      </div>

      {/* zoom controls */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2">
        {[
          { key: "in", icon: Plus, label: "Zoom in", onClick: () => stepZoom(1.25) },
          { key: "out", icon: Minus, label: "Zoom out", onClick: () => stepZoom(1 / 1.25) },
          { key: "fit", icon: Maximize, label: "Fit to screen", onClick: reset },
        ].map(({ key, icon: Icon, label, onClick }) => (
          <button
            key={key}
            type="button"
            aria-label={label}
            title={label}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onClick}
            className="grid size-9 place-items-center rounded-lg border border-panel-border bg-card text-slate-600 shadow-panel transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <Icon className="size-4" />
          </button>
        ))}
      </div>

      <MapLegend />
    </div>
  );
}
