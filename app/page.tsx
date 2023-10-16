import Background from "@/components/Form/Background";
import Form from "@/components/Form/Form";

export default async function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Background />
      <Form />
    </div>
  );
}
