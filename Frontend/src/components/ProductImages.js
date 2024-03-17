import { useState } from "react";
import styled from "styled-components";
import Modal from 'react-modal';

Modal.setAppElement('#root')

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 300px;
`;

const ImageButtons = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  margin-top: 10px;
`;

const ImageButton = styled.div`
  height: 60px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;
const Button = styled.button`
  background-color: #444; 
  color: white;
  border: none;
  padding: 10px 20px; 
  margin: 0 10px;
  cursor: pointer; 
  font-size: 20px;
  opacity: 0.7; 

  &:hover {
    opacity: 1; 
  }
`;
const customStyles = {
  overlay: {
    backgroundColor: '#222', 
  },
  content: {
    width: '70vw',
    height: '70vh',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    zIndex: 11000,
  },
};

export default function ProductImages({ images }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function nextImage() {
    setActiveImageIndex((activeImageIndex + 1) % images.length);
  }

  function prevImage() {
    setActiveImageIndex((activeImageIndex - 1 + images.length) % images.length);
  }

  return (
    <>
      <BigImageWrapper>
        <BigImage src={images[activeImageIndex]} alt="Product" onClick={openModal} />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image, index) => (
          <ImageButton
            key={index}
            active={image === images[activeImageIndex]}
            onClick={() => setActiveImageIndex(index)}
          >
            <Image src={image} alt={`Product image ${index + 1}`} />
          </ImageButton>
        ))}
      </ImageButtons>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Product Image"
        style={customStyles}
      >
        <Button onClick={prevImage}>{'<'}</Button>
        <img src={images[activeImageIndex]} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'fit' }} />
        <Button onClick={nextImage}>{'>'}</Button>
      </Modal>
    </>
  );
}
