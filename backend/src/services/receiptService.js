/** NOTE:
 * 
 *  What happens during receipt generation?
    1. The API reads the order from MongoDB.
    2. It checks the order status.
    3. PDFDocument.create() creates a PDF in memory.
    4. addPage() creates the receipt page.
    5. drawText() writes the order information.
    6. pdf.save() returns the PDF bytes.
    7. Express returns those bytes with Content-Type: application/pdf.
    8. The browser can download the file using the Content-Disposition filename.
 * 
 * This simple template uses standard Helvetica fonts, which are suitable for basic English receipts. If your receipt needs Bengali text, you'll need to embed a compatible Bengali Unicode font and test the rendered glyphs.

 * For large orders, add pagination instead of returning the current demo's "too many items" response. Also, consider adding your business name, contact details, receipt number, date, tax information if applicable, and a payment reference field.

 */

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import Order from "../models/Order.js";

export async function downloadReceipt(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    if (order.orderStatus !== "CONFIRMED") {
      return res.status(409).json({
        message: "Confirm the order before generating a receipt"
      });
    }

    const pdf = await PDFDocument.create();

    const page = pdf.addPage([595.28, 841.89]);
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);

    const { height } = page.getSize();

    const draw = (text, x, y, options = {}) => {
      page.drawText(String(text), {
        x,
        y,
        size: options.size || 11,
        font: options.bold ? boldFont : font,
        color: rgb(0.12, 0.15, 0.18)
      });
    };

    draw("NILUS KITCHEN", 50, height - 55, {
      size: 22,
      bold: true
    });

    draw("ORDER RECEIPT", 50, height - 80, {
      size: 13,
      bold: true
    });

    draw(`Order ID: ${order.orderId}`, 50, height - 115);
    draw(`Customer: ${order.customerName}`, 50, height - 135);
    draw(`Phone: ${order.customerPhone}`, 50, height - 155);
    draw(`Address: ${order.deliveryAddress}`, 50, height - 175);

    let y = height - 220;

    draw("Item", 50, y, { bold: true });
    draw("Qty", 325, y, { bold: true });
    draw("Price", 390, y, { bold: true });
    draw("Total", 475, y, { bold: true });

    y -= 12;

    page.drawLine({
      start: { x: 50, y },
      end: { x: 545, y },
      thickness: 1,
      color: rgb(0.75, 0.75, 0.75)
    });

    y -= 25;

    for (const item of order.items) {
      if (y < 120) {
        return res.status(422).json({
          message: "Receipt has too many items for this demo template"
        });
      }

      draw(item.name.slice(0, 35), 50, y);
      draw(`${item.quantity} ${item.unit}`, 325, y);
      draw(`Tk ${item.unitPrice.toFixed(2)}`, 390, y);
      draw(`Tk ${item.lineTotal.toFixed(2)}`, 475, y);

      y -= 23;
    }

    y -= 10;

    draw(`Subtotal: Tk ${order.subtotal.toFixed(2)}`, 350, y);
    y -= 20;

    draw(`Delivery: Tk ${order.deliveryCharge.toFixed(2)}`, 350, y);
    y -= 20;

    draw(`Discount: Tk ${order.discount.toFixed(2)}`, 350, y);
    y -= 25;

    draw(`TOTAL: Tk ${order.grandTotal.toFixed(2)}`, 350, y, {
      size: 14,
      bold: true
    });

    y -= 35;

    draw(`Payment: ${order.paymentMethod}`, 50, y);
    y -= 20;

    draw(`Status: ${order.orderStatus}`, 50, y);
    y -= 35;

    draw("Thank you for ordering from Nilus Kitchen!", 50, y);

    const pdfBytes = await pdf.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${order.orderId}.pdf"`
    );

    return res.send(Buffer.from(pdfBytes));
  } catch (error) {
    next(error);
  }
}