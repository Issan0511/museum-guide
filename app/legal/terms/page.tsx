"use client";

import { useUser } from "@/contexts/UserContext";
import type { UserLanguage } from "@/types/types";

// 各言語の利用規約コンテンツ
const termsContent: Record<UserLanguage, { title: string; content: React.ReactNode }> = {
  ja: {
    title: "利用規約",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>本利用規約（以下「本規約」といいます。）は、京都伝統産業ミュージアム（以下「当館」といいます。）が提供する「京都伝統産業ミュージアム館内ガイド ブラウザアプリ」（以下「本アプリ」といいます。）の利用条件を定めるものです。なお、本アプリの運営管理の一部は、当館から委託を受けたArtisan Japan株式会社が行います。</p>
        <p className="font-semibold">本規約は日本語を正文とします。本規約について日本語版と他言語版との間に差異または矛盾が生じた場合には、日本語版の内容が優先されるものとします。</p>
        <p>利用者（来館者）は、本アプリを利用することにより、本規約の内容に同意したものとみなされます。</p>
        
        <h2 className="text-xl font-bold mt-6 mb-2">第1条（目的）</h2>
        <p>本アプリは、京都伝統産業ミュージアム館内において、展示物、実演、イベント等に関する情報を来館者に提供することを目的とします。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第2条（利用環境）</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>本アプリは、利用者自身のスマートフォン、タブレット等の端末および通信環境を利用して閲覧される Web ブラウザアプリです。</li>
          <li>通信にかかる費用は、利用者の負担とします。</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">第3条（禁止事項）</h2>
        <p>利用者は、本アプリの利用にあたり、以下の行為を行ってはなりません。</p>
        <ol className="list-decimal list-inside pl-4">
          <li>法令または公序良俗に反する行為</li>
          <li>本アプリの運営を妨害する行為</li>
          <li>本アプリの内容を無断で改変、複製、転載、再配布する行為</li>
          <li>その他、当館または本アプリ運営受託者が不適切と判断する行為</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">第4条（知的財産権）</h2>
        <p>本アプリに掲載される文章、画像、映像、デザイン、プログラム等に関する著作権その他の知的財産権は、当館または正当な権利を有する第三者に帰属します。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第5条（免責事項）</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>当館は、本アプリに掲載される情報の正確性、完全性、最新性について保証するものではありません。</li>
          <li>本アプリの利用または利用不能により生じたいかなる損害についても、当館および本アプリ運営受託者は責任を負いません。</li>
          <li>通信環境、端末の不具合、システム障害、不可抗力等により、本アプリが正常に利用できない場合があります。</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">第6条（サービス内容の変更・停止）</h2>
        <p>当館は、事前の通知なく、本アプリの内容の変更、提供の中断または終了を行うことがあります。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第7条（準拠法・管轄）</h2>
        <p>本規約は日本法を準拠法とし、本アプリに関して生じた紛争については、京都地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
      </div>
    ),
  },
  en: {
    title: "Terms of Use",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>These Terms of Use (the &quot;Terms&quot;) set forth the conditions for using the &quot;Kyoto Traditional Industry Museum In-House Guide Browser Application&quot; (the &quot;Application&quot;) provided by the Kyoto Traditional Industry Museum (the &quot;Museum&quot;).</p>
        <p>Part of the operation and management of this Application is entrusted by the Museum to Artisan Japan Co., Ltd.</p>
        <p className="font-semibold">These Terms are originally written in Japanese. In the event of any discrepancy or inconsistency between the Japanese version and any translated version, the Japanese version shall prevail.</p>
        <p>By using this Application, users (visitors) are deemed to have agreed to these Terms.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 1 (Purpose)</h2>
        <p>The purpose of this Application is to provide visitors with information regarding exhibits, demonstrations, events, and other activities within the Kyoto Traditional Industry Museum.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 2 (Usage Environment)</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>This Application is a web browser-based application accessed using the user&apos;s own smartphone, tablet, or other devices and communication environment.</li>
          <li>All communication costs incurred shall be borne by the user.</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 3 (Prohibited Acts)</h2>
        <p>Users shall not engage in the following acts:</p>
        <ul className="list-disc list-inside pl-4">
          <li>Acts that violate laws or public order and morals</li>
          <li>Acts that interfere with the operation of this Application</li>
          <li>Unauthorized modification, reproduction, reprinting, or redistribution of the contents</li>
          <li>Any other acts deemed inappropriate by the Museum or the operator</li>
        </ul>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 4 (Intellectual Property Rights)</h2>
        <p>All copyrights and other intellectual property rights related to the contents of this Application belong to the Museum or legitimate third-party rights holders.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 5 (Disclaimer)</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>The Museum does not guarantee the accuracy, completeness, or timeliness of the information provided.</li>
          <li>The Museum and the operator shall not be liable for any damages arising from the use or inability to use this Application.</li>
          <li>This Application may not function properly due to communication issues, device malfunctions, system failures, or force majeure.</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 6 (Changes or Suspension of Services)</h2>
        <p>The Museum may change, suspend, or terminate the contents or provision of this Application without prior notice.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 7 (Governing Law and Jurisdiction)</h2>
        <p>These Terms shall be governed by the laws of Japan. Any disputes shall be subject to the exclusive jurisdiction of the Kyoto District Court as the court of first instance.</p>
      </div>
    ),
  },
  zh: {
    title: "使用条款",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>本使用条款（以下简称&quot;本条款&quot;）规定了京都传统产业博物馆（以下简称&quot;本馆&quot;）所提供的&quot;京都传统产业博物馆馆内导览浏览器应用&quot;（以下简称&quot;本应用&quot;）的使用条件。</p>
        <p>本应用的部分运营与管理由本馆委托 Artisan Japan 株式会社负责。</p>
        <p className="font-semibold">本条款以日文版本为正式文本。如日文版本与其他语言版本之间存在任何差异或不一致之处，均以日文版本为准。</p>
        <p>使用者（来馆者）在使用本应用时，视为已同意本条款的全部内容。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第一条（目的）</h2>
        <p>本应用旨在于京都传统产业博物馆馆内向来馆者提供有关展品、实演、活动等信息。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第二条（使用环境）</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>本应用为通过使用者自身的智能手机、平板电脑等终端及通信环境进行访问的网页浏览器应用。</li>
          <li>使用本应用所产生的通信费用由使用者自行承担。</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">第三条（禁止事项）</h2>
        <p>使用者在使用本应用时，不得从事以下行为：</p>
        <ul className="list-disc list-inside pl-4">
          <li>违反法律法规或公序良俗的行为</li>
          <li>妨碍本应用运营的行为</li>
          <li>未经许可擅自修改、复制、转载或再分发本应用内容的行为</li>
          <li>其他经本馆或本应用运营受托方判断为不适当的行为</li>
        </ul>

        <h2 className="text-xl font-bold mt-6 mb-2">第四条（知识产权）</h2>
        <p>本应用中所刊载的文字、图片、影像、设计、程序等相关的著作权及其他知识产权，均归本馆或合法权利人所有。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第五条（免责声明）</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>本馆不保证本应用所载信息的准确性、完整性及最新性。</li>
          <li>因使用或无法使用本应用而产生的任何损害，本馆及本应用运营受托方概不负责。</li>
          <li>因通信环境、终端故障、系统障碍或不可抗力等原因，本应用可能无法正常使用。</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">第六条（服务内容的变更与停止）</h2>
        <p>本馆可在不事先通知的情况下，对本应用的内容进行变更、中断或终止。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第七条（准据法与管辖）</h2>
        <p>本条款适用日本法律。因本应用产生的任何争议，京都地方法院为第一审的专属合意管辖法院。</p>
      </div>
    ),
  },
  ko: {
    title: "이용 약관",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>본 이용약관(이하 &quot;본 약관&quot;)은 교토 전통산업 박물관(이하 &quot;본관&quot;)이 제공하는 &quot;교토 전통산업 박물관 관내 가이드 브라우저 앱&quot;(이하 &quot;본 앱&quot;)의 이용 조건을 정합니다.</p>
        <p>본 앱의 운영 및 관리 일부는 본관으로부터 위탁을 받은 Artisan Japan 주식회사가 담당합니다.</p>
        <p className="font-semibold">본 약관은 일본어를 원문으로 합니다. 일본어판과 다른 언어판 간에 차이 또는 불일치가 발생하는 경우, 일본어판이 우선합니다.</p>
        <p>이용자(방문객)는 본 앱을 이용함으로써 본 약관에 동의한 것으로 간주됩니다.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">제1조 (목적)</h2>
        <p>본 앱은 교토 전통산업 박물관 관내에서 전시물, 시연, 이벤트 등에 관한 정보를 방문객에게 제공하는 것을 목적으로 합니다.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">제2조 (이용 환경)</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>본 앱은 이용자 본인의 스마트폰, 태블릿 등의 단말기 및 통신 환경을 이용하여 접속하는 웹 브라우저 앱입니다.</li>
          <li>본 앱 이용에 따른 통신 비용은 이용자가 부담합니다.</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">제3조 (금지 사항)</h2>
        <p>이용자는 본 앱 이용 시 다음 행위를 하여서는 안 됩니다.</p>
        <ul className="list-disc list-inside pl-4">
          <li>법령 또는 공서양속에 반하는 행위</li>
          <li>본 앱의 운영을 방해하는 행위</li>
          <li>본 앱의 내용을 무단으로 변경, 복제, 전재, 재배포하는 행위</li>
          <li>기타 본관 또는 운영 위탁자가 부적절하다고 판단하는 행위</li>
        </ul>

        <h2 className="text-xl font-bold mt-6 mb-2">제4조 (지식재산권)</h2>
        <p>본 앱에 게재된 문장, 이미지, 영상, 디자인, 프로그램 등의 저작권 및 기타 지식재산권은 본관 또는 정당한 권리자에게 귀속됩니다.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">제5조 (면책 사항)</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>본관은 본 앱에 게재된 정보의 정확성, 완전성 및 최신성에 대해 보증하지 않습니다.</li>
          <li>본 앱의 이용 또는 이용 불가로 인해 발생한 어떠한 손해에 대해서도 본관 및 운영 위탁자는 책임을 지지 않습니다.</li>
          <li>통신 환경, 단말기 문제, 시스템 장애, 불가항력 등의 사유로 본 앱이 정상적으로 이용되지 않을 수 있습니다.</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">제6조 (서비스 내용의 변경·중단)</h2>
        <p>본관은 사전 통지 없이 본 앱의 내용을 변경하거나 제공을 중단 또는 종료할 수 있습니다.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">제7조 (준거법 및 관할)</h2>
        <p>본 약관은 일본법을 준거법으로 하며, 본 앱과 관련하여 발생한 분쟁에 대해서는 교토지방법원을 제1심 전속 관할 법원으로 합니다.</p>
      </div>
    ),
  },
  es: {
    title: "Términos de Uso",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>Los presentes Términos de Uso (en adelante, los &quot;Términos&quot;) establecen las condiciones para el uso de la &quot;Aplicación de Navegador de Guía Interna del Museo de Industrias Tradicionales de Kioto&quot; (en adelante, la &quot;Aplicación&quot;), proporcionada por el Museo de Industrias Tradicionales de Kioto (en adelante, el &quot;Museo&quot;).</p>
        <p>Parte de la operación y gestión de esta Aplicación ha sido encomendada por el Museo a Artisan Japan Co., Ltd.</p>
        <p className="font-semibold">Estos Términos han sido redactados originalmente en japonés. En caso de discrepancia o conflicto entre la versión japonesa y cualquier versión en otro idioma, prevalecerá la versión japonesa.</p>
        <p>Al utilizar esta Aplicación, los usuarios (visitantes) se considerarán que han aceptado estos Términos.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 1 (Objeto)</h2>
        <p>La presente Aplicación tiene como finalidad proporcionar a los visitantes información sobre exposiciones, demostraciones, eventos y otras actividades dentro del Museo de Industrias Tradicionales de Kioto.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 2 (Entorno de uso)</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>Esta Aplicación es una aplicación web accesible a través de un navegador, utilizando el teléfono inteligente, tableta u otros dispositivos y el entorno de comunicación del propio usuario.</li>
          <li>Los costos de comunicación derivados del uso de esta Aplicación correrán a cargo del usuario.</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 3 (Actos prohibidos)</h2>
        <p>Los usuarios no deberán realizar las siguientes acciones al utilizar esta Aplicación:</p>
        <ul className="list-disc list-inside pl-4">
          <li>Actos que infrinjan las leyes o el orden público y las buenas costumbres</li>
          <li>Actos que interfieran con el funcionamiento de la Aplicación</li>
          <li>Modificación, reproducción, redistribución o publicación no autorizada del contenido de la Aplicación</li>
          <li>Cualquier otro acto que el Museo o el operador considere inapropiado</li>
        </ul>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 4 (Derechos de propiedad intelectual)</h2>
        <p>Los derechos de autor y demás derechos de property intelectual relacionados con los textos, imágenes, videos, diseños, programas y otros contenidos publicados en esta Aplicación pertenecen al Museo o a terceros con derechos legítimos.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 5 (Exención de responsabilidad)</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>El Museo no garantiza la exactitud, integridad ni actualidad de la información proporcionada en la Aplicación.</li>
          <li>El Museo y el operador no serán responsables de ningún daño derivado del uso o la imposibilidad de uso de esta Aplicación.</li>
          <li>La Aplicación puede no funcionar correctamente debido a problemas de comunicación, fallos del dispositivo, errores del sistema o fuerza mayor.</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 6 (Modificación o suspensión del servicio)</h2>
        <p>El Museo podrá modificar, suspender o finalizar el contenido o la prestación de esta Aplicación sin previo aviso.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 7 (Ley aplicable y jurisdicción)</h2>
        <p>Los presentes Términos se regirán por las leyes de Japón. Cualquier controversia relacionada con la Aplicación estará sujeta a la jurisdicción exclusiva del Tribunal de Distrito de Kioto como tribunal de primera instancia.</p>
      </div>
    ),
  },
  fr: {
    title: "Conditions d’utilisation",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>Les présentes conditions d’utilisation (ci-après les &quot;Conditions&quot;) définissent les modalités d’utilisation de l’&quot;Application navigateur de guide interne du Musée des industries traditionnelles de Kyoto&quot; (ci-après l’&quot;Application&quot;), fournie par le Musée des industries traditionnelles de Kyoto (ci-après le &quot;Musée&quot;).</p>
        <p>Une partie de l’exploitation et de la gestion de cette Application est confiée par le Musée à Artisan Japan Co., Ltd.</p>
        <p className="font-semibold">Les présentes Conditions sont rédigées en japonais. En cas de divergence ou d’incohérence entre la version japonaise et toute version traduite, la version japonaise prévaudra.</p>
        <p>En utilisant cette Application, les utilisateurs (visiteurs) sont réputés avoir accepté les présentes Conditions.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 1 (Objet)</h2>
        <p>Cette Application a pour objet de fournir aux visiteurs des informations sur les expositions, démonstrations, événements et autres activités au sein du Musée des industries traditionnelles de Kyoto.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 2 (Environnement d’utilisation)</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>Cette Application est une application web accessible via un navigateur, utilisant le smartphone, la tablette ou tout autre appareil ainsi que l’environnement de communication propres à l’utilisateur.</li>
          <li>Les frais de communication liés à l’utilisation de l’Application sont à la charge de l’utilisateur.</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 3 (Actes interdits)</h2>
        <p>Lors de l’utilisation de l’Application, l’utilisateur s’interdit notamment :</p>
        <ul className="list-disc list-inside pl-4">
          <li>Toute action contraire aux lois ou à l’ordre public et aux bonnes mœurs</li>
          <li>Toute action perturbant le fonctionnement de l’Application</li>
          <li>Toute modification, reproduction, redistribution ou publication non autorisée du contenu de l’Application</li>
          <li>Toute autre action jugée inappropriée par le Musée ou l’opérateur de l’Application</li>
        </ul>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 4 (Droits de propriété intellectuelle)</h2>
        <p>Les droits d’auteur et autres droits de propriété intellectuelle relatifs aux textes, images, vidéos, designs, programmes et autres contenus publiés dans l’Application appartiennent au Musée ou à des tiers détenant des droits légitimes.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 5 (Clause de non-responsabilité)</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>Le Musée ne garantit pas l’exactitude, l’exhaustivité ou l’actualité des informations publiées dans l’Application.</li>
          <li>Le Musée et l’opérateur de l’Application déclinent toute responsabilité pour les dommages résultant de l’utilisation ou de l’impossibilité d’utiliser l’Application.</li>
          <li>L’Application peut ne pas fonctionner correctement en raison de problèmes de communication, de défaillances des appareils, de pannes du système ou de cas de force majeure.</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 6 (Modification ou interruption du service)</h2>
        <p>Le Musée peut modifier, suspendre ou mettre fin au contenu ou à la fourniture de l’Application sans préavis.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 7 (Droit applicable et juridiction compétente)</h2>
        <p>Les présentes Conditions sont régies par le droit japonais. Tout litige relatif à l’Application relèvera de la compétence exclusive du tribunal de district de Kyoto en tant que juridiction de première instance.</p>
      </div>
    ),
  },
};

export default function TermsPage() {
  const { userProfile } = useUser();
  const lang: UserLanguage = userProfile?.language ?? "ja";
  const { title, content } = termsContent[lang];

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <section lang={lang}>
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        {content}
      </section>
    </main>
  );
}
