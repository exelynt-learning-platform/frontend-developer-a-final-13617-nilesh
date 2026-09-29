import { Modal } from '@src/utils/ui/modal';
import React from 'react';
import { FiTrash } from 'react-icons/fi';
import Button from '@src/utils/ui/button/Button';
const DeleteAlert = ({
  isOpen,
  onClose,
  onDelete,
  label = 'item',
  title = 'Delete Confirmation',
  message,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] p-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="bg-red-100 rounded-full p-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-200">
              <FiTrash className="text-red-600" />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-800">
            {title ? `${title}` : ' Delete Confirmation'}
          </h2>
        </div>

        {/* Description */}
        {message ? (
          <p className="text-sm text-gray-600">{message}</p>
        ) : (
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this{' '}
            <span className="font-semibold text-gray-900">{label}</span>? You
            can cancel if you want to keep it.
          </p>
        )}

        {/* Actions */}
        <div className="h-11 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} className="border">
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={onDelete}
            className="bg-[#F04438] text-white"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAlert;
