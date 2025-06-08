/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

const main = async () => {
  await prismaClient.$transaction(async (tx: any) => {
    await tx.store.deleteMany();
    const store = await tx.store.create({
      data: {
        name: "Ravie",
        slug: "revie",
        description:
          "Elegância na essência. Ravie é sobre sentir-se bem, do seu jeito.",
        avatarImageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQvcNP9rHlEJu1vCY5kLqzjf29HKaeN78Z6pRy",
        coverImageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQU3JZGQeTmvPeJLoyOjzNsMqFdxUI423nBl6b",
      },
    });
    const blushCategory = await tx.category.create({
      data: {
        name: "Blush",
        storeId: store.id,
      },
    });
    await tx.products.createMany({
      data: [
        {
          name: "Blush Compacto Rosé Matte",
          description:
            "Blush com acabamento matte aveludado. Ideal para realçar maçãs do rosto com um tom suave e natural.",
          price: 29.9,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/rose-matte-img",
          categoryId: blushCategory.id,
          storeId: store.id,
          ingredients: [
            "Mica",
            "Talco",
            "Dióxido de Titânio",
            "Óleo de jojoba",
            "Vitamina E",
          ],
        },
        {
          name: "Blush Cremoso Coral Glow",
          description:
            "Textura cremosa com acabamento luminoso. Pode ser usado como blush e batom. Ideal para peles claras e médias.",
          price: 35.5,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/coral-glow-img",
          categoryId: blushCategory.id,
          storeId: store.id,
          ingredients: [
            "Cera de abelha",
            "Óleo de coco",
            "Pigmentos naturais",
            "Vitamina C",
          ],
        },
        {
          name: "Paleta de Blush 3 Cores",
          description:
            "Versátil paleta com três tons que se adaptam a diversos tons de pele. Acabamento acetinado.",
          price: 49.9,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/paleta-3cores-img",
          categoryId: blushCategory.id,
          storeId: store.id,
          ingredients: [
            "Silicone",
            "Talco micronizado",
            "Manteiga de karité",
            "Vitamina B5",
          ],
        },
        {
          name: "Blush Líquido Pink Tint",
          description:
            "Blush líquido com alta pigmentação e longa duração. Efeito natural e fácil de aplicar com pincel ou dedos.",
          price: 32.0,
          imageUrl: "https://u9a6wmr3as.ufs.sh/f/pink-tint-img",
          categoryId: blushCategory.id,
          storeId: store.id,
          ingredients: [
            "Água",
            "Glicerina vegetal",
            "Extrato de hibisco",
            "Corante alimentício",
          ],
        },
      ],
    });
    const pencilCategory = await tx.category.create({
      data: {
        name: "Lápis de Olho",
        storeId: store.id,
      },
    });
    await tx.products.createMany({
      data: [
        {
          name: "Lápis de Olho Preto Intenso",
          description:
            "Textura macia e alta pigmentação para um olhar marcante e duradouro. Ideal para delineados precisos ou esfumados.",
          ingredients: [
            "Cera de abelha",
            "Pigmento preto carbono",
            "Óleo de rícino",
            "Vitamina E",
            "Cera de carnaúba",
            "Parafina",
            "Conservantes dermatologicamente testados",
          ],
          price: 39.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQKfI6fivqActTvBGLXfQe4a8CJ6d3HiR7USPK",
          categoryId: pencilCategory.id,
          storeId: store.id,
        },
        {
          name: "Lápis de Olho Retrátil Marrom",
          description:
            "Acabamento suave e fórmula à prova d’água. Ideal para looks neutros do dia a dia. Não precisa apontar.",
          ingredients: [
            "Pigmento marrom mineral",
            "Ciclometicone",
            "Cera sintética",
            "Silicone volátil",
            "Vitamina E",
            "Antioxidantes",
            "Polímeros fixadores",
            "Conservantes suaves",
          ],
          price: 41.5,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ99rtECuYaDgmA4VujBU0wKn2ThXJvF3LHfyc",
          categoryId: pencilCategory.id,
          storeId: store.id,
        },
        {
          name: "Lápis Kajal Carbon Black",
          description:
            "Fórmula ultra pigmentada com toque macio e ideal para criar olhos esfumados com facilidade. Indicado para a linha d’água.",
          ingredients: [
            "Pigmento preto intenso",
            "Óleo de jojoba",
            "Cera de candelila",
            "Cera de abelha",
            "Manteiga de karité",
            "Vitamina E",
            "Agentes emolientes",
            "Livre de parabenos",
          ],
          price: 39.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQUY0VlDTmvPeJLoyOjzNsMqFdxUI423nBl6br",
          categoryId: pencilCategory.id,
          storeId: store.id,
        },
        {
          name: "Lápis de Olho Azul Metálico",
          description:
            "Cor vibrante com partículas peroladas para um efeito moderno e ousado. Pode ser usado como delineador ou sombra.",
          ingredients: [
            "Pigmento azul perolado",
            "Mica",
            "Cera sintética",
            "Glicerina",
            "Óleo mineral",
            "Vitamina E",
            "Silicone para fixação",
          ],
          price: 36.2,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQBBmifbjzEVXRoycAtrP9vH45bZ6WDl3QF0a1",
          categoryId: pencilCategory.id,
          storeId: store.id,
        },
      ],
    });
    const baseCategory = await tx.category.create({
      data: {
        name: "Base",
        storeId: store.id,
      },
    });
    await tx.products.createMany({
      data: [
        {
          name: "Base Líquida Matte",
          description:
            "Textura leve e cobertura média. Controla a oleosidade ao longo do dia, ideal para peles mistas a oleosas.",
          ingredients: [
            "Água",
            "Sílica",
            "Dimeticona",
            "Pigmentos minerais",
            "Ácido hialurônico",
          ],
          price: 49.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQNd3jSNrcJroaszwjUAlM6iSO5ZTx2HV70t31",
          categoryId: baseCategory.id,
          storeId: store.id,
        },
        {
          name: "Base Hidratante Glow",
          description:
            "Base com acabamento luminoso e fórmula hidratante. Ideal para peles secas ou opacas.",
          ingredients: [
            "Água de coco",
            "Glicerina",
            "Vitamina E",
            "Pigmentos perolados",
            "Niacinamida",
          ],
          price: 54.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7Y6lv9tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1",
          categoryId: baseCategory.id,
          storeId: store.id,
        },
        {
          name: "Base de Alta Cobertura",
          description:
            "Ideal para quem busca uma cobertura completa com longa duração. Resistente ao suor e umidade.",
          ingredients: [
            "Polímeros resistentes à água",
            "Pigmentos concentrados",
            "Cera sintética",
            "Ácido salicílico",
          ],
          price: 59.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ5toOZxYa1oARJCUGh4EY3x8NjXHtvZ7lnVfw",
          categoryId: baseCategory.id,
          storeId: store.id,
        },
      ],
    });
    const brushCategory = await tx.category.create({
      data: {
        name: "Pincel",
        storeId: store.id,
      },
    });
    await tx.products.createMany({
      data: [
        {
          name: "Pincel Kabuki Flat",
          description:
            "Ideal para aplicação de base líquida ou cremosa, proporciona acabamento uniforme e cobertura intensa.  ",
          ingredients: [],
          price: 29.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQJS1b33q29eEsh0CVmOywrqx1UPnJpRGcHN5v",
          categoryId: brushCategory.id,
          storeId: store.id,
        },
        {
          name: "Pincel Duo Fiber",
          description:
            "Perfeito para acabamento natural e esfumado. Mistura produtos líquidos, cremosos e em pó com leveza.",
          ingredients: [],
          price: 34.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQW7Kxm9gniS9XCLQu7Nb4jvBYZze16goaOqsK",
          categoryId: brushCategory.id,
          storeId: store.id,
        },
        {
          name: "Pincel Chanfrado para Blush",
          description:
            "Design angular que facilita a aplicação precisa de blush ou contorno nas maçãs do rosto.",
          ingredients: [],
          price: 24.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7i05S5tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1",
          categoryId: brushCategory.id,
          storeId: store.id,
        },
      ],
    });
    const lipstickCategory = await tx.category.create({
      data: {
        name: "Batom",
        storeId: store.id,
      },
    });
    await tx.products.createMany({
      data: [
        {
          name: "Batom Vermelho Clássico",
          description:
            "Batom de alta pigmentação, acabamento matte e longa duração para um look marcante.",
          ingredients: [],
          price: 29.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQtfuQrAKkI75oJfPT0crZxvX82ui9qV3hLFdY",
          categoryId: lipstickCategory.id,
          storeId: store.id,
        },
        {
          name: "Batom Nude Cremoso",
          description:
            "Fórmula hidratante com acabamento cremoso para um visual natural e sofisticado.",
          ingredients: [],
          price: 27.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQBH21ijzEVXRoycAtrP9vH45bZ6WDl3QF0a1M",
          categoryId: lipstickCategory.id,
          storeId: store.id,
        },
        {
          name: "Batom Rosa Pink Vibrante",
          description:
            "Cor intensa e vibrante que destaca qualquer make com toque moderno e elegante.",
          ingredients: [],
          price: 28.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ4rBrtULypXmR6JiWuhzS8ALjVkrF3yfatC7E",
          categoryId: lipstickCategory.id,
          storeId: store.id,
        },
      ],
    });
  });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
