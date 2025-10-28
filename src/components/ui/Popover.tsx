// src/components/ui/Popover.tsx
"use client";

import React, { useState, useRef, useEffect, createContext, useContext, isValidElement, cloneElement } from "react";

interface PopoverContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

export function Popover({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative">{children}</div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({ children }: { children: React.ReactNode }) {
  const { setIsOpen } = useContext(PopoverContext)!;

  // Pastikan children adalah elemen React tunggal yang valid
  if (!isValidElement(children)) {
    return null;
  }

  // Pastikan children adalah ReactElement dengan props yang menerima onClick
  const child = children as React.ReactElement<any>;

  return React.cloneElement(child, {
    ...child.props,
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      setIsOpen((prev) => !prev);
      if (child.props.onClick) {
        child.props.onClick(event);
      }
    },
  });
}

export function PopoverContent({ children, className, align = "start" }: { children: React.ReactNode; className?: string; align?: "start" | "center" | "end" }) {
  const { isOpen, setIsOpen } = useContext(PopoverContext)!;
  const popoverRef = useRef<HTMLDivElement>(null);

  // Logika untuk menutup popover saat mengklik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const alignmentClass = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  }[align];

  if (!isOpen) return null;

  return (
    <div ref={popoverRef} className={`absolute z-10 mt-2 bg-white border rounded-md shadow-lg ${alignmentClass} ${className}`}>
      {children}
    </div>
  );
}
