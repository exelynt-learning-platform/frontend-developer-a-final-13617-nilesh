import { useEffect, useState } from 'react';
import { useModal } from '@src/hooks/useModal';

import SearchInput from '@src/components/form/input/SearchInput';
import Button from '@src/utils/ui/button/Button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@src/utils/ui/table';

import DeleteIcon from '@src/components/icons/DeleteIcon.jsx';
import EditIcon from '@src/components/icons/EditIcon.jsx';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEmployees,
  fetchEmployeeById,
  addEmployee,
  editEmployee,
  removeEmployee,
} from '@src/redux/store/employee/employeeThunks';
import { fetchCountries } from '@src/redux/store/country/countryThunks';
import {
  clearMutationError,
  clearSelectedEmployee,
} from '@src/redux/store/employee/employeeSlice';

import { Employee, DeleteEmployeeModal } from '@src/components/Employee/Modal';
import LoadingSpinner from '@src/components/common/LoadingSpinner';

import { toast } from 'react-toastify';

const EmployeeManagement = () => {
  const dispatch = useDispatch();

  const { employees, loading, error, selectedEmployee, mutationLoading } =
    useSelector((state) => state.employee);

  const { isOpen, openModal, closeModal } = useModal();
  const [mode, setMode] = useState('add');

  const {
    isOpen: isDeleteOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchEmployees())
      .unwrap()
      .catch((error) => {
        toast.error(
          typeof error === 'string'
            ? error
            : 'Unable to fetch employees. Please try again.',
        );
      });

    dispatch(fetchCountries());
  }, [dispatch]);

  const handleOpenAdd = () => {
    dispatch(clearMutationError());

    setMode('add');
    openModal();
  };

  const handleOpenEdit = async (employee) => {
    dispatch(clearMutationError());

    try {
      await dispatch(fetchEmployeeById(employee.id)).unwrap();

      setMode('edit');
      openModal();
    } catch (error) {
      console.error('Failed to fetch employee:', error);
    }
  };

  const handleCloseEmployee = () => {
    if (mutationLoading) return;

    dispatch(clearMutationError());
    dispatch(clearSelectedEmployee());

    setMode('add');
    closeModal();
  };

  const handleEmployeeSubmit = async (formData) => {
    try {
      if (mode === 'add') {
        await dispatch(addEmployee(formData)).unwrap();

        toast.success('Employee added successfully.');
      } else {
        if (!selectedEmployee?.id) return;

        await dispatch(
          editEmployee({
            id: selectedEmployee.id,
            payload: formData,
          }),
        ).unwrap();

        toast.success('Employee updated successfully.');
      }

      handleCloseEmployee();
    } catch (error) {
      console.error(`${mode} employee failed:`, error);

      toast.error(
        typeof error === 'string'
          ? error
          : mode === 'add'
            ? 'Failed to add employee. Please try again.'
            : 'Failed to update employee. Please try again.',
      );
    }
  };

  const handleOpenDelete = (employee) => {
    setEmployeeToDelete(employee);
    openDeleteModal();
  };

  const handleCloseDelete = () => {
    if (mutationLoading) return;

    setEmployeeToDelete(null);
    closeDeleteModal();
  };

  const handleDeleteEmployee = async () => {
    if (!employeeToDelete?.id) return;

    try {
      await dispatch(removeEmployee(employeeToDelete.id)).unwrap();

      toast.success('Employee deleted successfully.');

      handleCloseDelete();
    } catch (error) {
      console.error('Delete employee failed:', error);

      toast.error(
        typeof error === 'string'
          ? error
          : 'Failed to delete employee. Please try again.',
      );
    }
  };

  const {
    countries,
    loading: countryLoading,
    error: countryError,
  } = useSelector((state) => state.country);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const displayedEmployees = employees.filter((employee) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return true;
    }

    const employeeId = employee.id?.toString().toLowerCase() || '';
    const employeeName = employee.name?.toLowerCase() || '';
    return employeeId.includes(query) || employeeName.includes(query);
  });

  return (
    <>
      <div className="w-full">
        {/* Employee Management */}
        <div className="h-[70px] w-full rounded-xl bg-white">
          <div className="p-5">
            <span className="text-xl font-semibold">TeamSync</span>
          </div>
        </div>

        {/* Employee List */}
        <div className="mt-3 w-full rounded-xl bg-white p-5">
          {/* Toolbar */}
          <div className="flex min-h-[40px] w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Left */}
            <div className="shrink-0">
              <span className="text-xl font-semibold">Employee List</span>
            </div>

            {/* Right */}
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <SearchInput
                placeholder="Search employee"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-[237px] bg-[#E2E8F0] text-black"
              />

              <Button
                onClick={handleOpenAdd}
                className="w-full bg-[#354075] px-4 py-2 text-sm sm:w-auto"
              >
                Add Employee
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="mt-5 w-full overflow-hidden rounded-[7px] border border-[#E7E9ED]">
            <div className="max-h-[calc(100vh-300px)] w-full overflow-auto">
              <Table className="w-full min-w-[760px] border-collapse">
                <TableHeader className={`sticky top-0 z-10 bg-white`}>
                  <TableRow className="border-b border-[#E7E9ED] bg-white">
                    <TableCell
                      isHeader
                      className="px-5 py-4 text-left text-sm font-normal text-[#858B98]"
                    >
                      Name
                    </TableCell>

                    <TableCell
                      isHeader
                      className="px-5 py-4 text-left text-sm font-normal text-[#858B98]"
                    >
                      Email
                    </TableCell>

                    <TableCell
                      isHeader
                      className="px-5 py-4 text-left text-sm font-normal text-[#858B98]"
                    >
                      Mobile
                    </TableCell>

                    <TableCell
                      isHeader
                      className="px-5 py-4 text-left text-sm font-normal text-[#858B98]"
                    >
                      Country
                    </TableCell>

                    <TableCell
                      isHeader
                      className="w-[120px] px-5 py-4 text-center text-sm font-normal text-[#858B98]"
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedEmployees.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="p-0">
                        <div className="flex h-[160px] w-full items-center justify-center">
                          <p className="text-sm text-gray-500">
                            {searchQuery.trim()
                              ? `No employees found for "${searchQuery.trim()}"`
                              : 'No employees available.'}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    displayedEmployees.map((employee) => (
                      <TableRow
                        key={employee?.id}
                        className="border-b border-[#EDF0F3] last:border-b-0 hover:bg-[#FAFBFC]"
                      >
                        <TableCell className="whitespace-nowrap px-5 py-3.5">
                          <span className="text-[14px] font-normal text-[#344054]">
                            {employee?.name || '--'}
                          </span>
                        </TableCell>

                        <TableCell className="whitespace-nowrap px-5 py-3.5">
                          <span className="text-[14px] font-normal text-[#344054]">
                            {employee?.email || '--'}
                          </span>
                        </TableCell>

                        <TableCell className="whitespace-nowrap px-5 py-3.5">
                          <span className="text-[14px] font-normal text-[#344054]">
                            {employee?.mobile || '--'}
                          </span>
                        </TableCell>

                        <TableCell className="whitespace-nowrap px-5 py-3.5">
                          <span className="text-[14px] font-normal text-[#344054]">
                            {employee?.country || '--'}
                          </span>
                        </TableCell>

                        <TableCell className="px-5 py-3.5">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              aria-label={`Edit ${employee?.name}`}
                              onClick={() => handleOpenEdit(employee)}
                              disabled={mutationLoading}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E3E6EB] bg-white text-[#667085] transition hover:bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-[#354075]/20"
                            >
                              <EditIcon />
                            </button>

                            <button
                              type="button"
                              aria-label={`Delete ${employee?.name}`}
                              onClick={() => handleOpenDelete(employee)}
                              disabled={mutationLoading}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E3E6EB] bg-white text-[#667085] transition hover:bg-[#FEF3F2] hover:text-[#D92D20] focus:outline-none focus:ring-2 focus:ring-[#D92D20]/20"
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      <Employee
        isOpen={isOpen}
        onClose={handleCloseEmployee}
        mode={mode}
        employee={selectedEmployee}
        onSubmit={handleEmployeeSubmit}
        loading={mutationLoading}
        countries={countries}
        countryLoading={countryLoading}
        countryError={countryError}
      />

      <DeleteEmployeeModal
        isOpen={isDeleteOpen}
        onClose={handleCloseDelete}
        employee={employeeToDelete}
        onConfirm={handleDeleteEmployee}
        loading={mutationLoading}
      />
    </>
  );
};

export default EmployeeManagement;
