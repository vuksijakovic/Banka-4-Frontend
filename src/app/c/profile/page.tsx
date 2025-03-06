'use client';

import ClientProfile from '@/components/client/client-profile';
import GuardBlock from '@/components/GuardBlock';
import { useBreadcrumb } from '@/context/BreadcrumbContext';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { dispatch } = useBreadcrumb();
  useEffect(() => {
    dispatch({
      type: 'SET_BREADCRUMB',
      items: [{ title: 'Profile' }],
    });
  }, [dispatch]);
  return (
    <GuardBlock requiredUserType={'client'}>
      <ClientProfile />
    </GuardBlock>
  );
}
