import { Box, Container, Typography, useTheme, alpha, IconButton, Stack, Divider } from "@mui/material";
import { GitHub, LinkedIn, Twitter, Favorite } from "@mui/icons-material";

export default function Footer() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        position: "relative",
        background: isLight
          ? `linear-gradient(145deg, ${alpha(theme.palette.background.default, 0.98)} 0%, ${alpha(
              theme.palette.background.paper,
              0.95
            )} 100%)`
          : `linear-gradient(145deg, ${alpha("#0a1929", 0.98)} 0%, ${alpha(
              "#001e3c",
              0.95
            )} 100%)`,
        borderTop: `1px solid ${alpha(isLight ? "#000" : "#fff", 0.08)}`,
        backdropFilter: "blur(20px)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${alpha(
            theme.palette.primary.main,
            0.3
          )}, transparent)`,
        },
      }}
    >
      <Container maxWidth="xl">
        {/* Main Footer Content */}
        <Box
          sx={{
            py: 6,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1.2fr 0.8fr 0.8fr 1.2fr",
            },
            gap: 4,
          }}
        >
          {/* Brand Section */}
          <Box sx={{ gridColumn: { xs: "1", md: "1" } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #1976d2, #35a4ff)",
                  boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "1.2rem",
                    color: "white",
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  TB
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #1976d2 0%, #35a4ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.5px",
                }}
              >
                ToolBox
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: alpha(theme.palette.text.primary, 0.7),
                maxWidth: 280,
                mb: 3,
                lineHeight: 1.6,
              }}
            >
              Your comprehensive toolkit for developers and creators. 
              Streamline your workflow with our collection of powerful tools.
            </Typography>
            
            {/* Social Links */}
            <Stack direction="row" spacing={1.5}>
              {[GitHub, Twitter, LinkedIn].map((Icon, index) => (
                <IconButton
                  key={index}
                  size="small"
                  sx={{
                    width: 36,
                    height: 36,
                    background: alpha(theme.palette.primary.main, 0.08),
                    borderRadius: "10px",
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: `linear-gradient(135deg, ${alpha(
                        theme.palette.primary.main,
                        0.2
                      )}, ${alpha(theme.palette.primary.dark, 0.2)})`,
                      transform: "translateY(-3px)",
                      borderColor: alpha(theme.palette.primary.main, 0.3),
                      boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
                    },
                  }}
                >
                  <Icon sx={{ fontSize: 18, color: theme.palette.text.primary }} />
                </IconButton>
              ))}
            </Stack>
          </Box>

          {/* Quick Links - Column 1 */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: theme.palette.text.primary,
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: "1px",
              }}
            >
              Resources
            </Typography>
            <Stack spacing={1.5}>
              {["Documentation", "API Reference", "Changelog", "Status"].map((item) => (
                <Typography
                  key={item}
                  variant="body2"
                  sx={{
                    color: alpha(theme.palette.text.primary, 0.7),
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Stack>
          </Box>

          {/* Quick Links - Column 2 */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: theme.palette.text.primary,
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: "1px",
              }}
            >
              Company
            </Typography>
            <Stack spacing={1.5}>
              {["About Us", "Blog", "Careers", "Contact"].map((item) => (
                <Typography
                  key={item}
                  variant="body2"
                  sx={{
                    color: alpha(theme.palette.text.primary, 0.7),
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Stack>
          </Box>

          {/* Newsletter/Updates */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: theme.palette.text.primary,
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: "1px",
              }}
            >
              Stay Updated
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: alpha(theme.palette.text.primary, 0.7),
                mb: 2,
              }}
            >
              Get the latest tools and updates directly to your inbox.
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 0.5,
                borderRadius: "14px",
                background: alpha(theme.palette.background.paper, 0.6),
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                backdropFilter: "blur(8px)",
                "&:focus-within": {
                  borderColor: alpha(theme.palette.primary.main, 0.5),
                  boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
                },
              }}
            >
              <Box
                component="input"
                placeholder="Enter your email"
                sx={{
                  flex: 1,
                  border: "none",
                  background: "transparent",
                  p: 1.5,
                  px: 2,
                  color: theme.palette.text.primary,
                  fontSize: "0.875rem",
                  outline: "none",
                  "&::placeholder": {
                    color: alpha(theme.palette.text.primary, 0.4),
                  },
                }}
              />
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: "10px",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  color: "white",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateX(-2px)",
                    boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                  },
                }}
              >
                Subscribe
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Divider */}
        <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.1) }} />

        {/* Bottom Bar */}
        <Box
          sx={{
            py: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: alpha(theme.palette.text.primary, 0.6),
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            © {new Date().getFullYear()} ToolBox. All rights reserved.
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: alpha(theme.palette.text.primary, 0.6),
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              Privacy Policy
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: alpha(theme.palette.text.primary, 0.6),
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              Terms of Service
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: alpha(theme.palette.text.primary, 0.6),
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                ml: { xs: 0, sm: 2 },
              }}
            >
              Built with <Favorite sx={{ fontSize: 14, color: theme.palette.error.main }} /> using React & MUI
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}