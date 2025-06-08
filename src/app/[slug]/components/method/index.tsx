// Database
import { Method as MethodOption } from "@prisma/client";

// Next
// import Image from "next/image";
import Link from "next/link";

import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

interface MethodProps {
  slug: string;
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  option: MethodOption;
}

const Method = ({
  slug,
  // imageAlt,
  // imageUrl,
  buttonText,
  option,
}: MethodProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-8 py-8">
        <div className="relative h-[80px] w-[80px]">
          {/* <Image
            src={imageUrl}
            alt={imageAlt}
            // width={78}
            // height={80}
            fill
            className="object-contain"
          /> */}
        </div>
        <Button variant="secondary" className="rounded-full" asChild>
          <Link href={`${slug}/menu?method=${option}`}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
export default Method;
