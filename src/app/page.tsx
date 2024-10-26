import Navbar from "@/components/Navbar";
import ResumeForm from "../components/ResumeForm"
import ResumePreview from "../components/ResumePreview";
export default function Home() {

  return (
    <div>
      <Navbar />
      <div className="flex flex-row justify-around">
        <ResumeForm />
        <ResumePreview />
      </div>
    </div>
  );
}
