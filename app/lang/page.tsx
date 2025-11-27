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
        <h2 className="text-lg font-semibold mb-1">年齢を選択</h2>
        <p className="text-sm text-neutral-600 mb-4">Choose your age range</p>
        <Select value={age ? age.toString() : ""} onValueChange={handleAgeChange}>
          <SelectTrigger className="w-44 h-12 bg-white border-neutral-300 rounded-xl shadow-sm">
            <SelectValue placeholder={t.langPage.agePlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {ageGroups.map((value) => {
              let label = "";
              switch (value) {
                case 9: label = "0-12"; break;
                case 16: label = "12-18"; break;
                case 20: label = "18-29"; break;
                case 30: label = "30-39"; break;
                case 40: label = "40-49"; break;
                case 50: label = "50-59"; break;
                case 60: label = "60-69"; break;
                case 70: label = "70-79"; break;
                case 80: label = "80+"; break;
              }
              return (
                <SelectItem key={value} value={value.toString()}>
                  {label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-1">言語を選択</h2>
        <p className="text-sm text-neutral-600 mb-4">Select your language</p>
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

      <div id="c5" className="p-8 bg-gray-100 text-center mt-8">
        <div className="text-left">
          <p className="mb-1">今後の活動や運営の参考にさせていただきますので、以下のアンケートにご協力いただきますようお願いいたします。</p>
          <p>Please fill out the survey form below.</p>
        </div>
        <div className="link relative w-4/5 border border-gray-600 p-3 mx-auto mb-2 box-border">
          <span className="float-left">アンケート回答ページへ<i className="fa-solid fa-arrow-up-right-from-square pl-2 text-gray-600"></i></span>
          <span className="float-right">＞</span>
          <div className="clear-both"></div>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSeJ9z_GvkaIylTve1q-s3jizj-7xwdNEuRyDg1nLtRnp2DBsA/viewform?pli=1" target="_blank" rel="noopener noreferrer" className="absolute top-0 left-0 w-full h-full indent-[-9999px]">link</a>
        </div>
        <a href="https://kmtc.jp/" target="_blank" rel="noopener noreferrer">
          <img src="/images/museum_logo_lang.png" alt="Museum Logo" className="block mx-auto mt-8 w-[80%]" />
        </a>
        <a href="https://mocad-shop.com/" target="_blank" rel="noopener noreferrer">
          <img src="/images/mocad_shop_logo.png" alt="MOCAD Shop Logo" className="block mx-auto mt-8 w-[80%]" />
        </a>
        <div id="sns" className="px-4 mt-8 box-border">
          <div className="icon_sns relative w-[calc(100%/3-8px)] float-left mx-1 text-center box-border">
            <a href="https://twitter.com/Kyoto_Mocad" className="snsbtn inline-block bg-gray-800 text-white w-10 h-10 leading-10 rounded-full text-center no-underline transition duration-400 hover:bg-white hover:text-black hover:border hover:border-black" target="_blank" rel="noopener noreferrer" title="X">
              <i className="fab fa-x-twitter"></i>
            </a>
            <p className="mt-1 font-bold text-xs">X</p>
          </div>
          <div className="icon_sns relative w-[calc(100%/3-8px)] float-left mx-1 text-center box-border">
            <a href="https://www.facebook.com/KyotoMOCAD" className="snsbtn inline-block bg-gray-800 text-white w-10 h-10 leading-10 rounded-full text-center no-underline transition duration-400 hover:bg-white hover:text-black hover:border hover:border-black" target="_blank" rel="noopener noreferrer" title="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <p className="mt-1 font-bold text-xs">Facebook</p>
          </div>
          <div className="icon_sns relative w-[calc(100%/3-8px)] float-left mx-1 text-center box-border">
            <a href="https://www.instagram.com/kyotomuseumofcraftsanddesign/" className="snsbtn inline-block bg-gray-800 text-white w-10 h-10 leading-10 rounded-full text-center no-underline transition duration-400 hover:bg-white hover:text-black hover:border hover:border-black" target="_blank" rel="noopener noreferrer" title="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <p className="mt-1 font-bold text-xs">Instagram</p>
          </div>
          <div className="clear-both"></div>
        </div>
      </div>
    </div>
  );
}
