'use client';
import { useBreadcrumb } from '@/context/BreadcrumbContext';
import { useEffect } from 'react';

export default function EmployeeHomePage() {
  const { dispatch } = useBreadcrumb();
  useEffect(() => {
    dispatch({
      type: 'SET_BREADCRUMB',
      items: [{ title: 'Home' }],
    });
  }, [dispatch]);

  return <h1>Hi!</h1>;
}
