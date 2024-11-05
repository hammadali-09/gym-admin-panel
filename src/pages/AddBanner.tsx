import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePlusIcon } from 'lucide-react';
import { useEffect, useRef, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addBanners } from '@/bannerSlice';


const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    banner_link: z.string(),
    short_description: z.string(),
    detail_description: z.string(),
    image_url: z.instanceof(File).optional(),
});

type formValues = z.infer<typeof formSchema>;




const AddBanner = () => {

  const dispatch = useDispatch();
  const {
      control,
      handleSubmit,
      watch,
      formState: { errors },
  } = useForm<formValues>({
      resolver: zodResolver(formSchema),
  });

  useEffect(() => {
      console.log('errors', errors);
  }, [errors]);

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageFile = watch('image_url');

  const convertToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
      });
  };

  const onFormSubmit = async (data: formValues) => {

    let base64String = '';

    if (data.image_url) {
        base64String = await convertToBase64(data.image_url);
    }
    const bannerData = { ...data, image_url: base64String };

    try {
        const response = await fetch('http://localhost:4200/api/banners', {
            method: 'post',
            body: JSON.stringify(bannerData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        if (result.statusCode === 201) {
            dispatch(addBanners(result.data));
            navigate('/home/banners');
        }
    } catch (error) {
        console.error('Error adding client to server:', error);
    }

  };

  const selectedImage = useMemo(() => {
      if (imageFile) {
          return URL.createObjectURL(imageFile);
      }
      return null;
  }, [imageFile]);

  const handleButtonClick = () => {
      fileInputRef.current?.click();
  };


    return (
        <div className="min-h-[800px] w-full p-5">
            <form
                onSubmit={handleSubmit(onFormSubmit)}
                className="flex flex-col gap-y-6"
            >
                <div className="flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="image"
                    >
                        Picture
                    </Label>
                    <Controller
                        name="image_url"
                        control={control}
                        render={({ field: { name, onChange } }) => (
                            <>
                                <Input
                                    id={name}
                                    name={name}
                                    type="file"
                                    ref={fileInputRef}
                                    hidden
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(event) => {
                                        const [file] = event.target.files ?? [
                                            null,
                                        ];
                                        console.log('file', file);
                                        onChange(file);
                                    }}
                                ></Input>
                            </>
                        )}
                    />
                    <button
                        onClick={handleButtonClick}
                        className="mt-2 aspect-[2/1] w-72 rounded-xl max-[480px]:w-full"
                        type="button"
                    >
                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt="Selected Preview"
                                className="aspect-[2/1] w-72 rounded-xl max-[480px]:w-full"
                            />
                        ) : (
                            <div className="flex aspect-[2/1] w-72 items-center justify-center rounded-xl bg-white text-6xl max-[480px]:w-full">
                                <ImagePlusIcon className="h-12 w-12 text-red-700" />
                            </div>
                        )}
                    </button>
                </div>
                <div className="flex flex-col">
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
                <div className="flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="banner_link"
                    >
                        Attach Banner Link
                    </Label>
                    <Controller
                        name="banner_link"
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
                <div className="flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="short_description"
                    >
                        Short Description
                    </Label>
                    <Controller
                        name="short_description"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
                            fieldState: { error },
                        }) => (
                            <>
                                <Textarea
                                    id={name}
                                    name={name}
                                    ref={ref}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    className="focus-visible::ring-2 mt-2 flex min-h-[80px] w-full rounded-md focus-visible:outline-blue-300 focus-visible:ring-blue-300"
                                ></Textarea>
                                <p className="mb-2 font-light text-[Brown]">
                                    {error?.message}
                                </p>
                            </>
                        )}
                    />
                </div>
                <div className="flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="detail_description"
                    >
                        Detail Description
                    </Label>
                    <Controller
                        name="detail_description"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
                            fieldState: { error },
                        }) => (
                            <>
                                <Textarea
                                    id={name}
                                    name={name}
                                    ref={ref}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    className="focus-visible::ring-2 mt-2 flex min-h-[80px] w-full rounded-md focus-visible:outline-blue-300 focus-visible:ring-blue-300"
                                ></Textarea>
                                <p className="mb-2 font-light text-[Brown]">
                                    {error?.message}
                                </p>
                            </>
                        )}
                    />
                </div>
                <Button
                    className="h-12 w-1/4 bg-red-700 hover:bg-red-700"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default AddBanner;
