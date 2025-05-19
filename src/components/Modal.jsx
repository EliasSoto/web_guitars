
import '../styles/Modal.css';
import RegisterAdminUserForm from './forms/RegisterAdminUserForm';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>x</button>
          {children}
      </div>
    </div>
  );
}
