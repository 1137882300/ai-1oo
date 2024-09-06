import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import { Income } from '@/types'; // 确保导入正确的 Income 类型

export async function exportIncomesToWord(incomes: Income[]) {
  // 创建一个新的 Document
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({ text: "收入统计报告", heading: 'Heading1' }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph("用户ID")] }),
                new TableCell({ children: [new Paragraph("金额")] }),
                new TableCell({ children: [new Paragraph("日期")] }),
                new TableCell({ children: [new Paragraph("描述")] }),
              ],
            }),
            ...incomes.map(income => 
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph(income.userId)] }),
                  new TableCell({ children: [new Paragraph(income.amount.toString())] }),
                  new TableCell({ children: [new Paragraph(income.date)] }),
                  new TableCell({ children: [new Paragraph(income.description || '')] }),
                ],
              })
            ),
          ],
        }),
      ],
    }],
  });

  // 生成并保存文档
  try {
    const blob = await Packer.toBlob(doc);
    saveAs(blob, "收入统计报告.docx");
  } catch (error) {
    console.error('导出Word文档时出错:', error);
    throw new Error('导出Word文档失败');
  }
}