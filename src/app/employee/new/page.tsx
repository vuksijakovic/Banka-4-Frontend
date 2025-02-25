'use client';
import EmployeeForm from '@/components/employee/employee-form';

export default function NewEmployeePage() {
  return (
    <EmployeeForm
      title="Add New Employee"
      description="Enter the employee’s details to create their account and grant them access to the system."
      onSubmit={(data) => console.log('Creating Employee:', data)}
      defaultValues={{
        firstName: '',
        lastName: '',
        dateOfBirth: undefined,
        email: '',
        address: '',
        phoneNumber: '',
        position: '',
        username: '',
        department: '',
        gender: 'male',
        isActive: true,
      }}
    />
  );
}
