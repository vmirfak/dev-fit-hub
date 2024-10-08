import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  exerciseName: string;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, videoUrl, exerciseName }) => {
  if (!isOpen) return null;

  const videoId = videoUrl.split("v=")[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: 600,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          position: "relative", 
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <Typography id="modal-title" variant="h6" component="h2" sx={{ flex: 1, textAlign: "center" }}>
            {exerciseName}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 0, 
              top: -10,
              color: "red",
            }}
          >
            <FaTimes style={{ fontSize: "24px" }} />
          </IconButton>
        </div>
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <iframe
            width="100%"
            height="315"
            src={embedUrl}
            title="YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
