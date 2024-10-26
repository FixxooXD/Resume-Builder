"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verificationCodeSchema } from "@/app/schemas/zodVerifiactionCodeSchema";

interface EmailVerificationProps {
  setVerificationCode: (e: string) => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ setVerificationCode }) => {
  const form = useForm<z.infer<typeof verificationCodeSchema>>({
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = (values: z.infer<typeof verificationCodeSchema>) => {
    setVerificationCode(values.pin);
  };

  return (
   <div className="border w-[50%] h-screen flex justify-center items-center">
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 border">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP className="caret-black" maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot className="bg-red-800 caret-black" index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  </div> 
  );
};

export default EmailVerification;
