"use client";

// Database
import { Store } from "@prisma/client";

// Icons
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";

// Next
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

// Components
import { Button } from "../../../../../components/ui/button";

interface StoreHeaderProps {
  store: Pick<Store, "name" | "coverImageUrl">;
}

const StoreHeader = ({ store }: StoreHeaderProps) => {
  const router = useRouter();
  const params = useParams();

  const slug = params.slug as string;

  const handleBackClick = () => router.back();

  const handleOrdersClick = () => router.push(`/${slug}/orders`);

  return (
    <div className="relative h-[250px] w-full">
      <Button
        onClick={handleBackClick}
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full"
      >
        <ChevronLeftIcon />
      </Button>
      <Image
        src={store?.coverImageUrl}
        alt={store?.name}
        fill={true}
        className="object-contain"
      />
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full"
        onClick={handleOrdersClick}
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};
export default StoreHeader;
