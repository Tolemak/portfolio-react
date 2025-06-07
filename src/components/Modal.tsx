import React, { useEffect } from 'react';
import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content glass"
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        <button className="modal-close" onClick={onClose} aria-label="Zamknij">&times;</button>
        {children}
      </div>
      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(10, 20, 40, 0.7);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.2s;
        }
        .modal-content {
          background: rgba(30, 40, 60, 0.95);
          border-radius: 1.2rem;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          padding: 2.5rem 2rem 2rem 2rem;
          min-width: 320px;
          max-width: 95vw;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          border: 1.5px solid rgba(255,255,255,0.18);
          animation: modalPop 0.25s cubic-bezier(.4,2,.6,1) both;
        }
        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1.2rem;
          background: none;
          border: none;
          font-size: 2rem;
          color: #fff;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .modal-close:hover {
          opacity: 1;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalPop {
          from { transform: scale(0.95) translateY(30px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Modal;
