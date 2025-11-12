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
      todaysDemoTitle: "本日の職人実演",
      loading: "読み込み中...",
      viewDetails: "詳細を見る",
      noDemo: "本日のデモはありません",
      eventsTitle: "本日開催中のイベント",
      noEvents: "本日開催中のイベントはありません"
    },
    demoModal: {
      title: "職人実演",
      empty: "準備中"
    },
    eventModal: {
      periodHeading: "開催期間"
    },
    craftGrid: {
      heading: "工芸一覧"
    },
    craftPage: {
      backToList: "← 工芸一覧へ戻る",
      videoSectionTitle: "動画",
      shopSectionTitle: "ショップ",
      shopPrimaryDescription: "この工芸品をオンラインショップで購入できます",
      shopTapHint: "下のアイコンをタップ↓",
      shopOtherDescription: "他の工芸品をオンラインショップで購入できます",
      shopPrimaryAria: "MOCADショップでこの工芸品を見る",
      shopOtherAria: "MOCADショップで他の工芸品を見る"
    },
    langPage: {
      ageHeading: "年齢を選択",
      ageSubheading: "年齢を選択してください",
      agePlaceholder: "選択してください",
      languageHeading: "言語を選択",
      languageSubheading: "言語を選択してください",
      saving: "設定を保存しています...",
      ageLabels: {
        "9": "0〜12歳",
        "16": "12〜18歳",
        "20": "18〜29歳",
        "30": "30〜39歳",
        "40": "40〜49歳",
        "50": "50〜59歳",
        "60": "60〜69歳",
        "70": "70〜79歳",
        "80": "80歳〜"
      }
    },
    chatbot: {
      title: "博物館案内チャット",
      intro: [
        "こんにちは！博物館案内チャットボットです。",
        "展示品、工芸品、イベント、施設についてお気軽にお聞きください。"
      ],
      typing: "返信を作成中...",
      inputPlaceholder: "メッセージを入力してください...",
      send: "送信",
      sending: "送信中...",
      error: "申し訳ございません。エラーが発生しました。もう一度お試しください。"
    }
  },
  en: {
    home: {
      backToLanguageSelection: "← Back to language selection",
      todaysDemoTitle: "Today's craft demonstration",
      loading: "Loading...",
      viewDetails: "View details",
      noDemo: "No demonstration today",
      eventsTitle: "Events happening today",
      noEvents: "No events are happening today"
    },
    demoModal: {
      title: "Craft demonstration",
      empty: "Coming soon"
    },
    eventModal: {
      periodHeading: "Event dates"
    },
    craftGrid: {
      heading: "Craft list"
    },
    craftPage: {
      backToList: "← Back to craft list",
      videoSectionTitle: "Video",
      shopSectionTitle: "Shop",
      shopPrimaryDescription: "You can purchase this craft in the online shop",
      shopTapHint: "Tap the icon below ↓",
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
        "9": "Ages 0–12",
        "16": "Ages 12–18",
        "20": "Ages 18–29",
        "30": "Ages 30–39",
        "40": "Ages 40–49",
        "50": "Ages 50–59",
        "60": "Ages 60–69",
        "70": "Ages 70–79",
        "80": "Ages 80+"
      }
    },
    chatbot: {
      title: "Museum guide chat",
      intro: [
        "Hello! I'm the museum guide chatbot.",
        "Feel free to ask about exhibits, crafts, events, or the facility."
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
      todaysDemoTitle: "今日的匠人演示",
      loading: "加载中...",
      viewDetails: "查看详情",
      noDemo: "今日没有演示",
      eventsTitle: "今日正在举行的活动",
      noEvents: "今日没有正在举行的活动"
    },
    demoModal: {
      title: "匠人演示",
      empty: "敬请期待"
    },
    eventModal: {
      periodHeading: "举办期间"
    },
    craftGrid: {
      heading: "工艺一览"
    },
    craftPage: {
      backToList: "← 返回工艺一览",
      videoSectionTitle: "视频",
      shopSectionTitle: "商店",
      shopPrimaryDescription: "您可以在网上商店购买这件工艺品",
      shopTapHint: "点击下方图标 ↓",
      shopOtherDescription: "在网上商店浏览其他工艺品",
      shopPrimaryAria: "在MOCAD商店查看此工艺品",
      shopOtherAria: "在MOCAD商店查看其他工艺品"
    },
    langPage: {
      ageHeading: "选择年龄",
      ageSubheading: "请选择您的年龄段",
      agePlaceholder: "请选择",
      languageHeading: "选择语言",
      languageSubheading: "请选择语言",
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
        "您好！我是博物馆导览聊天机器人。",
        "欢迎询问展品、工艺、活动或设施。"
      ],
      typing: "正在生成回复...",
      inputPlaceholder: "请输入消息...",
      send: "发送",
      sending: "发送中...",
      error: "抱歉，发生错误。请再试一次。"
    }
  }
};

const localeMap: Record<UserLanguage, string> = {
  ja: "ja-JP",
  en: "en-US",
  zh: "zh-CN"
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
