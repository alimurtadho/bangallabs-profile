"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/data/site";

const navItems = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Expertise", "#expertise"],
  ["Portfolio", "#projects"],
  ["Positioning", "#positioning"],
  ["Blog", "#blog"],
  ["Contact", "#contact"]
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/[0.82] text-white backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#" className="relative h-12 w-48 shrink-0 overflow-hidden md:w-56" aria-label="BangAl Labs home">
          <Image
            src="/images/logo-web.svg"
            alt={site.name}
            fill
            sizes="(min-width: 768px) 224px, 192px"
            className="object-contain object-center"
            priority
          />
        </a>
        <nav className="hidden items-center gap-5 text-sm text-white/[0.78] lg:flex" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} className="transition hover:text-white">
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden rounded bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-teal lg:inline-flex"
        >
          Let&apos;s Talk
        </a>
        <button
          type="button"
          className="grid size-10 place-items-center rounded border border-white/[0.18] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open ? (
        <nav className="border-t border-white/10 bg-ink px-5 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="rounded px-3 py-3 text-sm text-white/[0.82] transition hover:bg-white/[0.08] hover:text-white"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
