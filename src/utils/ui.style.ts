import { alpha, type Theme } from "@mui/material";

export const navButtonStyles = (theme: Theme, isLight: boolean, isActive: boolean, isSelected: boolean) => ({
  color: isLight ? "text.primary" : "white",
  fontWeight: isSelected ? 700 : 600,
  fontSize: "0.95rem",
  height: 40,
  px: 2,
  borderRadius: "12px",
  textTransform: "none",
  position: "relative",
  transition: "all 0.3s ease",
  background: isActive
    ? alpha(theme.palette.primary.main, isLight ? 0.15 : 0.2)
    : isSelected
    ? alpha(theme.palette.primary.main, isLight ? 0.1 : 0.15)
    : "transparent",
  border: isSelected ? `1px solid ${alpha(theme.palette.primary.main, 0.3)}` : "none",
  "&:hover": {
    background: alpha(theme.palette.primary.main, isLight ? 0.1 : 0.15),
    transform: "translateY(-1px)",
    "&::after": {
      width: "60%",
      opacity: 1,
    },
  },
  "&::after": isSelected ? {
    content: '""',
    position: "absolute",
    bottom: 4,
    left: "20%",
    width: "60%",
    height: 3,
    borderRadius: "3px 3px 0 0",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.5)})`,
    transition: "all 0.3s ease",
  } : {},
});

export const dropdownPaperStyles = (theme: Theme, isLight: boolean) => ({
  position: "absolute",
  top: "100%",
  left: "50%",
  transform: "translateX(-50%)",
  mt: 1,
  minWidth: 640,
  borderRadius: "20px",
  overflow: "hidden",
  border: "1px solid",
  borderColor: isLight ? alpha("#000", 0.1) : alpha("#fff", 0.1),
  background: isLight
    ? alpha("#fff", 0.85)
    : alpha("#0f172a", 0.85),
  backdropFilter: "blur(20px)",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  zIndex: 1301,
  display: "flex",
  p: 0,
});

export const categoryColumnStyles = (theme: Theme, isLight: boolean) => ({
  p: 3,
  borderRight: "1px solid",
  borderColor: isLight
    ? alpha("#000", 0.08)
    : alpha("#fff", 0.08),
  background: isLight
    ? alpha("#f8fafc", 0.6)
    : alpha("#1e293b", 0.6),
});

export const categoryItemStyles = (theme: Theme, isLight: boolean, isHovered: boolean) => ({
  p: 1.5,
  borderRadius: "12px",
  mb: 1,
  cursor: "pointer",
  transition: "all 0.2s ease",
  background: isHovered
    ? alpha(theme.palette.primary.main, isLight ? 0.15 : 0.2)
    : "transparent",
  border: "1px solid",
  borderColor: isHovered
    ? alpha(theme.palette.primary.main, 0.3)
    : "transparent",
  "&:hover": {
    background: alpha(theme.palette.primary.main, isLight ? 0.1 : 0.15),
    transform: "translateX(2px)",
  },
});

export const toolCardStyles = (theme: Theme, isLight: boolean) => ({
  p: 2,
  borderRadius: "16px",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  background: isLight ? alpha("#fff", 0.6) : alpha("#1e293b", 0.6),
  border: "1px solid",
  borderColor: isLight ? alpha("#000", 0.1) : alpha("#fff", 0.1),
  backdropFilter: "blur(10px)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 12px 40px rgba(53, 164, 255, 0.2)",
    borderColor: alpha(theme.palette.primary.main, 0.3),
    background: isLight ? alpha("#fff", 0.8) : alpha("#1e293b", 0.8),
    "&::before": {
      opacity: 1,
    },
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(53, 164, 255, 0.1), rgba(255, 255, 255, 0.05))",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
});

export const emptyStateStyles = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};