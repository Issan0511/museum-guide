export interface DemoTemplate {
  id: number;             // 実演テンプレートの識別ID
  name: string;           // 伝統工芸の名前
  description: string;    // 50字程度の一文
  // 画像パスは demo_images/${id}.png として自動生成
}