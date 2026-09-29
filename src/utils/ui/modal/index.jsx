import { useRef, useEffect } from 'react';

export const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  onCloseWithReset,
  showCloseButton = true, // Default to true for backwards compatibility
  isFullscreen = false,
  disableClose = false,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && !disableClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contentClasses = isFullscreen
    ? 'w-full h-full'
    : 'relative w-full rounded-2xl bg-white  dark:bg-gray-900';

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-[99999] ">
      {!isFullscreen && (
        <div
          className="fixed inset-0 h-full w-full bg-black bg-opacity-50 "
          onClick={onClose}
        ></div>
      )}
      <div
        ref={modalRef}
        className={`${contentClasses}  ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={onCloseWithReset || onClose}
            className="absolute right-3 top-3 z-999 flex justify-center items-center p-3 rounded-md  hover:bg-gray-50 transition-colors sm:right-6 sm:top-6 sm:h-11 sm:w-11"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};
