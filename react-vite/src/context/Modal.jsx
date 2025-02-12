import { useRef, useState, useContext, createContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  // callback function that will be called when modal is closing
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    document.body.classList.remove('no-scroll');
    if (typeof onModalClose === 'function') {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const openModal = (content) => {
		setModalContent(content);
		document.body.classList.add('no-scroll');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

  document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const contextValue = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent: openModal, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal // function to close the modal
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
		<div id='modal'>
			<div id='modal-background' onClick={closeModal} />
			<div id='modal-content'>
				{/* Ensure the close button is inside modal-content */}
				<button className='close-button' onClick={closeModal}>
					×
				</button>
				{modalContent}
			</div>
		</div>,
		modalRef.current
  );
}

export const useModal = () => useContext(ModalContext);
