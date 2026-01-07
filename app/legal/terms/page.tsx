"use client";

import { useUser } from "@/contexts/UserContext";
import type { UserLanguage } from "@/types/types";

// 各言語の利用規約コンテンツ
const termsContent: Record<UserLanguage, { title: string; content: React.ReactNode }> = {
  ja: {
    title: "利用規約",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>本利用規約（以下「本規約」といいます。）は、Artisan Japan 株式会社（以下「当社」といいます。）が、株式会社京都産業振興センターより業務委託を受けて提供する「京都伝統産業ミュージアム館内ガイド ブラウザアプリ」（以下「本アプリ」といいます。）の利用条件を定めるものです。</p>
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
          <li>その他、当社またはミュージアム運営者が不適切と判断する行為</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">第4条（知的財産権）</h2>
        <p>本アプリに掲載される文章、画像、映像、デザイン、プログラム等に関する著作権その他の知的財産権は、当社または正当な権利を有する第三者に帰属します。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第5条（免責事項）</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>当社は、本アプリに掲載される情報の正確性、完全性、最新性について保証するものではありません。</li>
          <li>本アプリの利用または利用不能により生じたいかなる損害についても、当社およびミュージアム運営者は責任を負いません。</li>
          <li>通信環境、端末の不具合、システム障害、不可抗力等により、本アプリが正常に利用できない場合があります。</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">第6条（サービス内容の変更・停止）</h2>
        <p>当社は、事前の通知なく、本アプリの内容の変更、提供の中断または終了を行うことがあります。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第7条（準拠法・管轄）</h2>
        <p>本規約は日本法を準拠法とし、本アプリに関して生じた紛争については、京都地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
      </div>
    ),
  },
  en: {
    title: "Terms of Use",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>These Terms of Use (hereinafter referred to as the &quot;Terms&quot;) set forth the conditions for using the &quot;Kyoto Museum of Crafts and Design In-Museum Guide Browser App&quot; (hereinafter referred to as the &quot;App&quot;), provided by Artisan Japan Inc. (hereinafter referred to as the &quot;Company&quot;) under contract from the Kyoto Industry Promotion Center.</p>
        <p>By using the App, the user (visitor) is deemed to have agreed to the content of these Terms.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 1 (Purpose)</h2>
        <p>The purpose of the App is to provide visitors with information regarding exhibits, demonstrations, events, etc., within the Kyoto Museum of Crafts and Design.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 2 (Usage Environment)</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>The App is a web browser application viewed using the user&apos;s own smartphone, tablet, or other device and communication environment.</li>
          <li>The user shall bear the costs associated with communication.</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 3 (Prohibited Acts)</h2>
        <p>Users shall not engage in the following acts when using the App:</p>
        <ol className="list-decimal list-inside pl-4">
          <li>Acts that violate laws and regulations or public order and morals.</li>
          <li>Acts that interfere with the operation of the App.</li>
          <li>Acts of unauthorized modification, reproduction, reprinting, or redistribution of the App&apos;s content.</li>
          <li>Other acts deemed inappropriate by the Company or the Museum operator.</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 4 (Intellectual Property Rights)</h2>
        <p>Copyrights and other intellectual property rights regarding the text, images, videos, designs, programs, etc., posted on the App belong to the Company or third parties holding legitimate rights.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 5 (Disclaimer)</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>The Company does not guarantee the accuracy, completeness, or recency of the information posted on the App.</li>
          <li>The Company and the Museum operator shall not be liable for any damages caused by the use or inability to use the App.</li>
          <li>The App may not be normally available due to communication environments, device malfunctions, system failures, force majeure, etc.</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 6 (Change or Suspension of Service)</h2>
        <p>The Company may change the content of the App or suspend or terminate its provision without prior notice.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 7 (Governing Law and Jurisdiction)</h2>
        <p>These Terms shall be governed by the laws of Japan, and the Kyoto District Court shall be the exclusive agreed court of first instance for any disputes arising regarding the App.</p>
      </div>
    ),
  },
  zh: {
    title: "使用条款",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>本使用条款（以下简称&quot;本条款&quot;）规定了Artisan Japan株式会社（以下简称&quot;本公司&quot;）受京都产业振兴中心委托提供的&quot;京都传统产业博物馆馆内指南浏览器应用程序&quot;（以下简称&quot;本应用程序&quot;）的使用条件。</p>
        <p>用户（来馆者）使用本应用程序即视为同意本条款的内容。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第1条（目的）</h2>
        <p>本应用程序旨在为京都传统产业博物馆内的来馆者提供有关展品、演示、活动等信息。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第2条（使用环境）</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>本应用程序是用户利用自己的智能手机、平板电脑等终端及通信环境进行浏览的网络浏览器应用程序。</li>
          <li>通信产生的费用由用户承担。</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">第3条（禁止事项）</h2>
        <p>用户在使用本应用程序时，不得进行以下行为：</p>
        <ol className="list-decimal list-inside pl-4">
          <li>违反法律法规或公序良俗的行为</li>
          <li>妨碍本应用程序运营的行为</li>
          <li>擅自更改、复制、转载、再分发本应用程序内容的行为</li>
          <li>其他本公司或博物馆运营方认为不适当的行为</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">第4条（知识产权）</h2>
        <p>本应用程序上发布的文章、图片、视频、设计、程序等相关著作权及其他知识产权归本公司或拥有正当权利的第三方所有。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第5条（免责事项）</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>本公司不保证本应用程序上发布的信息的准确性、完整性和最新性。</li>
          <li>对于因使用或无法使用本应用程序而产生的任何损害，本公司及博物馆运营方概不负责。</li>
          <li>由于通信环境、终端故障、系统障碍、不可抗力等原因，可能导致无法正常使用本应用程序。</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">第6条（服务内容的变更与停止）</h2>
        <p>本公司可能在未事先通知的情况下，变更本应用程序的内容，或中断、终止提供服务。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第7条（适用法律与管辖）</h2>
        <p>本条款以日本法为准据法，关于本应用程序产生的纠纷，以京都地方法院为第一审专属协议管辖法院。</p>
      </div>
    ),
  },
  ko: {
    title: "이용 약관",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>본 이용 약관(이하 &apos;본 약관&apos;이라 합니다)은 Artisan Japan 주식회사(이하 &apos;당사&apos;라 합니다)가 주식회사 교토산업진흥센터로부터 업무 위탁을 받아 제공하는 &apos;교토 전통산업 뮤지엄 관내 가이드 브라우저 앱&apos;(이하 &apos;본 앱&apos;이라 합니다)의 이용 조건을 정하는 것입니다.</p>
        <p>이용자(방문객)는 본 앱을 이용함으로써 본 약관의 내용에 동의한 것으로 간주됩니다.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">제1조 (목적)</h2>
        <p>본 앱은 교토 전통산업 뮤지엄 관내에서 전시물, 시연, 이벤트 등에 관한 정보를 방문객에게 제공하는 것을 목적으로 합니다.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">제2조 (이용 환경)</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>본 앱은 이용자 자신의 스마트폰, 태블릿 등의 단말기 및 통신 환경을 이용하여 열람하는 웹 브라우저 앱입니다.</li>
          <li>통신에 소요되는 비용은 이용자의 부담으로 합니다.</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">제3조 (금지 사항)</h2>
        <p>이용자는 본 앱을 이용함에 있어 다음의 행위를 하여서는 안 됩니다.</p>
        <ol className="list-decimal list-inside pl-4">
          <li>법령 또는 공서양속에 반하는 행위</li>
          <li>본 앱의 운영을 방해하는 행위</li>
          <li>본 앱의 내용을 무단으로 개변, 복제, 전재, 재배포하는 행위</li>
          <li>기타 당사 또는 뮤지엄 운영자가 부적절하다고 판단하는 행위</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">제4조 (지적재산권)</h2>
        <p>본 앱에 게재되는 문장, 이미지, 영상, 디자인, 프로그램 등에 관한 저작권 기타 지적재산권은 당사 또는 정당한 권리를 가진 제3자에게 귀속됩니다.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">제5조 (면책 조항)</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>당사는 본 앱에 게재되는 정보의 정확성, 완전성, 최신성에 대해 보증하지 않습니다.</li>
          <li>본 앱의 이용 또는 이용 불능으로 인해 발생한 어떠한 손해에 대해서도 당사 및 뮤지엄 운영자는 책임을 지지 않습니다.</li>
          <li>통신 환경, 단말기의 오작동, 시스템 장애, 불가항력 등으로 인해 본 앱을 정상적으로 이용할 수 없는 경우가 있습니다.</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">제6조 (서비스 내용의 변경 및 중단)</h2>
        <p>당사는 사전 통지 없이 본 앱의 내용을 변경하거나 제공을 중단 또는 종료할 수 있습니다.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">제7조 (준거법 및 관할)</h2>
        <p>본 약관은 일본법을 준거법으로 하며, 본 앱에 관하여 발생한 분쟁에 대해서는 교토지방재판소를 제1심의 전속적 합의 관할 법원으로 합니다.</p>
      </div>
    ),
  },
  es: {
    title: "Términos de Uso",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>Estos Términos de Uso (en adelante, &quot;los Términos&quot;) establecen las condiciones para el uso de la &quot;Aplicación de Guía del Museo de Artesanía Tradicional de Kioto&quot; (en adelante, &quot;la Aplicación&quot;), proporcionada por Artisan Japan Inc. (en adelante, &quot;la Compañía&quot;) bajo contrato con el Centro de Promoción Industrial de Kioto.</p>
        <p>Al utilizar la Aplicación, se considera que el usuario (visitante) ha aceptado el contenido de estos Términos.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 1 (Propósito)</h2>
        <p>El propósito de la Aplicación es proporcionar a los visitantes información sobre exhibiciones, demostraciones, eventos, etc., dentro del Museo de Artesanía Tradicional de Kioto.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 2 (Entorno de Uso)</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>La Aplicación es una aplicación de navegador web que se visualiza utilizando el propio teléfono inteligente, tableta u otro dispositivo del usuario y su entorno de comunicación.</li>
          <li>El usuario correrá con los gastos asociados a la comunicación.</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 3 (Actos Prohibidos)</h2>
        <p>Los usuarios no deberán realizar los siguientes actos al utilizar la Aplicación:</p>
        <ol className="list-decimal list-inside pl-4">
          <li>Actos que violen las leyes y regulaciones o el orden público y la moral.</li>
          <li>Actos que interfieran con el funcionamiento de la Aplicación.</li>
          <li>Actos de modificación, reproducción, reimpresión o redistribución no autorizada del contenido de la Aplicación.</li>
          <li>Otros actos considerados inapropiados por la Compañía o el operador del Museo.</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 4 (Derechos de Propiedad Intelectual)</h2>
        <p>Los derechos de autor y otros derechos de propiedad intelectual sobre los textos, imágenes, videos, diseños, programas, etc., publicados en la Aplicación pertenecen a la Compañía o a terceros que posean derechos legítimos.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 5 (Exención de Responsabilidad)</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>La Compañía no garantiza la exactitud, integridad o actualidad de la información publicada en la Aplicación.</li>
          <li>La Compañía y el operador del Museo no serán responsables de ningún daño causado por el uso o la imposibilidad de uso de la Aplicación.</li>
          <li>Es posible que la Aplicación no esté disponible normalmente debido a entornos de comunicación, mal funcionamiento del dispositivo, fallas del sistema, fuerza mayor, etc.</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 6 (Cambio o Suspensión del Servicio)</h2>
        <p>La Compañía puede cambiar el contenido de la Aplicación o suspender o finalizar su provisión sin previo aviso.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 7 (Ley Aplicable y Jurisdicción)</h2>
        <p>Estos Términos se regirán por las leyes de Japón, y el Tribunal de Distrito de Kioto será el tribunal exclusivo acordado de primera instancia para cualquier disputa que surja con respecto a la Aplicación.</p>
      </div>
    ),
  },
  fr: {
    title: "Conditions d'utilisation",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>Ces Conditions d&apos;utilisation (ci-après dénommées les &quot;Conditions&quot;) définissent les conditions d&apos;utilisation de l&apos;&quot;Application Guide du Musée des Arts et Métiers Traditionnels de Kyoto&quot; (ci-après dénommée l&apos;&quot;Application&quot;), fournie par Artisan Japan Inc. (ci-après dénommée la &quot;Société&quot;) sous contrat avec le Centre de Promotion Industrielle de Kyoto.</p>
        <p>En utilisant l&apos;Application, l&apos;utilisateur (visiteur) est réputé avoir accepté le contenu de ces Conditions.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 1 (Objet)</h2>
        <p>L&apos;objet de l&apos;Application est de fournir aux visiteurs des informations concernant les expositions, démonstrations, événements, etc., au sein du Musée des Arts et Métiers Traditionnels de Kyoto.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 2 (Environnement d&apos;utilisation)</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>L&apos;Application est une application de navigateur web consultée à l&apos;aide du smartphone, de la tablette ou de tout autre appareil de l&apos;utilisateur et de son environnement de communication.</li>
          <li>L&apos;utilisateur assume les coûts liés à la communication.</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 3 (Actes interdits)</h2>
        <p>Les utilisateurs ne doivent pas se livrer aux actes suivants lors de l&apos;utilisation de l&apos;Application :</p>
        <ol className="list-decimal list-inside pl-4">
          <li>Actes violant les lois et règlements ou l&apos;ordre public et les bonnes mœurs.</li>
          <li>Actes interférant avec le fonctionnement de l&apos;Application.</li>
          <li>Actes de modification, reproduction, réimpression ou redistribution non autorisée du contenu de l&apos;Application.</li>
          <li>Autres actes jugés inappropriés par la Société ou l&apos;opérateur du Musée.</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 4 (Droits de propriété intellectuelle)</h2>
        <p>Les droits d&apos;auteur et autres droits de propriété intellectuelle concernant les textes, images, vidéos, designs, programmes, etc., publiés sur l&apos;Application appartiennent à la Société ou à des tiers détenant des droits légitimes.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 5 (Exonération de responsabilité)</h2>
        <ol className="list-decimal list-inside pl-4">
          <li>La Société ne garantit pas l&apos;exactitude, l&apos;exhaustivité ou l&apos;actualité des informations publiées sur l&apos;Application.</li>
          <li>La Société et l&apos;opérateur du Musée ne seront pas responsables des dommages causés par l&apos;utilisation ou l&apos;incapacité d&apos;utiliser l&apos;Application.</li>
          <li>L&apos;Application peut ne pas être disponible normalement en raison des environnements de communication, des dysfonctionnements de l&apos;appareil, des pannes du système, de la force majeure, etc.</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 6 (Modification ou suspension du service)</h2>
        <p>La Société peut modifier le contenu de l&apos;Application ou suspendre ou mettre fin à sa fourniture sans préavis.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 7 (Droit applicable et juridiction)</h2>
        <p>Ces Conditions sont régies par les lois du Japon, et le Tribunal de district de Kyoto sera le tribunal exclusif convenu de première instance pour tout litige survenant concernant l&apos;Application.</p>
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
