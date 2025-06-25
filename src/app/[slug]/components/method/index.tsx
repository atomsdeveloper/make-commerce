"use client";

// Database
import { Method as MethodOption } from "@prisma/client";

// Next
import Image from "next/image";
import Link from "next/link";

import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useMethod } from "../../context/MethodContext";

interface MethodProps {
  slug: string;
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  option: MethodOption;
}

const Method = ({
  slug,
  imageAlt,
  imageUrl,
  buttonText,
  option,
}: MethodProps) => {
  const { setMethod } = useMethod();

  const handleSaveMethod = () => {
    setMethod(option);
    console.log(option);
  };

  return (
    <Card className="py-0">
      <CardContent className="flex flex-col items-center gap-8 py-8">
        <div className="relative h-[80px] w-[80px]">
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        <Button
          variant="secondary"
          className="rounded-full"
          asChild
          onClick={handleSaveMethod}
        >
          <Link href={`${slug}/menu?method=${option}`}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
export default Method;
