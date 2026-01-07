"use client";

import { useUser } from "@/contexts/UserContext";
import type { UserLanguage } from "@/types/types";

// 各言語のプライバシーポリシーコンテンツ
const privacyContent: Record<UserLanguage, { title: string; content: React.ReactNode }> = {
  ja: {
    title: "プライバシーポリシー",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>京都伝統産業ミュージアム （以下「当館」といいます。）は、当館が提供する「京都伝統産業ミュージアム館内ガイド ブラウザアプリ」（以下「本アプリ」といいます。）における利用者情報の取扱いについて、以下のとおり定めます。</p>
        <p>なお、本アプリの運営管理の一部は、当館から委託を受けたArtisan Japan株式会社が行います。</p>
        <p className="font-semibold">本ポリシーは日本語を正文とします。本ポリシーについて日本語版と他言語版との間に差異または矛盾が生じた場合には、日本語版の内容が優先されるものとします。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第1条（取得する情報）</h2>
        <p>本アプリでは、利用者の氏名、住所、電話番号、メールアドレス等の個人を特定できる情報は取得しません。</p>
        <p>ただし、本アプリの提供に伴い、以下の情報が自動的に取得される場合があります。</p>
        <ol className="list-decimal list-inside pl-4">
          <li>IPアドレス</li>
          <li>端末の種類、OS、ブラウザ等の技術情報</li>
          <li>アクセス日時、閲覧ページ等の利用状況に関する情報</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">第2条（利用目的）</h2>
        <p>取得した情報は、以下の目的に限り利用します。</p>
        <ol className="list-decimal list-inside pl-4">
          <li>本アプリの安定的な提供および運用</li>
          <li>利用状況の分析およびサービス改善</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">第3条（蓄積データの共有）</h2>
        <p>前条の目的の範囲内において、アクセスログ等の蓄積データは、当館および本アプリ運営受託者との間で共有される場合があります。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第4条（第三者提供）</h2>
        <p>当館は、法令に基づく場合を除き、取得した情報を第三者に提供することはありません。第三者に提供する必要が生じた場合には、当館および本アプリ運営受託者の書面による同意を得るものとします。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第5条（安全管理）</h2>
        <p>当館は、取得した情報について、漏えい、滅失、毀損の防止その他適切な安全管理措置を講じます。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第6条（外部サービスの利用）</h2>
        <p>本アプリでは、利便性向上および品質改善のため、アクセス解析等の外部サービスを利用する場合があります。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第7条（本ポリシーの変更）</h2>
        <p>本ポリシーの内容は、必要に応じて予告なく変更されることがあります。変更後の内容は、本アプリまたは関連 Web サイト上に掲載された時点から効力を生じます。</p>
      </div>
    ),
  },
  en: {
    title: "Privacy Policy",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>The Kyoto Traditional Industry Museum (the &quot;Museum&quot;) sets forth the handling of user information in the &quot;Kyoto Traditional Industry Museum In-House Guide Browser Application&quot; (the &quot;Application&quot;) as follows.</p>
        <p>Part of the operation and management of this Application is entrusted by the Museum to Artisan Japan Co., Ltd.</p>
        <p className="font-semibold">This Privacy Policy is originally written in Japanese. In the event of any discrepancy or inconsistency between the Japanese version and any translated version, the Japanese version shall prevail.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 1 (Information Collected)</h2>
        <p>This Application does not collect personally identifiable information such as names, addresses, phone numbers, or email addresses.</p>
        <p>However, the following information may be automatically collected in connection with the provision of this Application:</p>
        <ol className="list-decimal list-inside pl-4">
          <li>IP address</li>
          <li>Device type, operating system, browser, and other technical information</li>
          <li>Access date and time, viewed pages, and other usage information</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 2 (Purpose of Use)</h2>
        <p>The collected information will be used solely for the following purposes:</p>
        <ol className="list-decimal list-inside pl-4">
          <li>Stable provision and operation of the Application</li>
          <li>Analysis of usage and service improvement</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 3 (Sharing of Stored Data)</h2>
        <p>Within the scope of the above purposes, accumulated data such as access logs may be shared between the Museum and the operator entrusted with managing this Application.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 4 (Provision to Third Parties)</h2>
        <p>The Museum will not provide collected information to third parties except as required by law. If it becomes necessary to provide such information to third parties, written consent will be obtained from both the Museum and the Application operator.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 5 (Security Management)</h2>
        <p>The Museum will take appropriate security measures to prevent leakage, loss, or damage of the collected information.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 6 (Use of External Services)</h2>
        <p>This Application may use external services such as access analytics to improve convenience and quality.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 7 (Changes to This Policy)</h2>
        <p>This Policy may be revised without prior notice as necessary. Any changes shall take effect upon publication on this Application or related websites.</p>
      </div>
    ),
  },
  zh: {
    title: "隐私政策",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>京都传统产业博物馆（以下简称&quot;本馆&quot;）就其提供的&quot;京都传统产业博物馆馆内导览浏览器应用&quot;（以下简称&quot;本应用&quot;）中用户信息的处理作出如下规定。</p>
        <p>本应用的部分运营与管理由本馆委托 Artisan Japan 株式会社负责。</p>
        <p className="font-semibold">本隐私政策以日文版本为正式文本。如日文版本与其他语言版本之间存在任何差异或不一致之处，均以日文版本为准。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第一条（收集的信息）</h2>
        <p>本应用不会收集可识别个人身份的信息，如姓名、地址、电话号码或电子邮箱地址。</p>
        <p>但在提供本应用过程中，可能会自动收集以下信息：</p>
        <ol className="list-decimal list-inside pl-4">
          <li>IP 地址</li>
          <li>设备类型、操作系统、浏览器等技术信息</li>
          <li>访问时间、浏览页面等使用情况信息</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">第二条（使用目的）</h2>
        <p>所收集的信息仅用于以下目的：</p>
        <ol className="list-decimal list-inside pl-4">
          <li>本应用的稳定提供与运营</li>
          <li>使用情况分析及服务改进</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">第三条（数据的共享）</h2>
        <p>在前述目的范围内，访问日志等累积数据可能会在本馆与本应用运营受托方之间共享。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第四条（向第三方提供）</h2>
        <p>除非基于法律法规要求，本馆不会向第三方提供所收集的信息。如确需向第三方提供信息，将事先取得本馆及本应用运营受托方的书面同意。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第五条（安全管理）</h2>
        <p>本馆将采取适当的安全管理措施，以防止所收集信息的泄露、丢失或损毁。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第六条（外部服务的使用）</h2>
        <p>本应用可能会使用访问分析等外部服务，以提升便利性和服务质量。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第七条（本政策的变更）</h2>
        <p>本政策可能会根据需要在不事先通知的情况下进行修改。修改后的内容自发布于本应用或相关网站之日起生效。</p>
      </div>
    ),
  },
  ko: {
    title: "개인정보 처리방침",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>교토 전통산업 박물관(이하 &quot;본관&quot;)은 &quot;교토 전통산업 박물관 관내 가이드 브라우저 앱&quot;(이하 &quot;본 앱&quot;)에서의 이용자 정보 처리에 대해 다음과 같이 정합니다.</p>
        <p>본 앱의 운영 및 관리 일부는 본관으로부터 위탁을 받은 Artisan Japan 주식회사가 담당합니다.</p>
        <p className="font-semibold">본 개인정보 처리방침은 일본어를 원문으로 합니다. 일본어판과 다른 언어판 간에 차이 또는 불일치가 발생하는 경우, 일본어판이 우선합니다.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">제1조 (수집하는 정보)</h2>
        <p>본 앱은 이름, 주소, 전화번호, 이메일 주소 등 개인을 식별할 수 있는 정보는 수집하지 않습니다.</p>
        <p>다만, 본 앱 제공과 관련하여 다음의 정보가 자동으로 수집될 수 있습니다.</p>
        <ol className="list-decimal list-inside pl-4">
          <li>IP 주소</li>
          <li>단말기 종류, 운영체제, 브라우저 등 기술 정보</li>
          <li>접속 일시, 열람 페이지 등 이용 현황 정보</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">제2조 (이용 목적)</h2>
        <p>수집된 정보는 다음 목적에 한하여 이용됩니다.</p>
        <ol className="list-decimal list-inside pl-4">
          <li>본 앱의 안정적인 제공 및 운영</li>
          <li>이용 현황 분석 및 서비스 개선</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">제3조 (데이터의 공유)</h2>
        <p>전조의 목적 범위 내에서, 접근 로그 등의 축적 데이터는 본관과 본 앱 운영 위탁자 간에 공유될 수 있습니다.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">제4조 (제3자 제공)</h2>
        <p>본관은 법령에 따른 경우를 제외하고, 수집한 정보를 제3자에게 제공하지 않습니다. 제3자 제공이 필요한 경우에는 본관 및 본 앱 운영 위탁자의 서면 동의를 얻습니다.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">제5조 (안전 관리)</h2>
        <p>본관은 수집한 정보의 유출, 분실, 훼손을 방지하기 위해 적절한 안전 관리 조치를 취합니다.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">제6조 (외부 서비스의 이용)</h2>
        <p>본 앱은 편의성 향상 및 품질 개선을 위해 접근 분석 등 외부 서비스를 이용할 수 있습니다.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">제7조 (본 방침의 변경)</h2>
        <p>본 방침의 내용은 필요에 따라 사전 고지 없이 변경될 수 있습니다. 변경된 내용은 본 앱 또는 관련 웹사이트에 게시된 시점부터 효력을 가집니다.</p>
      </div>
    ),
  },
  es: {
    title: "Política de Privacidad",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>El Museo de Industrias Tradicionales de Kioto (en adelante, el &quot;Museo&quot;) establece a continuación el tratamiento de la información de los usuarios en la &quot;Aplicación de Navegador de Guía Interna del Museo de Industrias Tradicionales de Kioto&quot; (en adelante, la &quot;Aplicación&quot;).</p>
        <p>Parte de la operación y gestión de esta Aplicación ha sido encomendada por el Museo a Artisan Japan Co., Ltd.</p>
        <p className="font-semibold">La presente Política de Privacidad ha sido redactada originalmente en japonés. En caso de discrepancia o conflicto entre la versión japonesa y cualquier versión en otro idioma, prevalecerá la versión japonesa.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 1 (Información recopilada)</h2>
        <p>Esta Aplicación no recopila información que permita identificar personalmente a los usuarios, como nombre, dirección, número de teléfono o correo electrónico.</p>
        <p>No obstante, durante la prestación de la Aplicación, puede recopilarse automáticamente la siguiente información:</p>
        <ol className="list-decimal list-inside pl-4">
          <li>Dirección IP</li>
          <li>Tipo de dispositivo, sistema operativo, navegador y otra información técnica</li>
          <li>Fecha y hora de acceso, páginas visitadas y otra información de uso</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 2 (Finalidad de uso)</h2>
        <p>La información recopilada se utilizará únicamente para los siguientes fines:</p>
        <ol className="list-decimal list-inside pl-4">
          <li>Prestación y operación estable de la Aplicación</li>
          <li>Análisis del uso y mejora del servicio</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 3 (Compartición de datos)</h2>
        <p>Dentro del alcance de las finalidades anteriores, los datos acumulados, como los registros de acceso, podrán compartirse entre el Museo y el operador de la Aplicación.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 4 (Provisión a terceros)</h2>
        <p>El Museo no proporcionará la información recopilada a terceros, salvo que lo exija la legislación aplicable. Si fuera necesario proporcionar información a terceros, se obtendrá el consentimiento por escrito del Museo y del operador de la Aplicación.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 5 (Gestión de la seguridad)</h2>
        <p>El Museo adoptará medidas de seguridad adecuadas para evitar la divulgación, pérdida o daño de la información recopilada.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 6 (Uso de servicios externos)</h2>
        <p>La Aplicación podrá utilizar servicios externos, como herramientas de análisis de acceso, con el fin de mejorar la comodidad y la calidad.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 7 (Modificaciones de esta política)</h2>
        <p>El contenido de esta Política podrá modificarse según sea necesario sin previo aviso. Las modificaciones entrarán en vigor en el momento de su publicación en la Aplicación o en los sitios web relacionados.</p>
      </div>
    ),
  },
  fr: {
    title: "Politique de Confidentialité",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>Le Musée des industries traditionnelles de Kyoto (ci-après le &quot;Musée&quot;) définit comme suit le traitement des informations des utilisateurs dans l&apos;&quot;Application navigateur de guide interne du Musée des industries traditionnelles de Kyoto&quot; (ci-après l&apos;&quot;Application&quot;).</p>
        <p>Une partie de l&apos;exploitation et de la gestion de cette Application est confiée par le Musée à Artisan Japan Co., Ltd.</p>
        <p className="font-semibold">La présente politique de confidentialité est rédigée en japonais. En cas de divergence ou d&apos;incohérence entre la version japonaise et toute version traduite, la version japonaise prévaudra.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 1 (Informations collectées)</h2>
        <p>Cette Application ne collecte aucune information permettant d&apos;identifier personnellement les utilisateurs, telles que le nom, l&apos;adresse, le numéro de téléphone ou l&apos;adresse e-mail.</p>
        <p>Toutefois, les informations suivantes peuvent être collectées automatiquement lors de l&apos;utilisation de l&apos;Application :</p>
        <ol className="list-decimal list-inside pl-4">
          <li>Adresse IP</li>
          <li>Type d&apos;appareil, système d&apos;exploitation, navigateur et autres informations techniques</li>
          <li>Date et heure d&apos;accès, pages consultées et autres informations d&apos;utilisation</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 2 (Finalités d&apos;utilisation)</h2>
        <p>Les informations collectées sont utilisées uniquement aux fins suivantes :</p>
        <ol className="list-decimal list-inside pl-4">
          <li>Fourniture et exploitation stables de l&apos;Application</li>
          <li>Analyse de l&apos;utilisation et amélioration des services</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 3 (Partage des données)</h2>
        <p>Dans la limite des finalités susmentionnées, les données accumulées telles que les journaux d&apos;accès peuvent être partagées entre le Musée et l&apos;opérateur de l&apos;Application.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 4 (Communication à des tiers)</h2>
        <p>Le Musée ne fournira pas les informations collectées à des tiers, sauf obligation légale. Si une communication à des tiers s&apos;avère nécessaire, le consentement écrit du Musée et de l&apos;opérateur de l&apos;Application sera obtenu.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 5 (Gestion de la sécurité)</h2>
        <p>Le Musée prendra des mesures de sécurité appropriées afin d&apos;empêcher toute fuite, perte ou détérioration des informations collectées.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 6 (Utilisation de services externes)</h2>
        <p>L&apos;Application peut utiliser des services externes, tels que l&apos;analyse d&apos;accès, afin d&apos;améliorer la commodité et la qualité.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 7 (Modification de la présente politique)</h2>
        <p>La présente politique peut être modifiée sans préavis si nécessaire. Les modifications prendront effet dès leur publication sur l&apos;Application ou les sites web associés.</p>
      </div>
    ),
  },
};

export default function PrivacyPage() {
  const { userProfile } = useUser();
  const lang: UserLanguage = userProfile?.language ?? "ja";
  const { title, content } = privacyContent[lang];

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <section lang={lang}>
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        {content}
      </section>
    </main>
  );
}
