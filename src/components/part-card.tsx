import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart } from "lucide-react";
import type { Part } from "@/lib/mock-data";
import { formatINR } from "@/lib/mock-data";

export function PartCard({ part, span = 1 }: { part: Part; span?: 1 | 2 }) {
  const onSale = part.compareAt && part.compareAt > part.price;
  return (
    <Link
      to="/part/$sku"
      params={{ sku: part.sku }}
      className={`group relative flex flex-col hairline bg-card hover:border-ink transition-colors ${
        span === 2 ? "md:col-span-2" : ""
      }`}
    >
      <div className={`relative overflow-hidden bg-secondary ${span === 2 ? "aspect-[2/1]" : "aspect-square"}`}>
        <img
          src={part.images[0]}
          alt={part.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {onSale && (
          <div className="absolute top-3 left-3 bg-copper text-copper-foreground font-mono text-[10px] tracking-[0.15em] uppercase px-2 py-1">
            Sale
          </div>
        )}
        {part.hasMotor && (
          <div className="absolute top-3 right-3 bg-ink text-bone font-mono text-[10px] tracking-[0.15em] uppercase px-2 py-1">
            18% GST
          </div>
        )}
        <button
          aria-label="Add to wishlist"
          onClick={(e) => e.preventDefault()}
          className="absolute bottom-3 right-3 h-9 w-9 grid place-items-center bg-bone hover:bg-copper hover:text-copper-foreground transition-colors border border-border"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
            {part.brandName} · {part.modelName}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">{part.id1}</span>
        </div>
        <h3 className="font-display text-xl tracking-wide leading-none">{part.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{part.description}</p>
        <div className="mt-auto pt-3 flex items-end justify-between">
          <div>
            <div className="font-display text-2xl">{formatINR(part.price)}</div>
            {onSale && (
              <div className="font-mono text-[11px] line-through text-muted-foreground">
                {formatINR(part.compareAt!)}
              </div>
            )}
          </div>
          <button
            onClick={(e) => e.preventDefault()}
            className="h-9 px-3 inline-flex items-center gap-1.5 bg-ink text-bone hover:bg-copper transition-colors font-mono text-[11px] tracking-[0.15em] uppercase"
          >
            <ShoppingCart className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
    </Link>
  );
}
