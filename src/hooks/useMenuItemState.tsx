import { useEffect, useRef, useState } from "react";
import type { MenuItem } from "../data/menuItems";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function useMenuItemState(item: MenuItem, collapsed?: boolean) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const arrowRef = useRef<HTMLSpanElement>(null);

  const hasChildren = Boolean(item.children?.length);
  const isActive = Boolean(
    item.path === location.pathname ||
    item.children?.some((c) => c.path === location.pathname),
  );

  useEffect(() => {
    if (hasChildren && isActive && !open && !collapsed) setOpen(true);
  }, [hasChildren, isActive, open, collapsed]);

  useGSAP(() => {
    if (!arrowRef.current) return;

    gsap.to(arrowRef.current, { rotate: open ? 180 : 0, duration: 0.3 });
  }, [open]);

  return { open, setOpen, arrowRef, hasChildren, isActive };
}
