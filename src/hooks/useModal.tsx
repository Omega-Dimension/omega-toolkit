import { Box, Button, Modal } from "@mui/material";
import { Close } from "@mui/icons-material";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  forwardRef,
  type ReactNode,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type ModalContextValue = {
  openModal(content: ReactNode): void;
  closeModal(): void;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside Modal Provider");
  return ctx;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const isOpen = Boolean(content);

  const openModal = useCallback((node: ReactNode) => {
    setContent(node);
  }, []);

  const closeModal = useCallback(() => {
    if (!closeBtnRef.current) {
      setContent(null);
      return;
    }

    gsap.to(closeBtnRef.current, {
      y: -20,
      rotate: 180,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setContent(null),
    });
  }, []);

  const handleBackdropClick = (event: { target: any; currentTarget: any }) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {isOpen && (
        <Modal open={isOpen} onClose={closeModal} onClick={handleBackdropClick}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
              p: 4,
            }}
          >
            <Box sx={{ position: "relative" }}>
              <CloseButton ref={closeBtnRef} onClose={closeModal} />
              {content}
            </Box>
          </Box>
        </Modal>
      )}
    </ModalContext.Provider>
  );
}

const CloseButton = forwardRef<HTMLButtonElement, { onClose: () => void }>(
  (props, ref) => {
    const { onClose } = props;

    useGSAP(() => {
      if (!ref || typeof ref === "function") return;

      gsap.fromTo(
        ref.current,
        { y: -20, rotate: -90, opacity: 0 },
        {
          y: 0,
          rotate: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
      );
    });

    return (
      <Button
        ref={ref}
        onClick={onClose}
        sx={{
          position: "absolute",
          top: -16,
          right: -16,
          minWidth: "auto",
          width: 32,
          height: 32,
          borderRadius: "50%",
          bgcolor: "background.paper",
          boxShadow: 2,
          "&:hover": {
            bgcolor: "background.paper",
            transform: "rotate(90deg)",
            transition: "transform 0.3s ease",
          },
        }}
      >
        <Close fontSize="small" />
      </Button>
    );
  },
);

export default CloseButton;
