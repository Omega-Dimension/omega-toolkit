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
  useEffect,
  type MouseEvent,
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
  const modalBoxRef = useRef<HTMLDivElement>(null);

  const isOpen = Boolean(content);

  // Animate modal open
  useGSAP(() => {
    if (isOpen && modalBoxRef.current) {
      gsap.fromTo(
        modalBoxRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "power2.out" },
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (!modalBoxRef.current || !content) return;

    gsap.fromTo(
      modalBoxRef.current,
      { opacity: 0, scale: 0.97 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.18,
        ease: "power2.out",
      },
    );
  }, [content]);

  const openModal = useCallback(function (node: ReactNode) {
    setContent(node);
  }, []);

  const closeModal = useCallback(() => {
    if (!modalBoxRef.current) {
      setContent(null);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => setContent(null),
    });

    // modal fade out
    tl.to(modalBoxRef.current, {
      opacity: 0,
      scale: 0.97,
      duration: 0.18,
      ease: "power2.in",
    });

    // keep your button animation
    if (closeBtnRef.current) {
      tl.to(
        closeBtnRef.current,
        {
          y: -20,
          rotate: 180,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        },
        0,
      );
    }
  }, []);

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {isOpen && (
        <Modal open={isOpen} onClose={closeModal} onClick={handleBackdropClick}>
          <Box
            ref={modalBoxRef}
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
              opacity: 0, // Start invisible
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
