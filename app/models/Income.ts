import mongoose, { Schema, Document } from 'mongoose';

// Income：这是 TypeScript 接口，定义了收入对象的结构。它主要用于类型检查和代码提示。
export interface Income extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  date: Date;
  amount: number;
  note: string | null;
  bonus: number;
  personalIncomeTax: number;
  socialInsurance: number;
  [key: string]: any;
  // 在这里添加新字段
}

// columnDisplayNames：这个对象将 Income 的字段名映射到它们的显示名称。主要用于 UI 展示。
export const columnDisplayNames: Record<keyof Income, string> = {
  _id: 'ID',
  userId: '用户ID',
  date: '时间',
  amount: '收入金额',
  note: '备注',
  bonus: '奖金',
  personalIncomeTax: '个人所得税',
  socialInsurance: '社会保险'
  // 在这里添加新字段的显示名称
};

// IncomeSchema：这是 Mongoose schema，定义了数据如何在 MongoDB 中存储。
const IncomeSchema: Schema = new Schema<Income>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  note: { type: String, default: null },
  bonus: { type: Number, default: 0 },
  personalIncomeTax: { type: Number, default: 0 },
  socialInsurance: { type: Number, default: 0 }
}, {
  timestamps: true,
  strict: false // 允许添加未在 schema 中定义的字段
});

const IncomeModel = mongoose.models.Income || mongoose.model<Income>('Income', IncomeSchema);

export default IncomeModel;