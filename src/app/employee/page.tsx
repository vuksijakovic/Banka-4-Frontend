'use client';

import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useHttpClient } from '@/context/HttpClientContext';
import { Loader2, Search } from 'lucide-react';
import { PaginationSection } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useBreadcrumb } from '@/context/BreadcrumbContext';
import GuardBlock from '@/components/GuardBlock';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { searchEmployees } from '@/api/employee';

const employeeSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  position: z.string(),
  active: z.boolean(),
});

type Employee = z.infer<typeof employeeSchema>;

const EmployeeOverviewPage: React.FC = () => {
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchFilters, setSearchFilters] = useState(filters);
  const router = useRouter();
  const rowsPerPage = 1;

  const client = useHttpClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['employees', searchFilters, currentPage - 1, rowsPerPage],
    queryFn: async () => {
      const response = await searchEmployees(
        client,
        searchFilters,
        rowsPerPage,
        currentPage
      );
      return response.data;
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    setSearchFilters(filters);
    setCurrentPage(1);
    refetch();
  };

  const employees = data?.content || [];

  const { dispatch } = useBreadcrumb();
  useEffect(() => {
    dispatch({
      type: 'SET_BREADCRUMB',
      items: [
        { title: 'Home', url: '/' },
        { title: 'Employees', url: '/employee' },
        { title: 'Overview' },
      ],
    });
  }, [dispatch]);

  return (
    <GuardBlock requiredPrivileges={['ADMIN']}>
      <div className="p-8">
        <Card className="max-w-[900px] mx-auto">
          <CardHeader>
            <h1 className="text-2xl font-bold">Employees Overview</h1>
            <p className="text-sm text-zinc-500">
              This table provides a clear and organized overview of key employee
              details for quick reference and easy access.
            </p>
            <div className="flex mb-4 space-x-2">
              <Input
                type="text"
                name="firstName"
                placeholder="filter by first name"
                value={filters.firstName}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="lastName"
                placeholder="filter by last name"
                value={filters.lastName}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="email"
                placeholder="filter by email"
                value={filters.email}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="position"
                placeholder="filter by position"
                value={filters.position}
                onChange={handleInputChange}
              />
              <Button onClick={handleSearch}>
                Search
                <Search className="w-4 h-4 mr-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="rounded-lg overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center p-4">
                <Loader2 className="animate-spin w-6 h-6" />
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>First Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Active</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {employees === undefined || employees.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center p-6 text-zinc-500"
                        >
                          There are currently no employees
                        </TableCell>
                      </TableRow>
                    ) : (
                      employees.map((employee: Employee) => (
                        <TableRow
                          key={employee.id}
                          onClick={() =>
                            router.push(`/employee/${employee.id}/edit`)
                          }
                        >
                          <TableCell>{employee.firstName}</TableCell>
                          <TableCell>{employee.lastName}</TableCell>
                          <TableCell>{employee.email}</TableCell>
                          <TableCell>{employee.phone}</TableCell>
                          <TableCell>{employee.position}</TableCell>
                          <TableCell>
                            {employee.active ? 'Yes' : 'No'}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                <PaginationSection
                  pageCount={data?.totalPages}
                  currentPage={currentPage}
                  onChangePage={(page) => {
                    setCurrentPage(page);
                    refetch();
                  }}
                  resultsLength={employees.length}
                  pageSize={rowsPerPage}
                ></PaginationSection>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </GuardBlock>
  );
};

export default EmployeeOverviewPage;
