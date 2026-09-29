import React from 'react';

import { Modal } from '@src/utils/ui/modal';
import Button from '@src/utils/ui/button/Button';
import DeleteIcon from '@src/components/icons/DeleteIcon.jsx';

const DeleteEmployeeModal = ({
  isOpen,
  onClose,
  employee,
  onConfirm,
  loading = false,
}) => {
  const handleClose = () => {
    if (loading) return;

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      disableClose={loading}
      className="w-[calc(100%-32px)] max-w-[450px]"
    >
      <div className="p-5 sm:p-6">
        {/* Icon */}

        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <DeleteIcon />
        </div>

        {/* Content */}

        <div className="mt-4">
          <h2 className="text-center text-lg font-semibold text-gray-800">
            Delete Employee
          </h2>

          <p className="text-center mt-2 text-sm leading-6 text-gray-500">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-gray-700">
              {employee?.name || 'this employee'}
            </span>
            ?
          </p>

          <p className="text-center text-sm text-gray-500">
            This action cannot be undone.
          </p>
        </div>

        {/* Actions */}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="w-full !bg-[#D92D20] hover:!bg-[#B42318] sm:w-auto"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteEmployeeModal;
