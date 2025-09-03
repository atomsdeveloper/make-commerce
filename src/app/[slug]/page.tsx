// Next
import Image from "next/image";
import { notFound } from "next/navigation";

// Data
import { getStoreBySlug } from "../../data/get-store";

// Components
import Method from "./components/method";

interface StorePageProps {
  params: Promise<{
    slug: string;
  }>;
}

const StorePage = async ({ params }: StorePageProps) => {
  const { slug } = await params;
  const store = await getStoreBySlug(slug);

  if (!store) {
    notFound();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center p-6 pt-24">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={store?.avatarImageUrl}
          alt={store?.name}
          width={82}
          height={82}
        />
        <h2 className="font-semibold">{store.name}</h2>
      </div>
      <div className="space-y-2 pt-16 text-center">
        <h3 className="text-2xl font-semibold">Seja Bem-Vindo!</h3>
        <p className="opacity-55">
          Escolha como prefere receber seu produto. Estamos aqui para oferecer
          praticidade e qualidade em cada detalhe.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-14">
        <Method
          slug={slug}
          option="PICKUP"
          buttonText="Para retirar"
          imageAlt="Para Retirar no Local"
          imageUrl="/take_away.png"
        />
        <Method
          slug={slug}
          option="MOTORBIKE"
          buttonText="Para entregar"
          imageAlt="Para Entregar"
          imageUrl="/take_away.png"
        />
      </div>
    </div>
  );
};

export default StorePage;
