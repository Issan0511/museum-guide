import { CraftItem } from "@/types/types";

export const SEED: CraftItem[] = [
  {
    id: 1,
    slug: "nishijin",
    name: {
      ja: "西陣織",
      en: "Nishijin Weaving",
      zh: "西阵织物",
      fr: "Tissage Nishijin",
      ko: "니시진 직물",
      es: "Tejido Nishijin"
    },
    kana: "にしじんおり",
    summary: {
      ja: "絹糸で織り上げられた京都・西陣発祥の高級織物です。",
      en: "Luxury silk textiles from Kyoto's Nishijin district.",
      zh: "源自京都西阵地区的高级丝绸织物。",
      fr: "Textiles de soie de luxe du quartier Nishijin de Kyoto.",
      ko: "교토 니시진 지역에서 전해 내려오는 고급 비단 직물입니다.",
      es: "Textiles de seda de lujo del barrio Nishijin de Kioto."
    },
    description: {
      ja: "西陣織は先染めした糸を用いて複雑な文様を織り出すのが特徴で...",
      en: "Nishijin weaving is characterized by intricate patterns using pre-dyed threads...",
      zh: "西阵织物的特点是使用预染线创造复杂的图案...",
      fr: "Le tissage Nishijin se caractérise par des motifs complexes réalisés avec des fils teints à l'avance...",
      ko: "니시진 직물은 선염된 실을 사용해 정교한 무늬를 만드는 것이 특징입니다...",
      es: "El tejido Nishijin se caracteriza por patrones intrincados usando hilos teñidos previamente..."
    },
    youtubeId: "Y7_oVhzEpLg",
    shopCollection: "nishijin-ori"
  },
  {
    id: 2,
    slug: "kanoko",
    name: {
      ja: "京鹿の子絞",
      en: "Kyoto Kanoko Shibori",
      zh: "京鹿子绞染",
      fr: "Shibori Kanoko de Kyoto",
      ko: "교토 가노코 시보리",
      es: "Shibori Kanoko de Kioto"
    },
    kana: "きょうかのこしぼり",
    summary: {
      ja: "布地を絞って防染することで文様を生み出す伝統技法。",
      en: "Traditional tie-dye technique using resist dyeing.",
      zh: "通过捆扎防染形成图案的传统染色技法。",
      fr: "Technique traditionnelle de teinture par réserve pour créer des motifs.",
      ko: "방염으로 무늬를 만드는 전통적인 손염색 기법입니다.",
      es: "Técnica tradicional de teñido por reserva que crea patrones."
    },
    description: {
      ja: "京鹿の子絞は細かい絞り模様が特徴で、さまざまな絞り方によって複雑な柄を生み出す...",
      en: "This technique creates complex patterns by binding sections of fabric...",
      zh: "通过不同的捆扎方式创造复杂的图案...",
      fr: "Cette méthode crée des motifs complexes en liant le tissu avant la teinture...",
      ko: "천을 묶고 조여서 염색해 복잡한 무늬를 만드는 방식입니다...",
      es: "Esta técnica genera patrones complejos al atar y bloquear partes de la tela antes de teñirla..."
    },
    youtubeId: "FAyPDLVqZ7M"
  },
  {
    id: 3,
    slug: "yuzen",
    name: {
      ja: "京友禅",
      en: "Kyoto Yuzen Dyeing",
      zh: "京友禅染",
      fr: "Teinture Yuzen de Kyoto",
      ko: "교토 유젠 염색",
      es: "Teñido Yuzen de Kioto"
    },
    kana: "きょうゆうぜん",
    summary: {
      ja: "手描きで鮮やかな文様を施す伝統的な染色技法。",
      en: "Hand-painted dyeing technique with vivid patterns.",
      zh: "以手绘华丽图案为特色的染色技法。",
      fr: "Technique de teinture peinte à la main aux motifs vifs.",
      ko: "선명한 무늬를 손으로 그려 넣는 전통 염색 기법입니다.",
      es: "Técnica de teñido a mano con patrones vivos y detallados."
    },
    description: {
      ja: "京友禅は江戸時代に確立され、華やかな彩色画を施すことで知られています...",
      en: "Kyoto Yuzen was established in the Edo period...",
      zh: "京友禅起源于江户时代，以丰富的彩绘著称...",
      fr: "La teinture Yuzen, née à l'époque d'Edo, est réputée pour ses dessins peints riches en couleurs...",
      ko: "에도 시대에 정착했으며, 화려한 색채의 그림을 그려 넣는 것으로 알려져 있습니다...",
      es: "El Yuzen de Kioto surgió en el período Edo y es conocido por sus diseños pintados con colores ricos..."
    },
    youtubeId: "K20BwqIHAdE",
    shopCollection: "fabric-dyeing"
  },
  {
    id: 31,
    slug: "zoen",
    name: {
      ja: "造園",
      en: "Japanese Garden Design",
      zh: "造园",
      fr: "Art du jardin japonais",
      ko: "일본 정원 설계",
      es: "Diseño de jardines japoneses"
    },
    kana: "ぞうえん",
    summary: {
      ja: "自然との調和を大切にした庭園設計の芸術。",
      en: "The art of designing gardens in harmony with nature.",
      zh: "注重与自然和谐共生的庭园设计艺术。",
      fr: "L'art de créer des jardins en harmonie avec la nature.",
      ko: "자연과 조화를 이루는 정원을 설계하는 예술입니다.",
      es: "El arte de diseñar jardines en armonía con la naturaleza."
    },
    description: {
      ja: "日本庭園は枯山水や池泉庭園など多様な形式を持ち、自然美を象徴的に表現します...",
      en: "Japanese gardens include various styles such as dry landscapes...",
      zh: "日本庭园包括枯山水、池泉庭园等多种形式...",
      fr: "Les jardins japonais incluent des styles variés comme le karesansui et les jardins de bassin...",
      ko: "가레산스이, 지천식 등 다양한 양식을 포함합니다...",
      es: "Los jardines japoneses abarcan estilos como los paisajes secos y los jardines con estanques..."
    }
  },
  {
    id: 32,
    slug: "bamboo",
    name: {
      ja: "京竹工芸",
      en: "Kyoto Bamboo Craft",
      zh: "京都竹工艺",
      fr: "Artisanat du bambou de Kyoto",
      ko: "교토 대나무 공예",
      es: "Artesanía de bambú de Kioto"
    },
    kana: "きょうちくこうげい",
    summary: {
      ja: "竹を編んで作られる京都の伝統的な工芸品。",
      en: "Traditional bamboo crafts from Kyoto.",
      zh: "京都的传统竹工艺品。",
      fr: "Arts du bambou traditionnels de Kyoto.",
      ko: "교토의 전통 대나무 공예품입니다.",
      es: "Artesanías tradicionales de bambú de Kioto."
    },
    description: {
      ja: "京竹工芸は茶道具や花籠などに用いられ、しなやかで丈夫な作りが特徴です...",
      en: "Used for tea utensils, flower baskets, and more...",
      zh: "广泛用于茶具、花器等...",
      fr: "Utilisé pour les ustensiles de thé, paniers à fleurs et bien plus...",
      ko: "다도 도구나 꽃바구니 등 다양한 용도로 쓰입니다...",
      es: "Se utiliza en utensilios de té, cestas florales y más..."
    },
    youtubeId: "GH6relToNIw",
    shopCollection: "bamboo-crafts",
    details: { path: "craft_texts/bamboo.md", format: "md" }
  }
];
