<template>
  <div>
    <h1 class="mb-6">Datenschutzerklärung</h1>
    <h2 class="text-lg xl:text-xl mb-4">Allgemeiner Hinweis und Pflichtinformationen</h2>
    <p class="mb-4">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
    <p class="mb-1">Joswig Solutions UG (haftungsbeschränkt)</p>
    <p class="mb-1">Schaperstraße 14</p>
    <p class="mb-4">10719 Berlin</p>
    <p class="mb-4">E-Mail: support@traumanwalt.com</p>
    <p class="mb-6">Die verantwortliche Stelle entscheidet allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, Kontaktdaten o. Ä.).</p>
    <h2 class="text-lg xl:text-xl mb-4">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h2>
    <p class="mb-6">Nur mit Ihrer ausdrücklichen Einwilligung sind einige Vorgänge der Datenverarbeitung möglich. Ein Widerruf Ihrer bereits erteilten Einwilligung ist jederzeit möglich. Für den Widerruf genügt eine formlose Mitteilung per E-Mail. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.</p>
    <h2 class="text-lg xl:text-xl mb-4">Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde</h2>
    <p class="mb-6">Als Betroffener steht Ihnen im Falle eines datenschutzrechtlichen Verstoßes ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde bezüglich datenschutzrechtlicher Fragen ist der Landesdatenschutzbeauftragte des Bundeslandes, in dem sich der Sitz unseres Unternehmens befindet. Der folgende Link stellt eine Liste der Datenschutzbeauftragten sowie deren Kontaktdaten bereit: <a href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html">https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html</a>.</p>
    <h2 class="text-lg xl:text-xl mb-4">Recht auf Datenübertragbarkeit</h2>
    <p class="mb-6">Ihnen steht das Recht zu, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an Dritte aushändigen zu lassen. Die Bereitstellung erfolgt in einem maschinenlesbaren Format. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.</p>
    <h2 class="text-lg xl:text-xl mb-4">Recht auf Auskunft, Berichtigung, Sperrung, Löschung</h2>
    <p class="mb-6">Sie haben jederzeit im Rahmen der geltenden gesetzlichen Bestimmungen das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, Herkunft der Daten, deren Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Diesbezüglich und auch zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit über die im Impressum aufgeführten Kontaktmöglichkeiten an uns wenden.</p>
    <h2 class="text-lg xl:text-xl mb-4">SSL- bzw. TLS-Verschlüsselung</h2>
    <p>Aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, die Sie an uns als Seitenbetreiber senden, nutzt unsere Website eine SSL-bzw. TLS-Verschlüsselung. Damit sind Daten, die Sie über diese Website übermitteln, für Dritte nicht mitlesbar. Sie erkennen eine verschlüsselte Verbindung an der „https://“ Adresszeile Ihres Browsers und am Schloss-Symbol in der Browserzeile.</p>
  </div>
</template>

<script>
export default {
  name: 'DatenschutzPage',
  head() {
    return {
      title: 'Datenschutzerklärung - Traumanwalt',
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ]
    }
  }
}
</script>