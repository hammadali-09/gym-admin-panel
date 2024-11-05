import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import * as z from 'zod';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addVouchers } from '@/voucherSlice';

const frameworks = [
    {
        value: 'Amount',
        label: 'Amount',
    },
    {
        value: 'Percentage',
        label: 'Percentage',
    },
];
const visibility = [
    {
        value: 'All',
        label: 'All',
    },
    {
        value: 'Admin',
        label: 'Admin',
    },
    {
        value: 'Client',
        label: 'Client',
    },
];

const formSchema = z.object({
    code: z.string().min(1, 'Code is required'),
    valid_from: z.date(),
    until_from: z.date(),
    type: z.string(),
    value: z.string().min(1, 'Value is required'),
    visibility: z.string().min(1, 'Visibility is required'),
    redeem_count: z.string(),
    max_redeem: z.string(),
});

type formValues = z.infer<typeof formSchema>;

const AddVoucher = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [value1, setValue1] = useState('');
    const [on, setOn] = useState(false);

    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<formValues>({
        resolver: zodResolver(formSchema),
    });
    useEffect(() => {
        console.log('errors', errors);
    }, [errors]);

    const navigate = useNavigate();

    const onFormSubmit = async (data: formValues) => {
        try {
            const response = await fetch('http://localhost:4200/api/vouchers', {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            if (result.statusCode === 201) {
                dispatch(addVouchers(result.data));
                navigate('/home/vouchers');
            }
        } catch (error) {
            console.error('Error adding voucher to server:', error);
        }
    };

    return (
        <div className="min-h-[800px] w-full p-5">
            <form
                onSubmit={handleSubmit(onFormSubmit)}
                className="flex flex-col gap-y-6"
            >
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 flex flex-col">
                        <Label
                            className="text-sm font-bold text-red-700"
                            htmlFor="code"
                        >
                            Code
                        </Label>
                        <Controller
                            name="code"
                            control={control}
                            render={({
                                field: { name, onBlur, onChange, ref },
                                fieldState: { error },
                            }) => (
                                <>
                                    <Input
                                        id={name}
                                        name={name}
                                        ref={ref}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        className="mt-2 flex h-10 w-full rounded-md"
                                    ></Input>
                                    <p className="mb-2 font-light text-[Brown]">
                                        {error?.message}
                                    </p>
                                </>
                            )}
                        />
                    </div>
                    <div className="col-span-1 flex flex-col">
                        <Label
                            className="text-sm font-bold text-red-700"
                            htmlFor="valid_from"
                        >
                            Valid From
                        </Label>

                        <Controller
                            name="valid_from"
                            control={control}
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'mt-2 h-10 w-full justify-start text-left font-normal',
                                                !field.value &&
                                                    'bg-white hover:bg-white'
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4 text-red-700" />
                                            {field.value ? (
                                                format(field.value, 'PPP')
                                            ) : (
                                                <span className="text-red-300">
                                                    Pick a date
                                                </span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto bg-red-50 p-0">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(selectedDate) =>
                                                field.onChange(
                                                    selectedDate || null
                                                )
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                    </div>
                    <div className="col-span-1 flex flex-col">
                        <Label
                            className="text-sm font-bold text-red-700"
                            htmlFor="until_from"
                        >
                            Valid Until
                        </Label>

                        <Controller
                            name="until_from"
                            control={control}
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'mt-2 h-10 w-full justify-start text-left font-normal',
                                                !field.value &&
                                                    'bg-white hover:bg-white'
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4 text-red-700" />
                                            {field.value ? (
                                                format(field.value, 'PPP')
                                            ) : (
                                                <span className="text-red-300">
                                                    Pick a date
                                                </span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto bg-red-50 p-0">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(selectedDate) =>
                                                field.onChange(
                                                    selectedDate || null
                                                )
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                    </div>
                    <div className="col-span-1 flex flex-col">
                        <Label
                            className="text-sm font-bold text-red-700"
                            htmlFor="Type"
                        >
                            Type
                        </Label>
                        <div className="mt-2 rounded-md bg-white">
                            <Controller
                                name="type"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="h-10 w-full justify-between bg-white hover:bg-white"
                                                onClick={() =>
                                                    setOpen((prev) => !prev)
                                                }
                                            >
                                                {value
                                                    ? frameworks.find(
                                                          (framework) =>
                                                              framework.value ===
                                                              value
                                                      )?.label
                                                    : 'type...'}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-red-700 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto bg-red-50 p-0">
                                            <div>
                                                <ul>
                                                    {frameworks.map(
                                                        (framework) => (
                                                            <li
                                                                key={
                                                                    framework.value
                                                                }
                                                                onClick={() => {
                                                                    field.onChange(
                                                                        framework.value
                                                                    );
                                                                    setValue(
                                                                        framework.label
                                                                    );
                                                                    setOpen(
                                                                        false
                                                                    );
                                                                }}
                                                                className="cursor-pointer p-2"
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        'mr-2 h-4 w-4',
                                                                        value ===
                                                                            framework.value
                                                                            ? 'opacity-100'
                                                                            : 'opacity-0'
                                                                    )}
                                                                />
                                                                {
                                                                    framework.label
                                                                }
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-col">
                        <Label
                            className="text-sm font-bold text-red-700"
                            htmlFor="value"
                        >
                            Value
                        </Label>
                        <Controller
                            name="value"
                            control={control}
                            render={({
                                field: { name, onBlur, onChange, ref },
                                fieldState: { error },
                            }) => (
                                <>
                                    <Input
                                        id={name}
                                        name={name}
                                        ref={ref}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        className="mt-2 flex h-10 w-full rounded-md"
                                    ></Input>
                                    <p className="mb-2 font-light text-[Brown]">
                                        {error?.message}
                                    </p>
                                </>
                            )}
                        />
                    </div>
                    <div className="col-span-1 flex flex-col">
                        <Label
                            className="text-sm font-bold text-red-700"
                            htmlFor="visibility"
                        >
                            Visibility
                        </Label>
                        <div className="mt-2 rounded-md bg-white">
                            <Controller
                                name="visibility"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Popover open={on} onOpenChange={setOn}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={on}
                                                className="h-10 w-full justify-between bg-white hover:bg-white"
                                                onClick={() =>
                                                    setOn((prev) => !prev)
                                                }
                                            >
                                                {value1
                                                    ? visibility.find(
                                                          (visibility) =>
                                                              visibility.value ===
                                                              value1
                                                      )?.label
                                                    : 'type...'}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-red-700 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto bg-red-50 p-0">
                                            <div>
                                                <ul>
                                                    {visibility.map(
                                                        (visibility) => (
                                                            <li
                                                                key={
                                                                    visibility.value
                                                                }
                                                                onClick={() => {
                                                                    field.onChange(
                                                                        visibility.value
                                                                    );
                                                                    setValue1(
                                                                        visibility.label
                                                                    );
                                                                    setOn(
                                                                        false
                                                                    );
                                                                }}
                                                                className="cursor-pointer p-2"
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        'mr-2 h-4 w-4',
                                                                        value1 ===
                                                                            visibility.value
                                                                            ? 'opacity-100'
                                                                            : 'opacity-0'
                                                                    )}
                                                                />
                                                                {
                                                                    visibility.label
                                                                }
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-col">
                        <Label
                            className="text-sm font-bold text-red-700"
                            htmlFor="redeem_count"
                        >
                            Redeem Count
                        </Label>
                        <Controller
                            name="redeem_count"
                            control={control}
                            render={({
                                field: { name, onBlur, onChange, ref },
                                fieldState: { error },
                            }) => (
                                <>
                                    <Input
                                        type="number"
                                        id={name}
                                        name={name}
                                        ref={ref}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        className="mt-2 flex h-10 w-full rounded-md"
                                    ></Input>
                                    <p className="mb-2 font-light text-[Brown]">
                                        {error?.message}
                                    </p>
                                </>
                            )}
                        />
                    </div>
                    <div className="col-span-1 flex flex-col">
                        <Label
                            className="text-sm font-bold text-red-700"
                            htmlFor="max_redeem"
                        >
                            Max Redeem
                        </Label>
                        <Controller
                            name="max_redeem"
                            control={control}
                            render={({
                                field: { name, onBlur, onChange, ref },
                                fieldState: { error },
                            }) => (
                                <>
                                    <Input
                                        id={name}
                                        name={name}
                                        ref={ref}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        className="mt-2 flex h-10 w-full rounded-md"
                                    ></Input>
                                    <p className="mb-2 font-light text-[Brown]">
                                        {error?.message}
                                    </p>
                                </>
                            )}
                        />
                    </div>
                </div>
                <div className="w-full text-end">
                    <Button
                        className="h-12 bg-red-700 px-12 py-2 hover:bg-red-700"
                        type="submit"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddVoucher;
