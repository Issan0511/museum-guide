"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import type { AgeGroup, UserLanguage } from "@/types/types";

export default function LangPage() {
  const [age, setAge] = useState<AgeGroup | "">("");
  const [language, setLanguage] = useState<UserLanguage | "">("");
  const router = useRouter();
  const { setUserProfile } = useUser();

  const handleLanguageSelect = (lang: UserLanguage) => {
    setLanguage(lang);
    
    // Both age and language must be selected
    if (age && lang) {
      setUserProfile({ age, language: lang });
      router.push("/home");
    }
  };

  const handleAgeChange = (value: string) => {
    const ageValue = parseInt(value) as AgeGroup;
    setAge(ageValue);
    
    // If language is already selected, save and navigate
    if (language) {
      setUserProfile({ age: ageValue, language });
      router.push("/home");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-1">年齢を選択</h2>
        <p className="text-sm text-neutral-600 mb-4">Select your Age</p>
        <Select value={age.toString()} onValueChange={handleAgeChange}>
          <SelectTrigger className="w-44 h-12 bg-white border-neutral-300 rounded-xl shadow-sm">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="9">0〜12歳</SelectItem>
            <SelectItem value="16">12〜18歳</SelectItem>
            <SelectItem value="20">18〜29歳</SelectItem>
            <SelectItem value="30">30〜39歳</SelectItem>
            <SelectItem value="40">40〜49歳</SelectItem>
            <SelectItem value="50">50〜59歳</SelectItem>
            <SelectItem value="60">60〜69歳</SelectItem>
            <SelectItem value="70">70〜79歳</SelectItem>
            <SelectItem value="80">80歳〜</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-1">言語を選択</h2>
        <p className="text-sm text-neutral-600 mb-4">Select your language</p>
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            className={`h-12 bg-white border-neutral-300 rounded-xl shadow-sm font-medium hover:bg-neutral-50 ${
              language === "ja" ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => handleLanguageSelect("ja")}
          >
            日本語
          </Button>
          <Button
            variant="outline"
            className={`h-12 bg-white border-neutral-300 rounded-xl shadow-sm font-medium hover:bg-neutral-50 ${
              language === "en" ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => handleLanguageSelect("en")}
          >
            English
          </Button>
          <Button
            variant="outline"
            className={`h-12 bg-white border-neutral-300 rounded-xl shadow-sm font-medium hover:bg-neutral-50 ${
              language === "zh" ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => handleLanguageSelect("zh")}
          >
            中文（简体）
          </Button>
        </div>
      </div>
    </div>
  );
}
