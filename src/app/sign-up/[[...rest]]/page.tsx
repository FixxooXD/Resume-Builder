"use client";
import { useSignUp, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { zodSignUpSchema } from "@/app/schemas/zodSignupSchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import Navbar from "@/components/Navbar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import EmailVerification from "@/components/EmailVerification";
import { useClerk } from '@clerk/nextjs'

export default function SignUpPage() {
  const [attemptVerification, setAttemptVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const { isLoaded, signUp } = useSignUp();

  // TypeScript types from the Zod schema
  type SignUpFormSchemaType = z.infer<typeof zodSignUpSchema>;

  const { signOut } = useClerk()
  const { user, isSignedIn } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(zodSignUpSchema),
  });

  const onSubmit = async (data: SignUpFormSchemaType) => {
    if (!isLoaded) return;
    console.log(data);
    console.log(user)
    console.log(isSignedIn);


    try {
      const user = await signUp?.create({
        emailAddress: data.email, // Adjust with Zod schema fields
        password: data.password,
      });
      console.log(user);
      setAttemptVerification(true);

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      setError(error.errors[0].message);
    }
  };

  const oneClickVerification = async () => {
    try {
      const verificationProcess = await signUp?.attemptEmailAddressVerification({
        code: verificationCode,
      });
      signUp?.createdSessionId
      setAttemptVerification(!attemptVerification);
      console.log(verificationProcess);
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      setError(error.errors[0].message);
    }
  };

  useEffect(() => {
    oneClickVerification();
  },[verificationCode])

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        {!attemptVerification ? (
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Create your account</CardTitle>
              <CardDescription>
                Welcome to Resumify! Please fill in the details to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...register("email")}
                      placeholder="Enter your email"
                      type="email"
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      {...register("password")}
                      placeholder="Enter your password"
                      type="password"
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                  </div>
                </div>
                <Button type="submit" className="w-[100%] bg-gray-600 text-white rounded-lg">
                  Get Started
                </Button>
              </form>
            </CardContent>
          </Card>) :
          (
            <EmailVerification setVerificationCode={setVerificationCode} />
          )}
      </div>
      <Button onClick={() => signOut({ redirectUrl: '/sign-up' })}>SignOut</Button>
    </>
  );
}
