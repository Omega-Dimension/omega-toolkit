// components/sidebar/hooks/useMenuItemState.ts
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { MenuItem } from "../data/menuItems";

export const useMenuItemState = (item: MenuItem, collapsed?: boolean) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const arrowRef = useRef<HTMLSpanElement>(null);

  const hasChildren = Boolean(item.children?.length);
  const isActive =
    item.path === location.pathname ||
    Boolean(item.children?.some((child) => child.path === location.pathname));

  useEffect(() => {
    if (hasChildren && isActive && !open && !collapsed) {
      setOpen(true);
    }
  }, [hasChildren, isActive, open, collapsed]);

  useGSAP(() => {
    if (!arrowRef.current) return;

    gsap.to(arrowRef.current, {
      rotate: open ? 180 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [open]);

  return { open, setOpen, arrowRef, hasChildren, isActive };
};
