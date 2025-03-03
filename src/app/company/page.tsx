'use client';

import CompanyForm, {
  CompanyFormData,
} from '@/components/company/comapny-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function CompanyPage() {
  const router = useRouter();

  const { isPending, mutate: addCompany } = useMutation({
    mutationFn: async (_data: CompanyFormData) => {},
    onError: (_err) => {
      toast.error('Failed to add company');
    },
    onSuccess: () => {
      toast.success('Company added successfully');
      ///router.push('/companies');
    },
  });

  return (
    <div className="flex justify-center items-center pt-16">
      <CompanyForm isPending={!isPending} onSubmitAction={addCompany} />
    </div>
  );
}
