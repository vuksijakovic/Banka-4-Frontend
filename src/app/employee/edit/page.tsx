'use client';
import EmployeeForm, {
  EmployeeFormValues,
} from '@/components/form/employee/form';

export default function EditEmployeePage() {
  const employee: EmployeeFormValues = {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: new Date('1990-05-15'),
    email: 'john.doe@example.com',
    address: '123 Main Street, Belgrade',
    phoneNumber: '+381612345678',
    position: 'Software Engineer',
    username: 'johndoe',
    department: 'IT',
    gender: 'male',
    isActive: true,
  };

  return (
    <EmployeeForm
      title="Edit Employee Details"
      description="Update the employee’s information and manage their account status."
      onSubmit={(data) => console.log('Editing Employee:', data)}
      defaultValues={employee}
    />
  );
}
