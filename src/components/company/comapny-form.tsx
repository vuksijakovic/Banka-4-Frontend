'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Combobox } from '@/components/ui/combobox';

const formSchema = z.object({
  name: z.string().nonempty(),
  tin: z.string().nonempty(),
  crn: z.string().nonempty(),
  address: z.string().nonempty(),
  activityCode: z.string().nonempty(),
});

export type CompanyFormData = z.infer<typeof formSchema>;

export interface CompanyFormProps {
  isPending?: boolean;
  onSubmitAction: (values: CompanyFormData) => void;
}

const activityCodes = [
  { code: '1.11', branch: 'Uzgoj žitarica i mahunarki' },
  { code: '1.13', branch: 'Uzgoj povrća' },
  { code: '13.1', branch: 'Priprema i predenje tekstilnih vlakana' },
  { code: '24.1', branch: 'Proizvodnja gvožđa i čelika' },
  {
    code: '24.2',
    branch: 'Proizvodnja čeličnih cevi, šupljih profila i fitinga',
  },
  { code: '41.1', branch: 'Razvoj građevinskih projekata' },
  { code: '41.2', branch: 'Izgradnja stambenih i nestambenih zgrada' },
  { code: '42.11', branch: 'Izgradnja puteva i autoputeva' },
  { code: '42.12', branch: 'Izgradnja železničkih i podzemnih pruga' },
  { code: '42.13', branch: 'Izgradnja mostova i tunela' },
  { code: '42.21', branch: 'Izgradnja vodovodnih projekata' },
  {
    code: '42.22',
    branch: 'Izgradnja elektroenergetskih i telekomunikacionih mreža',
  },
  { code: '5.1', branch: 'Vađenje uglja' },
  { code: '7.1', branch: 'Vađenje gvozdenih ruda' },
  { code: '7.21', branch: 'Vađenje uranijuma i torijuma' },
  { code: '8.11', branch: 'Eksploatacija ukrasnog i građevinskog kamena' },
  { code: '8.92', branch: 'Ekstrakcija treseta' },
  {
    code: '47.11',
    branch: 'Trgovina u nespecijalizovanim prodavnicama sa hranom i pićem',
  },
  { code: '56.1', branch: 'Restorani i pokretni ugostiteljski objekti' },
  { code: '62.01', branch: 'Računarsko programiranje' },
  { code: '62.09', branch: 'Ostale IT usluge' },
  { code: '63.11', branch: 'Obrada podataka, hosting i slične delatnosti' },
  { code: '64.19', branch: 'Ostale monetarne posredničke delatnosti' },
  { code: '64.91', branch: 'Finansijski lizing' },
  { code: '64.2', branch: 'Holding kompanije' },
  { code: '66.3', branch: 'Fondovi i slične finansijske delatnosti' },
  { code: '65.2', branch: 'Reosiguranje' },
  { code: '65.11', branch: 'Životno osiguranje' },
  { code: '65.12', branch: 'Neživotno osiguranje' },
  { code: '66.21', branch: 'Procena rizika i štete' },
  {
    code: '68.1',
    branch: 'Upravljanje nekretninama na osnovu naknade ili ugovora',
  },
  {
    code: '68.2',
    branch:
      'Izdavanje i upravljanje nekretninama u sopstvenom ili iznajmljenom vlasništvu',
  },
  { code: '53.1', branch: 'Poštanske aktivnosti' },
  { code: '53.2', branch: 'Kurirske aktivnosti' },
  { code: '85.1', branch: 'Predškolsko obrazovanje' },
  { code: '85.2', branch: 'Osnovno obrazovanje' },
  { code: '86.1', branch: 'Bolničke aktivnosti' },
  { code: '86.21', branch: 'Opšta medicinska praksa' },
  { code: '86.22', branch: 'Specijalistička medicinska praksa' },
  { code: '86.9', branch: 'Ostale aktivnosti zdravstvene zaštite' },
  { code: '84.12', branch: 'Regulisanje delatnosti privrede' },
  { code: '90.01', branch: 'Delatnost pozorišta' },
  { code: '90.02', branch: 'Delatnost muzeja' },
  { code: '90.04', branch: 'Delatnost botaničkih i zooloških vrtova' },
  { code: '93.11', branch: 'Delovanje sportskih objekata' },
  { code: '93.13', branch: 'Delovanje teretana' },
  { code: '93.19', branch: 'Ostale sportske delatnosti' },
  { code: '26.11', branch: 'Proizvodnja elektronskih komponenti' },
  { code: '27.12', branch: 'Proizvodnja električnih panela i ploča' },
  { code: '29.1', branch: 'Proizvodnja motornih vozila' },
];

export default function CompanyForm({
  onSubmitAction,
  isPending = true,
}: CompanyFormProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      tin: '',
      crn: '',
      address: '',
      activityCode: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
          onSubmitAction(data);
        })}
        className="space-y-4 w-[348px]"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
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
              <FormLabel>TIN</FormLabel>
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
              <FormLabel>CRN</FormLabel>
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
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Company Address" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="activityCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity Code</FormLabel>
              <FormControl>
                <Combobox
                  options={activityCodes}
                  value={field.value}
                  onChange={field.onChange}
                  getOptionValue={(option) => option.code}
                  getOptionLabel={(option) =>
                    `${option.code} ${option.branch.length > 30 ? option.branch.slice(0, 30) + '...' : option.branch}`
                  }
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
            disabled={!isPending}
          >
            Add Company
          </Button>
        </div>
      </form>
    </Form>
  );
}
