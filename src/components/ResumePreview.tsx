"use client";
import { usePersonalInfo } from '@/lib/context/PersonalDataContext';

const ResumePreview = () => {
  const { personalInfo } = usePersonalInfo(); // Destructure PersonalInfo from the custom hook
  const { name, email, phone } = personalInfo; // Destructure individual fields

  return (
    <section className="resume-preview w-[50%] h-[90vh] border-2">
      <div>
        <h2>Name: {name}</h2>
        <h2>Email: {email}</h2>
        <h2>Phone: {phone}</h2>
      </div>
    </section>
  );
};

export default ResumePreview;
