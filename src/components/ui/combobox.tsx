import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

interface ComboboxProps<T> {
    options: T[];
    value: string;
    onChange: (value: string) => void;
    getOptionValue: (option: T) => string;
    getOptionLabel: (option: T) => string;
    placeholder?: string;
}

export function Combobox<T>({
                                options,
                                value,
                                onChange,
                                getOptionValue,
                                getOptionLabel,
                                placeholder = 'Select...',
                            }: ComboboxProps<T>) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value ? getOptionLabel(options.find(option => getOptionValue(option) === value)!) : placeholder}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No options found.</CommandEmpty>
                        <CommandGroup>
                            {options.map(option => {
                                const optionValue = getOptionValue(option);
                                return (
                                    <CommandItem
                                        key={optionValue}
                                        value={optionValue}
                                        onSelect={currentValue => {
                                            onChange(currentValue === value ? '' : currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        {getOptionLabel(option)}
                                        <Check className={`ml-auto ${value === optionValue ? 'opacity-100' : 'opacity-0'}`} />
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
