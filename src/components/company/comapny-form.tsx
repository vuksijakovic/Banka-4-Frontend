'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().nonempty(),
  tin: z.string().nonempty(),
  crn: z.string().nonempty(),
  address: z.string().nonempty(),
});

export type CompanyFormData = z.infer<typeof formSchema>;

export interface CompanyFormProps {
  enabled?: boolean;
  onSubmitAction: (values: CompanyFormData) => void;
}

export default function CompanyForm({
  onSubmitAction,
  enabled = true,
}: CompanyFormProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      tin: '',
      crn: '',
      address: '',
    },
  });

  return (
    <Card className="w-[348px] shadow-md">
      <CardHeader className="space-y-2">
        <CardTitle>Add New Company</CardTitle>
        <CardDescription>
          Fill in the details to add a new company.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitAction)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Company Name" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">TIN</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Tax Identification Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="crn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">CRN</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Company Registration Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Company Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                variant="default"
                className="font-normal"
                disabled={!enabled}
              >
                Add Company
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
