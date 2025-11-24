"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import type { AgeGroup, UserLanguage } from "@/types/types";
import { getTranslations } from "@/lib/i18n";

const ageGroups: AgeGroup[] = [9, 16, 20, 30, 40, 50, 60, 70, 80];
const languageOptions: { value: UserLanguage; label: string }[] = [
  { value: "ja", label: "日本語" },
  { value: "en", label: "English" },
  { value: "zh", label: "简体中文" },
  { value: "fr", label: "Français" },
  { value: "ko", label: "한국어" },
  { value: "es", label: "Español" }
];

export default function LangPage() {
  const { userProfile, setUserProfile } = useUser();
  const [age, setAge] = useState<AgeGroup | null>(userProfile?.age ?? null);
  const [language, setLanguage] = useState<UserLanguage | "">(userProfile?.language ?? "");
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userProfile) {
      setAge(userProfile.age);
      setLanguage(userProfile.language);
    }
  }, [userProfile]);

  const currentLanguage = useMemo<UserLanguage>(() => {
    if (language) return language;
    return userProfile?.language ?? "ja";
  }, [language, userProfile]);

  const t = getTranslations(currentLanguage);

  const handleLanguageSelect = async (lang: UserLanguage) => {
    setLanguage(lang);

    // Both age and language must be selected
    if (age && lang) {
      setIsNavigating(true);
      setUserProfile({ age, language: lang });

      // Add a small delay for better UX
      setTimeout(() => {
        router.push("/home");
      }, 800);
    }
  };

  const handleAgeChange = async (value: string) => {
    const ageValue = parseInt(value, 10) as AgeGroup;
    setAge(ageValue);

    // If language is already selected, save and navigate
    if (language) {
      setIsNavigating(true);
      setUserProfile({ age: ageValue, language });

      // Add a small delay for better UX
      setTimeout(() => {
        router.push("/home");
      }, 800);
    }
  };

  if (isNavigating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="relative">
          <div className="w-8 h-8 border-4 border-neutral-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        <div className="text-sm text-neutral-600">{t.langPage.saving}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-1">{t.langPage.ageHeading}</h2>
        <p className="text-sm text-neutral-600 mb-4">{t.langPage.ageSubheading}</p>
        <Select value={age ? age.toString() : ""} onValueChange={handleAgeChange}>
          <SelectTrigger className="w-44 h-12 bg-white border-neutral-300 rounded-xl shadow-sm">
            <SelectValue placeholder={t.langPage.agePlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {ageGroups.map((value) => (
              <SelectItem key={value} value={value.toString()}>
                {t.langPage.ageLabels[value.toString()] ?? value.toString()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-1">{t.langPage.languageHeading}</h2>
        <p className="text-sm text-neutral-600 mb-4">{t.langPage.languageSubheading}</p>
        <div className="grid grid-cols-3 gap-3">
          {languageOptions.map((option) => (
            <Button
              key={option.value}
              variant="outline"
              className={`h-12 bg-white border-neutral-300 rounded-xl shadow-sm font-medium hover:bg-neutral-50 ${
                language === option.value ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => handleLanguageSelect(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
