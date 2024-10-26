"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resumeSchema } from '@/app/schemas/zodResumeFormSchema';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePersonalInfo } from '@/lib/context/PersonalDataContext';
import { useEffect } from 'react';
// TypeScript types from the Zod schema
 type ResumeFormValuesTypes = z.infer<typeof resumeSchema>;

const ResumeForm = () => {
  // Initialize React Hook Form with Zod resolver
  const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm<ResumeFormValuesTypes>({
    resolver: zodResolver(resumeSchema),
  });
  
  // Function to filter out special characters
  const filterSpecialChars = (value: string) => {
    return value.replace(/[^a-zA-Z\s]/g, ''); // Only allows letters and spaces    
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = filterSpecialChars(e.target.value);
    setValue('name', filteredValue); // Update the form value with filtered input
  };
  
 // Destructure setPersonalInfo from the custom hook
 const { setPersonalInfo } = usePersonalInfo(); // Fallback to an empty object if undefined

  // Handle form submission
  const onSubmit = (data: ResumeFormValuesTypes) => {
       console.log(data);
       if (setPersonalInfo) {
        console.log(setPersonalInfo(data));
       }
  };

// Watch all fields
const watchedValues = watch(["name", "email", "phone"]);

// Update context on change
 useEffect(() => 
  {
    setPersonalInfo({
      name: watchedValues[0],
      email: watchedValues[1],
      phone: watchedValues[2],
    });
 }, watchedValues)
 
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[40%]">
      <div>
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          placeholder="Your name"
          {...register('name')}
          onChange={handleNameChange} // Attach custom onChange handler
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          placeholder="Your email"
          {...register('email')} // Update context on change
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <Input
          id="phone"
          type="tel"
          placeholder="Your phone number"
          {...register('phone')} //// Update context on change
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>

      <Button type="submit" variant="default">Submit</Button>
    </form>
  );
};

export default ResumeForm;
