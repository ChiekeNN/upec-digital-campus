"use client";

import {
  LayoutDashboard,
  Receipt,
  CreditCard,
  Wallet,
  FileText,
  Activity,
  TrendingUp,
  CheckCircle2,
  Clock,
} from "lucide-react";
import DepartmentDashboard, { Tab } from "@/components/DepartmentDashboard";

const stats = [
  { label: "Total Revenue", value: "₦4.2M", icon: TrendingUp, color: "bg-[#003b73]" },
  { label: "Pending Invoices", value: 18, icon: Receipt, color: "bg-[#0070c9]" },
  { label: "Fee Payments", value: 124, icon: CreditCard, color: "bg-[#f7b733]" },
  { label: "Payroll Due", value: "₦1.1M", icon: Wallet, color: "bg-emerald-500" },
];

const invoices = [
  { ref: "INV-001", student: "Adaeze Nwosu", amount: "₦35,000", status: "Paid", date: "2026-10-12" },
  { ref: "INV-002", student: "David Eze", amount: "₦45,000", status: "Pending", date: "2026-10-11" },
  { ref: "INV-003", student: "Blessing T.", amount: "₦50,000", status: "Overdue", date: "2026-10-05" },
  { ref: "INV-004", student: "Chidi Okoro", amount: "₦25,000", status: "Paid", date: "2026-10-09" },
];

const payments = [
  { ref: "PAY-101", student: "Adaeze Nwosu", programme: "Digital Entrepreneurship", amount: "₦35,000", method: "Bank Transfer", date: "2026-10-12" },
  { ref: "PAY-102", student: "Chidi Okoro", programme: "Postgraduate (PGD)", amount: "₦25,000", method: "Card", date: "2026-10-09" },
  { ref: "PAY-103", student: "Blessing T.", programme: "Agribusiness", amount: "₦50,000", method: "Cash", date: "2026-10-05" },
];

const payroll = [
  { staff: "Dr. Henry Wobo", role: "Director", amount: "₦450,000", status: "Paid" },
  { staff: "Mrs. Gloria Chindah", role: "Registrar", amount: "₦320,000", status: "Paid" },
  { staff: "Mr. Chidi Okoro", role: "IT Officer", amount: "₦210,000", status: "Pending" },
  { staff: "Ms. Amaka Nwosu", role: "Finance Officer", amount: "₦230,000", status: "Paid" },
];

const expenses = [
  { item: "Office Supplies", category: "Operations", amount: "₦45,000", status: "Approved" },
  { item: "Generator Fuel", category: "Utilities", amount: "₦120,000", status: "Approved" },
  { item: "Training Materials", category: "Programme", amount: "₦80,000", status: "Pending" },
  { item: "Maintenance (Hall A)", category: "Facilities", amount: "₦60,000", status: "Pending" },
];

const reconciliation = [
  { account: "Main Operating Account", balance: "₦2,450,000", status: "Reconciled" },
  { account: "Fee Collection Account", balance: "₦1,750,000", status: "Reconciled" },
  { account: "Payroll Account", balance: "₦320,000", status: "Pending" },
];

function StatCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.label} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className={`grid h-12 w-12 place-items-center rounded-xl ${s.color} text-white`}>
              <Icon size={24} />
            </div>
            <p className="mt-5 text-3xl font-black text-[#003b73]">{s.value}</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">{s.label}</p>
          </div>
        );
      })}
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
            {headers.map((h) => (
              <th key={h} className="pb-3 pr-4 font-bold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-slate-50 last:border-0">
              {r.map((c, j) => (
                <td key={j} className="py-3 pr-4 text-slate-700">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function FinanceDashboard() {
  const tabs: Tab[] = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      content: (
        <div className="space-y-6">
          <StatCards />
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-[#003b73]">Recent Payments</h2>
            <ul className="mt-4 space-y-3">
              {payments.map((p) => (
                <li key={p.ref} className="flex items-center justify-between rounded-xl bg-[#f7fbff] px-4 py-3">
                  <div>
                    <p className="text-sm font-bold text-[#003b73]">{p.student}</p>
                    <p className="text-xs text-slate-500">{p.programme} · {p.date}</p>
                  </div>
                  <span className="text-sm font-black text-[#003b73]">{p.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "invoices",
      label: "Invoices",
      icon: Receipt,
      content: (
        <Table
          headers={["Reference", "Student", "Amount", "Status", "Date"]}
          rows={invoices.map((i) => [i.ref, i.student, i.amount, i.status, i.date])}
        />
      ),
    },
    {
      id: "payments",
      label: "Fee Payments",
      icon: CreditCard,
      content: (
        <Table
          headers={["Reference", "Student", "Programme", "Amount", "Method", "Date"]}
          rows={payments.map((p) => [p.ref, p.student, p.programme, p.amount, p.method, p.date])}
        />
      ),
    },
    {
      id: "payroll",
      label: "Payroll",
      icon: Wallet,
      content: (
        <Table
          headers={["Staff", "Role", "Amount", "Status"]}
          rows={payroll.map((p) => [p.staff, p.role, p.amount, p.status])}
        />
      ),
    },
    {
      id: "expenses",
      label: "Expenses",
      icon: FileText,
      content: (
        <Table
          headers={["Item", "Category", "Amount", "Status"]}
          rows={expenses.map((e) => [e.item, e.category, e.amount, e.status])}
        />
      ),
    },
    {
      id: "reconciliation",
      label: "Reconciliation",
      icon: Activity,
      content: (
        <Table
          headers={["Account", "Balance", "Status"]}
          rows={reconciliation.map((r) => [r.account, r.balance, r.status])}
        />
      ),
    },
  ];

  return (
    <DepartmentDashboard
      title="Finance Officer Console"
      subtitle="Manage invoices, fee payments, payroll, expenses and reconciliation."
      tabs={tabs}
    />
  );
}
