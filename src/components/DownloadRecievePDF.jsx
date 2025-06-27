import { Icon } from "@iconify/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function DownloadRecievePDF({ targetRef, orderId }) {
  const handleDownload = async () => {
    if (!targetRef.current) return;

    const element = targetRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      ignoreElements: (el) => el.classList.contains('no-print'),
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeightPage = pdf.internal.pageSize.getHeight();
    const pdfHeightImage = (canvas.height * pdfWidth) / canvas.width;

    const scale = 0.7;
    const imgWidth = pdfWidth * scale;
    const imgHeight = pdfHeightImage * scale;

    const x = (pdfWidth - imgWidth) / 2;
    const y = (pdfHeightPage - imgHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    pdf.save(`boleta_pedido_${orderId}.pdf`);
  };


  return (
    <button
      className="download-button no-print"
      onClick={handleDownload}
      type="button"
      title="Descargar boleta PDF"
    >
      <Icon icon="mdi:download" width="20" height="20" style={{ marginRight: 6 }} />
      Descargar PDF
    </button>
  );
}
