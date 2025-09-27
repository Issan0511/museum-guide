"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function LangPage() {
  const [age, setAge] = useState<string>("");
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-1">年齢を選択</h2>
        <p className="text-sm text-neutral-600 mb-4">Select your Age</p>
        <Select value={age} onValueChange={setAge}>
          <SelectTrigger className="w-44 h-12 bg-white border-neutral-300 rounded-xl shadow-sm">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            {["under12", "13-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"].map((value) => (
              <SelectItem key={value} value={value}>
                {value === "under12" ? "12歳以下" : value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-1">言語を選択</h2>
        <p className="text-sm text-neutral-600 mb-4">Select your language</p>
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="h-12 bg-white border-neutral-300 rounded-xl shadow-sm font-medium hover:bg-neutral-50"
            onClick={() => router.push("/home")}
          >
            日本語
          </Button>
          <Button
            variant="outline"
            className="h-12 bg-white border-neutral-300 rounded-xl shadow-sm font-medium hover:bg-neutral-50"
          >
            English
          </Button>
          <Button
            variant="outline"
            className="h-12 bg-white border-neutral-300 rounded-xl shadow-sm font-medium hover:bg-neutral-50"
          >
            中文（简体）
          </Button>
        </div>
      </div>
    </div>
  );
}
