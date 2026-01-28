import type { MenuItemProps } from "../data/menuItems";
import { Box, Paper, Typography } from "@mui/material";
import gsap from "gsap";
import { useRef } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface NavItemProps {
  item: MenuItemProps;
}

export function NavItem({ item }: NavItemProps) {
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const navigate = useNavigate();
  function show() {
    if (!item.children) return;
    gsap
      .timeline()
      .to(dropdownRef.current, {
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
        duration: 0.25,
        ease: "power2.out",
      })
      .to(
        arrowRef.current,
        { rotate: 180, duration: 0.25, ease: "power2.out" },
        0,
      );
  }

  function hide() {
    gsap
      .timeline()
      .to(dropdownRef.current, {
        opacity: 0,
        y: 8,
        pointerEvents: "none",
        duration: 0.2,
        ease: "power2.in",
      })
      .to(arrowRef.current, { rotate: 0, duration: 0.2, ease: "power2.in" }, 0);
  }

  function go(path: string) {
    navigate(path)
  }

  return (
    <Box
      component="li"
      sx={{
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          top: "100%",
          height: 12,
        },
      }}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {/* Label */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          "&:hover": {
            color: "primary.main",
          },
        }}
      >
        <Typography component="span" sx={{ cursor: "pointer" }}>
          {item.label}
        </Typography>

        {item.children && (
          <KeyboardArrowDown ref={arrowRef} sx={{ fontSize: 18 }} />
        )}
      </Box>

      {/* Dropdown Card */}
      {item.children && (
        <Paper
          ref={dropdownRef}
          component="ul"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            mt: 1,
            p: 2,
            minWidth: 180,
            listStyle: "none",

            opacity: 0,
            pointerEvents: "none",
          }}
        >
          {item.children.map((c) => (
            <Box
              component="li"
              key={c.label}
              onClick={() => c.path && go(c.path)}
              sx={{
                py: 0.5,
                cursor: "pointer",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              <Typography component="span">{c.label}</Typography>
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );
}
