"use client";

import { useUser } from "@/contexts/UserContext";
import type { UserLanguage } from "@/types/types";

// 各言語のプライバシーポリシーコンテンツ
const privacyContent: Record<UserLanguage, { title: string; content: React.ReactNode }> = {
  ja: {
    title: "プライバシーポリシー",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>Artisan Japan 株式会社（以下「当社」といいます。）は、当社が提供する「京都伝統産業ミュージアム館内ガイド ブラウザアプリ」（以下「本アプリ」といいます。）における利用者情報の取扱いについて、以下のとおり定めます。</p>

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
        <p>前条の目的の範囲内において、アクセスログ等の蓄積データは、当社およびミュージアム運営者（株式会社京都産業振興センター）との間で共有される場合があります。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第4条（第三者提供）</h2>
        <p>当社は、法令に基づく場合を除き、取得した情報を第三者に提供することはありません。第三者に提供する必要が生じた場合には、当社およびミュージアム運営者の書面による同意を得るものとします。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第5条（安全管理）</h2>
        <p>当社は、取得した情報について、漏えい、滅失、毀損の防止その他適切な安全管理措置を講じます。</p>

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
        <p>Artisan Japan Inc. (hereinafter referred to as the &quot;Company&quot;) establishes the following regarding the handling of user information in the &quot;Kyoto Museum of Crafts and Design In-Museum Guide Browser App&quot; (hereinafter referred to as the &quot;App&quot;) provided by the Company.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 1 (Information Collected)</h2>
        <p>The App does not collect personally identifiable information such as the user&apos;s name, address, telephone number, or email address.</p>
        <p>However, the following information may be automatically collected in conjunction with the provision of the App:</p>
        <ol className="list-decimal list-inside pl-4">
          <li>IP address</li>
          <li>Technical information such as device type, OS, and browser</li>
          <li>Information regarding usage status such as access date/time and viewed pages</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 2 (Purpose of Use)</h2>
        <p>The collected information will be used only for the following purposes:</p>
        <ol className="list-decimal list-inside pl-4">
          <li>Stable provision and operation of the App</li>
          <li>Analysis of usage status and service improvement</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 3 (Sharing of Accumulated Data)</h2>
        <p>Within the scope of the purposes in the preceding article, accumulated data such as access logs may be shared between the Company and the Museum operator (Kyoto Industry Promotion Center).</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 4 (Provision to Third Parties)</h2>
        <p>The Company will not provide collected information to third parties except as required by law. If it becomes necessary to provide it to a third party, the written consent of the Company and the Museum operator shall be obtained.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 5 (Security Management)</h2>
        <p>The Company will take appropriate security management measures to prevent leakage, loss, or damage of the collected information.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 6 (Use of External Services)</h2>
        <p>The App may use external services such as access analysis to improve convenience and quality.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 7 (Changes to this Policy)</h2>
        <p>The content of this policy may be changed without notice as necessary. The changed content shall take effect from the time it is posted on the App or related websites.</p>
      </div>
    ),
  },
  zh: {
    title: "隐私政策",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>Artisan Japan株式会社（以下简称&quot;本公司&quot;）就本公司提供的&quot;京都传统产业博物馆馆内指南浏览器应用程序&quot;（以下简称&quot;本应用程序&quot;）中用户信息的处理，制定如下规定。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第1条（获取的信息）</h2>
        <p>本应用程序不获取用户的姓名、地址、电话号码、电子邮件地址等可识别个人的信息。</p>
        <p>但是，随着本应用程序的提供，可能会自动获取以下信息：</p>
        <ol className="list-decimal list-inside pl-4">
          <li>IP地址</li>
          <li>终端类型、操作系统、浏览器等技术信息</li>
          <li>访问日期时间、浏览页面等使用状况相关信息</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">第2条（使用目的）</h2>
        <p>获取的信息仅用于以下目的：</p>
        <ol className="list-decimal list-inside pl-4">
          <li>本应用程序的稳定提供及运营</li>
          <li>使用状况分析及服务改善</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">第3条（积累数据的共享）</h2>
        <p>在前条目的范围内，访问日志等积累数据可能会在本公司及博物馆运营方（株式会社京都产业振兴中心）之间共享。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第4条（提供给第三方）</h2>
        <p>除法律法规规定的情况外，本公司不会将获取的信息提供给第三方。如需向第三方提供，应征得本公司及博物馆运营方的书面同意。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第5条（安全管理）</h2>
        <p>本公司将采取防止泄漏、灭失、毁损及其他适当的安全管理措施来管理获取的信息。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第6条（使用外部服务）</h2>
        <p>本应用程序为了提高便利性及改善质量，可能会使用访问分析等外部服务。</p>

        <h2 className="text-xl font-bold mt-6 mb-2">第7条（本政策的变更）</h2>
        <p>本政策的内容可能会根据需要不经预告而变更。变更后的内容自发布在本应用程序或相关网站上之时起生效。</p>
      </div>
    ),
  },
  ko: {
    title: "개인정보 처리방침",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>Artisan Japan 주식회사(이하 &apos;당사&apos;라 합니다)는 당사가 제공하는 &apos;교토 전통산업 뮤지엄 관내 가이드 브라우저 앱&apos;(이하 &apos;본 앱&apos;이라 합니다)에서의 이용자 정보 취급에 대해 다음과 같이 정합니다.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">제1조 (수집하는 정보)</h2>
        <p>본 앱에서는 이용자의 성명, 주소, 전화번호, 이메일 주소 등 개인을 특정할 수 있는 정보는 수집하지 않습니다.</p>
        <p>단, 본 앱의 제공에 따라 다음의 정보가 자동으로 수집될 수 있습니다.</p>
        <ol className="list-decimal list-inside pl-4">
          <li>IP 주소</li>
          <li>단말기 종류, OS, 브라우저 등의 기술 정보</li>
          <li>접속 일시, 열람 페이지 등의 이용 현황에 관한 정보</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">제2조 (이용 목적)</h2>
        <p>수집된 정보는 다음의 목적에 한하여 이용합니다.</p>
        <ol className="list-decimal list-inside pl-4">
          <li>본 앱의 안정적인 제공 및 운영</li>
          <li>이용 현황 분석 및 서비스 개선</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">제3조 (축적 데이터의 공유)</h2>
        <p>전조의 목적 범위 내에서 접속 로그 등의 축적 데이터는 당사 및 뮤지엄 운영자(주식회사 교토산업진흥센터) 간에 공유될 수 있습니다.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">제4조 (제3자 제공)</h2>
        <p>당사는 법령에 근거하는 경우를 제외하고 수집된 정보를 제3자에게 제공하지 않습니다. 제3자에게 제공할 필요가 생긴 경우에는 당사 및 뮤지엄 운영자의 서면에 의한 동의를 얻어야 합니다.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">제5조 (안전 관리)</h2>
        <p>당사는 수집된 정보에 대해 누출, 멸실, 훼손 방지 기타 적절한 안전 관리 조치를 강구합니다.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">제6조 (외부 서비스의 이용)</h2>
        <p>본 앱에서는 편의성 향상 및 품질 개선을 위해 접속 분석 등의 외부 서비스를 이용하는 경우가 있습니다.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">제7조 (본 방침의 변경)</h2>
        <p>본 방침의 내용은 필요에 따라 예고 없이 변경될 수 있습니다. 변경 후의 내용은 본 앱 또는 관련 웹 사이트상에 게재된 시점부터 효력을 발생합니다.</p>
      </div>
    ),
  },
  es: {
    title: "Política de Privacidad",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>Artisan Japan Inc. (en adelante, &quot;la Compañía&quot;) establece lo siguiente con respecto al manejo de la información del usuario en la &quot;Aplicación de Guía del Museo de Artesanía Tradicional de Kioto&quot; (en adelante, &quot;la Aplicación&quot;) proporcionada por la Compañía.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 1 (Información Recopilada)</h2>
        <p>La Aplicación no recopila información de identificación personal como el nombre, la dirección, el número de teléfono o la dirección de correo electrónico del usuario.</p>
        <p>Sin embargo, la siguiente información puede recopilarse automáticamente junto con la provisión de la Aplicación:</p>
        <ol className="list-decimal list-inside pl-4">
          <li>Dirección IP</li>
          <li>Información técnica como tipo de dispositivo, sistema operativo y navegador</li>
          <li>Información sobre el estado de uso, como fecha/hora de acceso y páginas visitadas</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 2 (Propósito de Uso)</h2>
        <p>La información recopilada se utilizará únicamente para los siguientes propósitos:</p>
        <ol className="list-decimal list-inside pl-4">
          <li>Provisión estable y funcionamiento de la Aplicación</li>
          <li>Análisis del estado de uso y mejora del servicio</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 3 (Intercambio de Datos Acumulados)</h2>
        <p>Dentro del alcance de los propósitos del artículo anterior, los datos acumulados, como los registros de acceso, pueden compartirse entre la Compañía y el operador del Museo (Centro de Promoción Industrial de Kioto).</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 4 (Provisión a Terceros)</h2>
        <p>La Compañía no proporcionará la información recopilada a terceros, excepto cuando lo exija la ley. Si fuera necesario proporcionarla a un tercero, se obtendrá el consentimiento por escrito de la Compañía y del operador del Museo.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 5 (Gestión de Seguridad)</h2>
        <p>La Compañía tomará las medidas de gestión de seguridad adecuadas para evitar la fuga, pérdida o daño de la información recopilada.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 6 (Uso de Servicios Externos)</h2>
        <p>La Aplicación puede utilizar servicios externos, como análisis de acceso, para mejorar la conveniencia y la calidad.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Artículo 7 (Cambios en esta Política)</h2>
        <p>El contenido de esta política puede cambiarse sin previo aviso según sea necesario. El contenido modificado entrará en vigor desde el momento en que se publique en la Aplicación o en los sitios web relacionados.</p>
      </div>
    ),
  },
  fr: {
    title: "Politique de Confidentialité",
    content: (
      <div className="space-y-4 text-gray-800">
        <p>Artisan Japan Inc. (ci-après dénommée la &quot;Société&quot;) établit ce qui suit concernant le traitement des informations utilisateur dans l&apos;&quot;Application Guide du Musée des Arts et Métiers Traditionnels de Kyoto&quot; (ci-après dénommée l&apos;&quot;Application&quot;) fournie par la Société.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 1 (Informations collectées)</h2>
        <p>L&apos;Application ne collecte pas d&apos;informations personnelles identifiables telles que le nom, l&apos;adresse, le numéro de téléphone ou l&apos;adresse e-mail de l&apos;utilisateur.</p>
        <p>Cependant, les informations suivantes peuvent être collectées automatiquement conjointement avec la fourniture de l&apos;Application :</p>
        <ol className="list-decimal list-inside pl-4">
          <li>Adresse IP</li>
          <li>Informations techniques telles que le type d&apos;appareil, le système d&apos;exploitation et le navigateur</li>
          <li>Informations concernant l&apos;état d&apos;utilisation telles que la date/l&apos;heure d&apos;accès et les pages consultées</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 2 (Objectif de l&apos;utilisation)</h2>
        <p>Les informations collectées ne seront utilisées qu&apos;aux fins suivantes :</p>
        <ol className="list-decimal list-inside pl-4">
          <li>Fourniture stable et fonctionnement de l&apos;Application</li>
          <li>Analyse de l&apos;état d&apos;utilisation et amélioration du service</li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 3 (Partage des données accumulées)</h2>
        <p>Dans le cadre des objectifs de l&apos;article précédent, les données accumulées telles que les journaux d&apos;accès peuvent être partagées entre la Société et l&apos;opérateur du Musée (Centre de Promotion Industrielle de Kyoto).</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 4 (Fourniture à des tiers)</h2>
        <p>La Société ne fournira pas les informations collectées à des tiers, sauf si la loi l&apos;exige. S&apos;il devient nécessaire de les fournir à un tiers, le consentement écrit de la Société et de l&apos;opérateur du Musée doit être obtenu.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 5 (Gestion de la sécurité)</h2>
        <p>La Société prendra des mesures de gestion de la sécurité appropriées pour empêcher la fuite, la perte ou l&apos;endommagement des informations collectées.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 6 (Utilisation de services externes)</h2>
        <p>L&apos;Application peut utiliser des services externes tels que l&apos;analyse d&apos;accès pour améliorer la commodité et la qualité.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">Article 7 (Modifications de cette politique)</h2>
        <p>Le contenu de cette politique peut être modifié sans préavis si nécessaire. Le contenu modifié prendra effet à partir du moment où il sera publié sur l&apos;Application ou les sites web connexes.</p>
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
