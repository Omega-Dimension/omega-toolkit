import { Box, Container, Typography, useTheme, alpha, IconButton, Stack, Divider } from "@mui/material";
import { GitHub, LinkedIn, Twitter, Favorite, BugReport, Forum } from "@mui/icons-material";

// Define interfaces for type safety
interface LinkItem {
  name: string;
  url: string;
  external: boolean;
}

interface SocialLinkItem {
  Icon: React.ElementType;
  url: string;
  label: string;
}

interface LinkListProps {
  links: LinkItem[];
}

export default function Footer() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  // Menu data arrays with proper typing
  const resourceLinks: LinkItem[] = [
    { name: "React Documentation", url: "https://react.dev", external: true },
    { name: "MUI Documentation", url: "https://mui.com/material-ui/getting-started/", external: true },
    { name: "API Reference", url: "https://mui.com/material-ui/api/", external: true },
    { name: "Changelog", url: "https://github.com/mui/material-ui/releases", external: true },
    { name: "Status", url: "https://status.mui.com", external: true },
  ];

  const companyLinks: LinkItem[] = [
    { name: "About Us", url: "/about", external: false },
    { name: "Contact", url: "/contact", external: false },
  ];

  const bottomLinks: LinkItem[] = [
    { name: "Privacy Policy", url: "/privacy", external: false },
    { name: "Terms of Service", url: "/terms", external: false },
  ];

  const socialLinks: SocialLinkItem[] = [
    { Icon: GitHub, url: "https://github.com", label: "GitHub" },
    { Icon: Twitter, url: "https://twitter.com", label: "Twitter" },
    { Icon: LinkedIn, url: "https://linkedin.com", label: "LinkedIn" },
  ];

  const linkStyles = {
    color: alpha(theme.palette.text.primary, 0.7),
    cursor: "pointer",
    transition: "all 0.2s ease",
    textDecoration: "none",
    display: "inline-block",
    "&:hover": {
      color: theme.palette.primary.main,
      transform: "translateX(4px)",
    },
  };

  const sectionTitleStyles = {
    fontWeight: 700,
    mb: 2,
    color: theme.palette.text.primary,
    textTransform: "uppercase",
    fontSize: "0.75rem",
    letterSpacing: "1px",
  };

  const LinkList = ({ links }: LinkListProps) => (
    <Stack spacing={1.5}>
      {links.map((link: LinkItem) => (
        <Typography
          key={link.name}
          component="a"
          href={link.url}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
          variant="body2"
          sx={linkStyles}
        >
          {link.name}
        </Typography>
      ))}
    </Stack>
  );

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
              {socialLinks.map(({ Icon, url, label }: SocialLinkItem) => (
                <IconButton
                  key={label}
                  component="a"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
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

          {/* Resources Section */}
          <Box>
            <Typography variant="subtitle2" sx={sectionTitleStyles}>
              Resources
            </Typography>
            <LinkList links={resourceLinks} />
          </Box>

          {/* Company Section */}
          <Box>
            <Typography variant="subtitle2" sx={sectionTitleStyles}>
              Company
            </Typography>
            <LinkList links={companyLinks} />
          </Box>

          {/* Help & Feedback Section - Replaces Newsletter */}
          <Box>
            <Typography variant="subtitle2" sx={sectionTitleStyles}>
              👋 Let's Connect
            </Typography>
            
            <Typography
              variant="body2"
              sx={{
                color: alpha(theme.palette.text.primary, 0.7),
                mb: 2,
                lineHeight: 1.6,
                fontStyle: "italic",
              }}
            >
              "Found a bug? Have a suggestion? We're all ears! Your feedback makes ToolBox better for everyone."
            </Typography>
            
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Box
                component="a"
                href="https://github.com/your-username/toolbox/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: "20px",
                  background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.1)}, ${alpha(theme.palette.error.dark, 0.05)})`,
                  border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
                  color: theme.palette.error.main,
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.15)}, ${alpha(theme.palette.error.dark, 0.1)})`,
                    transform: "translateY(-2px)",
                    boxShadow: `0 4px 12px ${alpha(theme.palette.error.main, 0.2)}`,
                  },
                }}
              >
                <BugReport sx={{ fontSize: 18 }} />
                Report Issue
              </Box>
              
              <Box
                component="a"
                href="https://github.com/your-username/toolbox/discussions"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: "20px",
                  background: alpha(theme.palette.primary.main, 0.1),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  color: theme.palette.primary.main,
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: alpha(theme.palette.primary.main, 0.15),
                    transform: "translateY(-2px)",
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
                  },
                }}
              >
                <Forum sx={{ fontSize: 18 }} />
                Share Ideas
              </Box>
            </Stack>
            
            <Typography
              variant="caption"
              sx={{
                display: "block",
                mt: 2,
                color: alpha(theme.palette.text.primary, 0.5),
                fontSize: "0.7rem",
              }}
            >
              💡 Every report helps us improve. Thank you for being part of our journey!
            </Typography>
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
            {/* Bottom Links */}
            {bottomLinks.map((link: LinkItem) => (
              <Typography
                key={link.name}
                component="a"
                href={link.url}
                variant="body2"
                sx={{
                  color: alpha(theme.palette.text.primary, 0.6),
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  textDecoration: "none",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {link.name}
              </Typography>
            ))}
            
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