import type { UserLanguage } from "@/types/types";

export type SectionTranslations = {
  home: {
    backToLanguageSelection: string;
    todaysDemoTitle: string;
    loading: string;
    viewDetails: string;
    noDemo: string;
    eventsTitle: string;
    noEvents: string;
    termsOfUse: string;
    privacyPolicy: string;
  };
  demoModal: {
    title: string;
    empty: string;
  };
  eventModal: {
    periodHeading: string;
  };
  craftGrid: {
    heading: string;
    categoryLabels: Record<string, string>;
  };
  craftPage: {
    backToList: string;
    videoSectionTitle: string;
    shopSectionTitle: string;
    shopPrimaryDescription: string;
    shopTapHint: string;
    shopOtherDescription: string;
    shopPrimaryAria: string;
    shopOtherAria: string;
  };
  langPage: {
    ageHeading: string;
    ageSubheading: string;
    agePlaceholder: string;
    languageHeading: string;
    languageSubheading: string;
    saving: string;
    ageLabels: Record<string, string>;
  };
  chatbot: {
    title: string;
    intro: string[];
    craftIntro: string[];
    typing: string;
    inputPlaceholder: string;
    send: string;
    sending: string;
    error: string;
  };
};

const translations: Record<UserLanguage, SectionTranslations> = {
  ja: {
    home: {
      backToLanguageSelection: "← 言語選択へ戻る",
      todaysDemoTitle: "本日の実演",
      loading: "読み込み中...",
      viewDetails: "詳細を見る",
      noDemo: "本日のデモはありません",
      eventsTitle: "本日開催中のイベント",
      noEvents: "本日開催中のイベントはありません",
      termsOfUse: "利用規約",
      privacyPolicy: "プライバシーポリシー"
    },
    demoModal: {
      title: "工芸デモ",
      empty: "準備中です"
    },
    eventModal: {
      periodHeading: "開催期間"
    },
    craftGrid: {
      heading: "工芸一覧",
      categoryLabels: {
        "住": "カテゴリー「住」",
        "礼": "カテゴリー「礼」",
        "食": "カテゴリー「食」",
        "職": "カテゴリー「職」",
        "衣": "カテゴリー「衣」",
        "その他": "カテゴリー「その他」"
      }
    },
    craftPage: {
      backToList: "← 工芸一覧に戻る",
      videoSectionTitle: "動画",
      shopSectionTitle: "ショップ",
      shopPrimaryDescription: "この工芸品はオンラインショップで購入できます",
      shopTapHint: "下のアイコンをタップ",
      shopOtherDescription: "オンラインショップでその他の工芸品を見る",
      shopPrimaryAria: "MOCADショップでこの工芸品を見る",
      shopOtherAria: "MOCADショップで他の工芸品を見る"
    },
    langPage: {
      ageHeading: "年代を選択",
      ageSubheading: "年代を選んでください",
      agePlaceholder: "選択してください",
      languageHeading: "言語を選択",
      languageSubheading: "ご希望の言語を選んでください",
      saving: "設定を保存しています...",
      ageLabels: {
        "9": "0-12歳",
        "16": "12-18歳",
        "20": "18-29歳",
        "30": "30-39歳",
        "40": "40-49歳",
        "50": "50-59歳",
        "60": "60-69歳",
        "70": "70-79歳",
        "80": "80歳以上"
      }
    },
    chatbot: {
      title: "ミュージアムガイドチャット",
      intro: [
        "こんにちは！ミュージアムガイドチャットボットです。",
        "展示や工芸、イベント、施設についてお気軽にお尋ねください。"
      ],
      craftIntro: [
        "こんにちは！{craftName}についての質問にお答えします。",
        "工芸品の詳細や歴史についてお聞きください。"
      ],
      typing: "回答を作成中...",
      inputPlaceholder: "メッセージを入力してください...",
      send: "送信",
      sending: "送信中...",
      error: "エラーが発生しました。もう一度お試しください。"
    }
  },
  en: {
    home: {
      backToLanguageSelection: "← Back to language selection",
      todaysDemoTitle: "Today's demonstration",
      loading: "Loading...",
      viewDetails: "View details",
      noDemo: "No demonstration today",
      eventsTitle: "Events happening today",
      noEvents: "No events are happening today",
      termsOfUse: "Terms of Use",
      privacyPolicy: "Privacy Policy"
    },
    demoModal: {
      title: "Craft demonstration",
      empty: "Coming soon"
    },
    eventModal: {
      periodHeading: "Event dates"
    },
    craftGrid: {
      heading: "Craft list",
      categoryLabels: {
        "住": "Category: Living",
        "礼": "Category: Ceremony",
        "食": "Category: Food",
        "職": "Category: Work",
        "衣": "Category: Clothing",
        "その他": "Category: Other"
      }
    },
    craftPage: {
      backToList: "← Back to craft list",
      videoSectionTitle: "Video",
      shopSectionTitle: "Shop",
      shopPrimaryDescription: "You can purchase this craft in the online shop",
      shopTapHint: "Tap the icon below",
      shopOtherDescription: "Browse other crafts in the online shop",
      shopPrimaryAria: "View this craft in the MOCAD shop",
      shopOtherAria: "View other crafts in the MOCAD shop"
    },
    langPage: {
      ageHeading: "Select age",
      ageSubheading: "Choose your age range",
      agePlaceholder: "Please select",
      languageHeading: "Choose language",
      languageSubheading: "Select your language",
      saving: "Saving your preferences...",
      ageLabels: {
        "9": "Ages 0-12",
        "16": "Ages 12-18",
        "20": "Ages 18-29",
        "30": "Ages 30-39",
        "40": "Ages 40-49",
        "50": "Ages 50-59",
        "60": "Ages 60-69",
        "70": "Ages 70-79",
        "80": "Ages 80+"
      }
    },
    chatbot: {
      title: "Museum guide chat",
      intro: [
        "Hello! I'm the museum guide chatbot.",
        "Feel free to ask about exhibits, crafts, events, or the facility."
      ],
      craftIntro: [
        "Hello! I can answer questions about {craftName}.",
        "Ask me about the craft's details or history."
      ],
      typing: "Composing a reply...",
      inputPlaceholder: "Type your message...",
      send: "Send",
      sending: "Sending...",
      error: "Sorry, something went wrong. Please try again."
    }
  },
  zh: {
    home: {
      backToLanguageSelection: "← 返回语言选择",
      todaysDemoTitle: "今日演示",
      loading: "加载中...",
      viewDetails: "查看详情",
      noDemo: "今日没有演示",
      eventsTitle: "今日正在进行的活动",
      noEvents: "今日没有进行的活动",
      termsOfUse: "使用条款",
      privacyPolicy: "隐私政策"
    },
    demoModal: {
      title: "工艺演示",
      empty: "即将推出"
    },
    eventModal: {
      periodHeading: "活动日期"
    },
    craftGrid: {
      heading: "工艺列表",
      categoryLabels: {
        "住": "类别：居住",
        "礼": "类别：礼仪",
        "食": "类别：饮食",
        "職": "类别：工作",
        "衣": "类别：服饰",
        "その他": "类别：其他"
      }
    },
    craftPage: {
      backToList: "← 返回工艺列表",
      videoSectionTitle: "视频",
      shopSectionTitle: "商店",
      shopPrimaryDescription: "您可以在网店购买此工艺品",
      shopTapHint: "点击下方图标",
      shopOtherDescription: "在网店浏览其他工艺品",
      shopPrimaryAria: "在MOCAD商店查看此工艺品",
      shopOtherAria: "在MOCAD商店查看其他工艺品"
    },
    langPage: {
      ageHeading: "选择年龄",
      ageSubheading: "请选择年龄段",
      agePlaceholder: "请选择",
      languageHeading: "选择语言",
      languageSubheading: "请选择使用语言",
      saving: "正在保存您的设置...",
      ageLabels: {
        "9": "0-12岁",
        "16": "12-18岁",
        "20": "18-29岁",
        "30": "30-39岁",
        "40": "40-49岁",
        "50": "50-59岁",
        "60": "60-69岁",
        "70": "70-79岁",
        "80": "80岁以上"
      }
    },
    chatbot: {
      title: "博物馆导览聊天",
      intro: [
        "你好！我是博物馆导览聊天机器人。",
        "欢迎咨询展览、工艺、活动或设施。"
      ],
      craftIntro: [
        "你好！我可以回答关于{craftName}的问题。",
        "请询问工艺品的细节或历史。"
      ],
      typing: "正在生成回复...",
      inputPlaceholder: "请输入消息...",
      send: "发送",
      sending: "发送中...",
      error: "抱歉，发生错误，请重试。"
    }
  },
  fr: {
    home: {
      backToLanguageSelection: "← Retour à la sélection de la langue",
      todaysDemoTitle: "Démonstration d'aujourd'hui",
      loading: "Chargement...",
      viewDetails: "Voir les détails",
      noDemo: "Aucune démonstration aujourd'hui",
      eventsTitle: "Événements du jour",
      noEvents: "Aucun événement aujourd'hui",
      termsOfUse: "Conditions d'utilisation",
      privacyPolicy: "Politique de confidentialité"
    },
    demoModal: {
      title: "Démonstration d'artisanat",
      empty: "À venir"
    },
    eventModal: {
      periodHeading: "Dates de l'événement"
    },
    craftGrid: {
      heading: "Liste des artisanats",
      categoryLabels: {
        "住": "Catégorie : Habitat",
        "礼": "Catégorie : Cérémonie",
        "食": "Catégorie : Alimentation",
        "職": "Catégorie : Travail",
        "衣": "Catégorie : Vêtements",
        "その他": "Catégorie : Autre"
      }
    },
    craftPage: {
      backToList: "← Retour à la liste",
      videoSectionTitle: "Vidéo",
      shopSectionTitle: "Boutique",
      shopPrimaryDescription: "Vous pouvez acheter cet artisanat dans la boutique en ligne",
      shopTapHint: "Touchez l'icône ci-dessous",
      shopOtherDescription: "Découvrir d'autres artisanats dans la boutique en ligne",
      shopPrimaryAria: "Voir cet artisanat dans la boutique MOCAD",
      shopOtherAria: "Voir d'autres artisanats dans la boutique MOCAD"
    },
    langPage: {
      ageHeading: "Choisissez votre âge",
      ageSubheading: "Sélectionnez votre tranche d'âge",
      agePlaceholder: "Veuillez choisir",
      languageHeading: "Choisissez la langue",
      languageSubheading: "Sélectionnez votre langue",
      saving: "Enregistrement de vos préférences...",
      ageLabels: {
        "9": "0-12 ans",
        "16": "12-18 ans",
        "20": "18-29 ans",
        "30": "30-39 ans",
        "40": "40-49 ans",
        "50": "50-59 ans",
        "60": "60-69 ans",
        "70": "70-79 ans",
        "80": "80 ans et plus"
      }
    },
    chatbot: {
      title: "Assistant du musée",
      intro: [
        "Bonjour ! Je suis le chatbot guide du musée.",
        "N'hésitez pas à poser vos questions sur les expositions, artisanats, événements ou services."
      ],
      craftIntro: [
        "Bonjour ! Je peux répondre aux questions sur {craftName}.",
        "Demandez-moi des détails sur l'artisanat ou son histoire."
      ],
      typing: "Rédaction en cours...",
      inputPlaceholder: "Saisissez votre message...",
      send: "Envoyer",
      sending: "Envoi...",
      error: "Une erreur s'est produite. Merci de réessayer."
    }
  }
  ko: {
    home: {
      backToLanguageSelection: "← 언어 선택으로 돌아가기",
      todaysDemoTitle: "오늘의 실연",
      loading: "불러오는 중...",
      viewDetails: "자세히 보기",
      noDemo: "오늘은 시연이 없습니다",
      eventsTitle: "오늘 진행 중인 이벤트",
      noEvents: "오늘 진행 중인 이벤트가 없습니다",
      termsOfUse: "이용 약관",
      privacyPolicy: "개인정보 처리방침"
    },
    demoModal: {
      title: "공예 시연",
      empty: "준비 중"
    },
    eventModal: {
      periodHeading: "행사 기간"
    },
    craftGrid: {
      heading: "공예 목록",
      categoryLabels: {
        "住": "카테고리: 주거",
        "礼": "카테고리: 예절",
        "食": "카테고리: 음식",
        "職": "카테고리: 직업",
        "衣": "카테고리: 의복",
        "その他": "카테고리: 기타"
      }
    },
    craftPage: {
      backToList: "← 공예 목록으로 돌아가기",
      videoSectionTitle: "영상",
      shopSectionTitle: "스토어",
      shopPrimaryDescription: "이 공예품은 온라인 스토어에서 구매할 수 있습니다",
      shopTapHint: "아래 아이콘을 탭하세요",
      shopOtherDescription: "온라인 스토어에서 다른 공예품을 둘러보기",
      shopPrimaryAria: "MOCAD 스토어에서 이 공예품 보기",
      shopOtherAria: "MOCAD 스토어에서 다른 공예품 보기"
    },
    langPage: {
      ageHeading: "연령 선택",
      ageSubheading: "연령대를 선택하세요",
      agePlaceholder: "선택하세요",
      languageHeading: "언어 선택",
      languageSubheading: "사용할 언어를 선택하세요",
      saving: "설정을 저장하는 중...",
      ageLabels: {
        "9": "0-12세",
        "16": "12-18세",
        "20": "18-29세",
        "30": "30-39세",
        "40": "40-49세",
        "50": "50-59세",
        "60": "60-69세",
        "70": "70-79세",
        "80": "80세 이상"
      }
    },
    chatbot: {
      title: "뮤지엄 가이드 챗봇",
      intro: [
        "안녕하세요! 뮤지엄 가이드 챗봇입니다.",
        "전시, 공예, 이벤트, 시설에 대해 무엇이든 물어보세요."
      ],
      craftIntro: [
        "안녕하세요! {craftName}에 대해 질문에 답변해 드리겠습니다.",
        "공예품의 세부 사항이나 역사에 대해 물어보세요."
      ],
      typing: "답변을 작성하는 중...",
      inputPlaceholder: "메시지를 입력하세요...",
      send: "보내기",
      sending: "전송 중...",
      error: "오류가 발생했습니다. 다시 시도해주세요."
    }
  },
  es: {
    home: {
      backToLanguageSelection: "← Volver a la selección de idioma",
      todaysDemoTitle: "Demostración de hoy",
      loading: "Cargando...",
      viewDetails: "Ver detalles",
      noDemo: "No hay demostración hoy",
      eventsTitle: "Eventos de hoy",
      noEvents: "No hay eventos hoy",
      termsOfUse: "Términos de uso",
      privacyPolicy: "Política de privacidad"
    },
    demoModal: {
      title: "Demostración de artesanía",
      empty: "Próximamente"
    },
    eventModal: {
      periodHeading: "Fechas del evento"
    },
    craftGrid: {
      heading: "Lista de artesanías",
      categoryLabels: {
        "住": "Categoría: Vivienda",
        "礼": "Categoría: Ceremonia",
        "食": "Categoría: Gastronomía",
        "職": "Categoría: Trabajo",
        "衣": "Categoría: Vestimenta",
        "その他": "Categoría: Otros"
      }
    },
    craftPage: {
      backToList: "← Volver a la lista",
      videoSectionTitle: "Video",
      shopSectionTitle: "Tienda",
      shopPrimaryDescription: "Puedes comprar esta artesanía en la tienda en línea",
      shopTapHint: "Toca el ícono de abajo",
      shopOtherDescription: "Explora otras artesanías en la tienda en línea",
      shopPrimaryAria: "Ver esta artesanía en la tienda MOCAD",
      shopOtherAria: "Ver otras artesanías en la tienda MOCAD"
    },
    langPage: {
      ageHeading: "Selecciona tu edad",
      ageSubheading: "Elige tu rango de edad",
      agePlaceholder: "Selecciona",
      languageHeading: "Selecciona idioma",
      languageSubheading: "Elige tu idioma",
      saving: "Guardando tus preferencias...",
      ageLabels: {
        "9": "0-12 años",
        "16": "12-18 años",
        "20": "18-29 años",
        "30": "30-39 años",
        "40": "40-49 años",
        "50": "50-59 años",
        "60": "60-69 años",
        "70": "70-79 años",
        "80": "80 años o más"
      }
    },
    chatbot: {
      title: "Chat del museo",
      intro: [
        "¡Hola! Soy el chatbot guía del museo.",
        "Pregunta lo que quieras sobre exhibiciones, artesanías, eventos o el recinto."
      ],
      craftIntro: [
        "¡Hola! Puedo responder preguntas sobre {craftName}.",
        "Pregúntame sobre los detalles de la artesanía o su historia."
      ],
      typing: "Redactando respuesta...",
      inputPlaceholder: "Escribe tu mensaje...",
      send: "Enviar",
      sending: "Enviando...",
      error: "Ocurrió un error. Inténtalo de nuevo."
    }
  }
};

const localeMap: Record<UserLanguage, string> = {
  ja: "ja-JP",
  en: "en-US",
  zh: "zh-CN",
  fr: "fr-FR",
  ko: "ko-KR",
  es: "es-ES"
};

export function getTranslations(lang: UserLanguage | undefined): SectionTranslations {
  if (!lang) {
    return translations.ja;
  }
  return translations[lang] ?? translations.ja;
}

export function getLocale(lang: UserLanguage | undefined): string {
  if (!lang) {
    return localeMap.ja;
  }
  return localeMap[lang] ?? localeMap.ja;
}

export function formatDateByLang(date: Date, lang: UserLanguage | undefined): string {
  return new Date(date).toLocaleDateString(getLocale(lang), {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
