import { useRef } from "react";
import {
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { MenuItem } from "../../data/menuItems";
import {
  HoverCardRoot,
  HoverCardContentRoot,
  MenuItemButton,
  MenuLink,
} from "./styles";
import { alpha } from "@mui/material/styles";

interface HoverCardContentProps {
  item: MenuItem;
  onClose?: () => void;
  anchorEl: HTMLElement | null;
}

export default function HoverCardContent({
  item,
  onClose,
  anchorEl,
}: HoverCardContentProps) {
  const location = useLocation();
  const theme = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current || !anchorEl) return;

    const rect = anchorEl.getBoundingClientRect();

    gsap.set(cardRef.current, {
      x: -10,
      opacity: 0,
    });

    gsap.to(cardRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.2,
      ease: "power2.out",
    });

    cardRef.current.style.top = `${rect.top}px`;
    cardRef.current.style.left = `${rect.right + 8}px`;
  }, [anchorEl]);

  return (
    <HoverCardRoot ref={cardRef}>
      <HoverCardContentRoot>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            mb: 2,
            color: "text.primary",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {item.icon}
          {item.label}
        </Typography>

        <Stack spacing={0.5}>
          {item.children!.map((child, index) => {
            const isChildActive = child.path === location.pathname;
            return (
              <MenuLink key={index} to={child.path || "#"} onClick={onClose}>
                <MenuItemButton
                  sx={{
                    px: 2,
                    py: 1.5,
                    backgroundColor: isChildActive
                      ? alpha(theme.palette.primary.main, 0.08)
                      : "transparent",
                    color: isChildActive
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                    border: `1px solid ${
                      isChildActive ? theme.palette.primary.main : "transparent"
                    }`,
                    "&:hover": {
                      backgroundColor: isChildActive
                        ? alpha(theme.palette.primary.main, 0.12)
                        : alpha(theme.palette.action.hover, 0.04),
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: isChildActive
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                    }}
                  >
                    {child.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={child.label}
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: isChildActive ? 600 : 400,
                    }}
                  />
                </MenuItemButton>
              </MenuLink>
            );
          })}
        </Stack>
      </HoverCardContentRoot>
    </HoverCardRoot>
  );
}
