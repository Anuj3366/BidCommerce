"use client";
import { useState } from "react";
import styled from "styled-components";

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
  border: 2px solid ${props => props.active ? '#ccc' : 'transparent'};
  height: 60px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} alt="Product" />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image, index) => (
          <ImageButton
            key={index}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt={`Product image ${index + 1}`} />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
