import Modal from "react-modal";

const AppModal = ({ children, contentStyle = {}, ...props }) => {
  return (
    <Modal
      {...props}
      style={{
        overlay: {
          backgroundColor: "rgba(15, 23, 42, 0.45)",
          backdropFilter: "blur(4px)",
          zIndex: 50,
        },
        content: {
          border: "none",
          borderRadius: "1.5rem",
          overflow: "visible",
          padding: "0",
          top: "auto",
          bottom: "auto",
          left: "auto",
          right: "auto",
          background: "transparent",
          outline: "none",
          ...contentStyle,
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default AppModal;
