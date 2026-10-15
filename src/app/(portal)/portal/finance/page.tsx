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
import CrudManager from "@/components/CrudManager";

const stats = [
  { label: "Total Revenue", value: "₦4.2M", icon: TrendingUp, color: "bg-[#003b73]" },
  { label: "Pending Invoices", value: 18, icon: Receipt, color: "bg-[#0070c9]" },
  { label: "Fee Payments", value: 124, icon: CreditCard, color: "bg-[#f7b733]" },
  { label: "Payroll Due", value: "₦1.1M", icon: Wallet, color: "bg-emerald-500" },
];

const invoicesInitial = [
  { id: 1, ref: "INV-001", student: "Adaeze Nwosu", amount: "₦35,000", status: "Paid", date: "2026-10-12" },
  { id: 2, ref: "INV-002", student: "David Eze", amount: "₦45,000", status: "Pending", date: "2026-10-11" },
  { id: 3, ref: "INV-003", student: "Blessing T.", amount: "₦50,000", status: "Overdue", date: "2026-10-05" },
  { id: 4, ref: "INV-004", student: "Chidi Okoro", amount: "₦25,000", status: "Paid", date: "2026-10-09" },
];

const paymentsInitial = [
  { id: 1, ref: "PAY-101", student: "Adaeze Nwosu", programme: "Digital Entrepreneurship", amount: "₦35,000", method: "Bank Transfer", date: "2026-10-12" },
  { id: 2, ref: "PAY-102", student: "Chidi Okoro", programme: "Postgraduate (PGD)", amount: "₦25,000", method: "Card", date: "2026-10-09" },
  { id: 3, ref: "PAY-103", student: "Blessing T.", programme: "Agribusiness", amount: "₦50,000", method: "Cash", date: "2026-10-05" },
];

const payrollInitial = [
  { id: 1, staff: "Dr. Henry Wobo", role: "Director", amount: "₦450,000", status: "Paid" },
  { id: 2, staff: "Mrs. Gloria Chindah", role: "Registrar", amount: "₦320,000", status: "Paid" },
  { id: 3, staff: "Mr. Chidi Okoro", role: "IT Officer", amount: "₦210,000", status: "Pending" },
  { id: 4, staff: "Ms. Amaka Nwosu", role: "Finance Officer", amount: "₦230,000", status: "Paid" },
];

const expensesInitial = [
  { id: 1, item: "Office Supplies", category: "Operations", amount: "₦45,000", status: "Approved" },
  { id: 2, item: "Generator Fuel", category: "Utilities", amount: "₦120,000", status: "Approved" },
  { id: 3, item: "Training Materials", category: "Programme", amount: "₦80,000", status: "Pending" },
  { id: 4, item: "Maintenance (Hall A)", category: "Facilities", amount: "₦60,000", status: "Pending" },
];

const reconciliationInitial = [
  { id: 1, account: "Main Operating Account", balance: "₦2,450,000", status: "Reconciled" },
  { id: 2, account: "Fee Collection Account", balance: "₦1,750,000", status: "Reconciled" },
  { id: 3, account: "Payroll Account", balance: "₦320,000", status: "Pending" },
];

export default function FinanceDashboard() {
  const tabs: Tab[] = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      content: (
        <div className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full ${s.color} opacity-10 transition group-hover:scale-125`} />
                  <div className={`grid h-12 w-12 place-items-center rounded-xl ${s.color} text-white shadow-md`}>
                    <Icon size={24} />
                  </div>
                  <p className="mt-5 text-3xl font-black text-[#003b73]">{s.value}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">{s.label}</p>
                </div>
              );
            })}
          </div>
          <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-blue-50 p-6 shadow-sm">
            <h2 className="text-lg font-black text-[#003b73]">Recent Payments</h2>
            <ul className="mt-4 space-y-3">
              {paymentsInitial.map((p) => (
                <li key={p.id} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
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
        <CrudManager
          title="Invoices"
          subtitle="Student and programme invoices."
          columns={[
            { key: "ref", label: "Reference" },
            { key: "student", label: "Student" },
            { key: "amount", label: "Amount" },
            { key: "status", label: "Status", type: "select", options: ["Paid", "Pending", "Overdue", "Cancelled"] },
            { key: "date", label: "Date", type: "date" },
          ]}
          initialRows={invoicesInitial}
          storageKey="upec_finance_invoices"
          accent="from-[#003b73] to-[#0070c9]"
          addLabel="New Invoice"
        />
      ),
    },
    {
      id: "payments",
      label: "Fee Payments",
      icon: CreditCard,
      content: (
        <CrudManager
          title="Fee Payments"
          subtitle="Recorded fee payments."
          columns={[
            { key: "ref", label: "Reference" },
            { key: "student", label: "Student" },
            { key: "programme", label: "Programme" },
            { key: "amount", label: "Amount" },
            { key: "method", label: "Method", type: "select", options: ["Bank Transfer", "Card", "Cash", "Cheque"] },
            { key: "date", label: "Date", type: "date" },
          ]}
          initialRows={paymentsInitial}
          storageKey="upec_finance_payments"
          accent="from-[#0070c9] to-[#84c7ff]"
          addLabel="Record Payment"
        />
      ),
    },
    {
      id: "payroll",
      label: "Payroll",
      icon: Wallet,
      content: (
        <CrudManager
          title="Payroll"
          subtitle="Staff payroll records."
          columns={[
            { key: "staff", label: "Staff" },
            { key: "role", label: "Role" },
            { key: "amount", label: "Amount" },
            { key: "status", label: "Status", type: "select", options: ["Paid", "Pending", "On Hold"] },
          ]}
          initialRows={payrollInitial}
          storageKey="upec_finance_payroll"
          accent="from-[#f7b733] to-[#f59e0b]"
          addLabel="Add Payroll"
        />
      ),
    },
    {
      id: "expenses",
      label: "Expenses",
      icon: FileText,
      content: (
        <CrudManager
          title="Expenses"
          subtitle="Operational expenses and approvals."
          columns={[
            { key: "item", label: "Item" },
            { key: "category", label: "Category", type: "select", options: ["Operations", "Utilities", "Programme", "Facilities", "Travel"] },
            { key: "amount", label: "Amount" },
            { key: "status", label: "Status", type: "select", options: ["Pending", "Approved", "Rejected"] },
          ]}
          initialRows={expensesInitial}
          storageKey="upec_finance_expenses"
          accent="from-emerald-500 to-teal-500"
          addLabel="New Expense"
        />
      ),
    },
    {
      id: "reconciliation",
      label: "Reconciliation",
      icon: Activity,
      content: (
        <CrudManager
          title="Account Reconciliation"
          subtitle="Reconcile accounts and balances."
          columns={[
            { key: "account", label: "Account" },
            { key: "balance", label: "Balance" },
            { key: "status", label: "Status", type: "select", options: ["Reconciled", "Pending", "Discrepancy"] },
          ]}
          initialRows={reconciliationInitial}
          storageKey="upec_finance_recon"
          accent="from-purple-500 to-indigo-500"
          addLabel="Add Account"
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
