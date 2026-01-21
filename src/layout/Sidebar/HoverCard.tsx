import { useGSAP } from "@gsap/react";
import {
  alpha,
  Box,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import type { MenuItem } from "../../data/menuItems";
interface HoverCardProps {
  item: MenuItem;
  anchorEl: HTMLElement | null;
  onClose?: () => void;
}

export default function HoverCard({ item, anchorEl, onClose }: HoverCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  useGSAP(() => {
    if (!cardRef.current || !anchorEl) return;

    const rect = anchorEl.getBoundingClientRect();
    gsap.set(cardRef.current, { x: -10, opacity: 0 });
    gsap.to(cardRef.current, { x: 0, opacity: 1, duration: 0.2 });
    cardRef.current.style.top = `${rect.top}px`;
    cardRef.current.style.left = `${rect.right + 8}px`;
  }, [anchorEl]);

  return (
    <Paper
      ref={cardRef}
      sx={{ position: "fixed", minWidth: 200, zIndex: 1300 }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2">{item.label}</Typography>
        <Stack spacing={0.5}>
          {item.children!.map((c, i) => {
            const active = c.path === location.pathname;

            return (
              <RouterLink key={i} to={c.path || "#"} onClick={onClose}>
                <Box
                  sx={{
                    px: 2,
                    py: 1.5,
                    backgroundColor: active
                      ? alpha("#1976d2", 0.08)
                      : "transparent",
                  }}
                >
                  <ListItemIcon>{c.icon}</ListItemIcon>
                  <ListItemText primary={c.label} />
                </Box>
              </RouterLink>
            );
          })}
        </Stack>
      </Box>
    </Paper>
  );
}
