import type { MenuItemProps } from "../data/menuItems";
import { Box, Paper, Typography } from "@mui/material";
import gsap from "gsap";
import { useRef, useState } from "react";

interface NavItemProps {
  item: MenuItemProps;
}

export function NavItem({ item }: NavItemProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState<boolean>(false);

  function show() {
    setOpen(true);

    if (!dropdownRef.current) return;

    gsap.fromTo(
      dropdownRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
    );
  }

  const hide = () => setOpen(false);

  return (
    <Box sx={{ position: "relative" }} onMouseEnter={show} onMouseLeave={hide}>
      <Typography>{item.label}</Typography>
      {item.children && open && (
        <Paper
          ref={dropdownRef}
          sx={{ position: "absolute", top: "100%", mt: 1, p: 2, minWidth: 180 }}
        >
          {item.children.map((c) => (
            <Typography key={c.label} sx={{ py: 0.5 }}>
              {c.label}
            </Typography>
          ))}
        </Paper>
      )}
    </Box>
  );
}
