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
import { Loader2, Search } from 'lucide-react';
import { PaginationSection } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useBreadcrumb } from '@/context/BreadcrumbContext';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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

const getAccessToken = () => {
  return sessionStorage.getItem('b4/accessToken'); // Replace with your method of getting the access token
};

const buildUrl = (
  filters: {
    first_name: string;
    last_name: string;
    email: string;
    position: string;
  },
  rowsPerPage: number
) => {
  let url = `http://localhost:8080/employee/search?size=${rowsPerPage}`;
  if (filters.first_name) url += `&firstName=${filters.first_name}`;
  if (filters.last_name) url += `&lastName=${filters.last_name}`;
  if (filters.email) url += `&email=${filters.email}`;
  if (filters.position) url += `&position=${filters.position}`;
  return url;
};

const EmployeeOverviewPage: React.FC = () => {
  const [filters, setFilters] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const rowsPerPage = 8;

  const { data, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const url = buildUrl(filters, rowsPerPage);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      return response.data;
    },
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const employees = data?.content;
  const totalPages = data?.totalPages || 0;

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
              name="first_name"
              placeholder="filter by first name"
              value={filters.first_name}
              onChange={handleFilterChange}
            />
            <Input
              type="text"
              name="last_name"
              placeholder="filter by last name"
              value={filters.last_name}
              onChange={handleFilterChange}
            />
            <Input
              type="text"
              name="email"
              placeholder="filter by email"
              value={filters.email}
              onChange={handleFilterChange}
            />
            <Input
              type="text"
              name="position"
              placeholder="filter by position"
              value={filters.position}
              onChange={handleFilterChange}
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
                          router.replace(`/employee/${employee.id}/edit`)
                        }
                      >
                        <TableCell>{employee.firstName}</TableCell>
                        <TableCell>{employee.lastName}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{employee.phone}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{employee.active ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              <PaginationSection
                pageCount={totalPages}
                currentPage={currentPage}
                onChangePage={setCurrentPage}
                resultsLength={data === undefined ? 0 : data.totalPages}
                pageSize={data === undefined ? 0 : data.size}
              ></PaginationSection>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeOverviewPage;
