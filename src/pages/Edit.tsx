import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePlusIcon } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Client, updateClients } from '@/switchSlice';
import { useEffect } from 'react';



const frameworks = [
    {
        value: 'Ashar Ali',
        label: 'Ashar Ali',
    },
    {
        value: 'Muhammad Danish',
        label: 'Muhammad Danish',
    },
    {
        value: 'Salman Ali',
        label: 'Salman Ali',
    },
    {
        value: 'Umer Sheikh',
        label: 'Umer Sheikh',
    },
    {
        value: 'Roohan Khawaja',
        label: 'Roohan Khawaja',
    },
    {
        value: 'No Trainer',
        label: 'No Trainer',
    },
];

const formSchema = z.object({
    member_id: z.string(),
    name: z.string().min(1, 'Name is required'),
    cnic: z.string().min(1, 'CNIC is required'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('This email is not valid'),
    phone: z.string().min(1, 'Phone is required'),
    height: z.string(),
    weight: z.string(),
    goals: z.string(),
    exercise: z.string(),
    medicalIssue: z.string(),
    registration_date: z.date(),
    trainer: z.string(),
    enrollment_number: z.string().min(1, 'Enrollment number is required'),
});

type formValues = z.infer<typeof formSchema>;

const Edit = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const dispatch = useAppDispatch();
    const { control, handleSubmit, reset } = useForm<formValues>({
        resolver: zodResolver(formSchema),
    });

    const navigate = useNavigate();

    const token = useSelector((state: RootState) => state.auth.token);
    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:4200/api/clients`,
                    {
                        headers: {
                            Authorization: token ? `Bearer ${token}` : '',
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.ok) {
                    const clientData = await response.json();

                    reset(clientData);
                } else {
                    console.error('Error fetching client data');
                }
            } catch (error) {
                console.error('Error fetching client:', error);
            }
        };

        fetchClientData();
    }, [reset, token]);

    const onFormSubmit = async (data: formValues) => {
        try {
            const response = await fetch(`http://localhost:4200/api/clients`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token ? `Bearer ${token}` : '',
                },
                body: JSON.stringify(data),
            });

            const result = (await response.json()) as {
                message: string;
                data: Client;
            };

            console.log('Server Response:', result);

            if (response.status === 200) {
                dispatch(updateClients(result.data));
                navigate('/home/client');
            } else {
                console.error('Failed to update client:', result.message);
            }
        } catch (error) {
            console.error('Error updating client:', error);
        }
    };
    return (
        <div className="min-h-[800px] w-full p-5">
            <form
                onSubmit={handleSubmit(onFormSubmit)}
                className="grid grid-cols-12 gap-x-3 gap-y-6"
            >
                <div className="col-span-12 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="image"
                    >
                        Picture
                    </Label>
                    <Input
                        id="image"
                        name="image"
                        hidden
                        className="hidden"
                        type="file"
                        accept="image/*"
                    />
                    <button
                        className="aspect-[2/1] w-72 rounded-xl max-[480px]:w-full"
                        type="button"
                    >
                        <div className="mt-2 flex aspect-[2/1] w-72 items-center justify-center rounded-xl bg-white text-6xl text-gray-400 max-[480px]:w-full">
                            <ImagePlusIcon className="h-12 w-12 text-red-700" />
                        </div>
                    </button>
                </div>
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="memberId"
                    >
                        Member ID
                    </Label>
                    <Controller
                        name="member_id"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
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
                            </>
                        )}
                    />
                </div>
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="name"
                    >
                        Name
                    </Label>
                    <Controller
                        name="name"
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
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="cnic"
                    >
                        CNIC
                    </Label>
                    <Controller
                        name="cnic"
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
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="email"
                    >
                        E-mail
                    </Label>
                    <Controller
                        name="email"
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
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="phone"
                    >
                        Phone
                    </Label>
                    <Controller
                        name="phone"
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
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="registrationDateTag"
                    >
                        Registration Date
                    </Label>
                    <Controller
                        name="registration_date"
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
                                            field.onChange(selectedDate || null)
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                    />
                </div>
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="enrollmentNumber"
                    >
                        Enrollment Number
                    </Label>
                    <Controller
                        name="enrollment_number"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
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
                            </>
                        )}
                    />
                </div>
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="height"
                    >
                        <div className="flex items-center">
                            <div className="mr-1">Height</div>
                            <div className="text-xs font-semibold text-red-300">
                                (in cm)
                            </div>
                        </div>
                    </Label>
                    <Controller
                        name="height"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
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
                            </>
                        )}
                    />
                </div>
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="weight"
                    >
                        <div className="flex items-center">
                            <div className="mr-1">Weight</div>
                            <div className="text-xs font-semibold text-red-300">
                                (in Kg)
                            </div>
                        </div>
                    </Label>
                    <Controller
                        name="weight"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
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
                            </>
                        )}
                    />
                </div>
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="goals"
                    >
                        Goals
                    </Label>
                    <Controller
                        name="goals"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
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
                            </>
                        )}
                    />
                </div>
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="exercise"
                    >
                        Exercise
                    </Label>
                    <Controller
                        name="exercise"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
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
                            </>
                        )}
                    />
                </div>
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="medicalIssue"
                    >
                        Medical Issue
                    </Label>
                    <Controller
                        name="medicalIssue"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
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
                            </>
                        )}
                    />
                </div>
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="StaffId"
                    >
                        Trainer
                    </Label>
                    <div className="mt-2 rounded-md bg-white">
                        <Controller
                            name="trainer"
                            control={control}
                            defaultValue="" // Set default to an empty string or a default value
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
                                                : 'No Trainer...'}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-red-700 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto bg-red-50 p-0">
                                        <div>
                                            <ul>
                                                {frameworks.map((framework) => (
                                                    <li
                                                        key={framework.value}
                                                        onClick={() => {
                                                            field.onChange(
                                                                framework.value
                                                            );
                                                            setValue(
                                                                framework.label
                                                            ); // Set selected value
                                                            setOpen(false); // Close popover
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
                                                        {framework.label}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                    </div>
                </div>

                <div className="col-span-12 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="notes"
                    >
                        Notes
                    </Label>
                    <Textarea
                        className="focus-visible::ring-2 mt-2 flex min-h-[80px] w-full rounded-md focus-visible:outline-blue-300 focus-visible:ring-blue-300"
                        id="NoteTag"
                        name="NoteTag"
                        placeholder="Write Notes Here..."
                    ></Textarea>
                </div>
                <div className="col-span-3 flex">
                    <Button
                        className="h-12 w-full bg-red-700 hover:bg-red-700"
                        type="submit"
                    >
                        Save & Continue
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
