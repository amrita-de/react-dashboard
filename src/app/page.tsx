import FileUploader from "@/components/FileUploader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        CSV Runner Dashboard
      </h1>
      <FileUploader />
    </main>
  );
}
