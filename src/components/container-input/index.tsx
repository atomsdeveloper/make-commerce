export default function ContainerInput({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 [&>input::placeholder]:text-sm [&>input::placeholder]:italic [&>label]:text-xs ">
      {children}
    </div>
  );
}
