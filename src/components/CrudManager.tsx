"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  AlertTriangle,
  Download,
  Paperclip,
  Cloud,
  HardDrive,
} from "lucide-react";

export type Column = {
  key: string;
  label: string;
  type?: "text" | "number" | "select" | "date" | "textarea" | "email";
  options?: string[];
  width?: string;
};

export type Row = Record<string, any>;

type ModalMode = "view" | "edit" | "add" | null;

export default function CrudManager({
  title,
  subtitle,
  columns,
  initialRows,
  storageKey,
  accent = "from-[#003b73] to-[#0070c9]",
  addLabel = "Add New",
  emptyText = "No records yet.",
  canAdd = true,
  canEdit = true,
  canDelete = true,
  resource,
  reorderable = true,
  avatarKey,
  allowAttachments = true,
}: {
  title?: string;
  subtitle?: string;
  columns: Column[];
  initialRows: Row[];
  storageKey: string;
  accent?: string;
  addLabel?: string;
  emptyText?: string;
  canAdd?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  resource?: string;
  reorderable?: boolean;
  avatarKey?: string;
  allowAttachments?: boolean;
}) {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [loaded, setLoaded] = useState(false);
  const [apiMode, setApiMode] = useState<boolean>(!!resource);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalMode>(null);
  const [active, setActive] = useState<Row | null>(null);
  const [form, setForm] = useState<Row>({});
  const [confirmDelete, setConfirmDelete] = useState<Row | null>(null);
  const [toast, setToast] = useState<{ msg: string; kind: "success" | "error" } | null>(null);
  const [saving, setSaving] = useState(false);

  // Load data
  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (resource) {
        try {
          const res = await fetch(`/api/portal/records/${resource}`, { cache: "no-store" });
          const json = await res.json();
          if (!cancelled) {
            if (json?.success && Array.isArray(json.rows)) {
              let loadedRows = json.rows.length > 0 ? json.rows : initialRows;
              try {
                const orderRaw = localStorage.getItem(storageKey + "_order");
                if (orderRaw) {
                  const order = JSON.parse(orderRaw);
                  if (Array.isArray(order)) {
                    const map = new Map(loadedRows.map((r: any) => [r.id, r]));
                    const ordered = order.map((id: any) => map.get(id)).filter(Boolean);
                    const rest = loadedRows.filter((r: any) => !order.includes(r.id));
                    loadedRows = [...ordered, ...rest];
                  }
                }
              } catch {}
              setRows(loadedRows);
              setApiMode(true);
            } else {
              // fallback to localStorage
              loadLocal();
              setApiMode(false);
            }
          }
        } catch {
          if (!cancelled) {
            loadLocal();
            setApiMode(false);
          }
        }
      } else {
        loadLocal();
      }
      if (!cancelled) setLoaded(true);
    }
    function loadLocal() {
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length) setRows(parsed);
        }
      } catch {}
      // apply saved order
      try {
        const orderRaw = localStorage.getItem(storageKey + "_order");
        if (orderRaw) {
          const order = JSON.parse(orderRaw);
          setRows((prev) => {
            const map = new Map(prev.map((r) => [r.id, r]));
            const ordered = order.map((id: any) => map.get(id)).filter(Boolean);
            const rest = prev.filter((r) => !order.includes(r.id));
            return [...ordered, ...rest];
          });
        }
      } catch {}
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [resource, storageKey, initialRows]);

  // Persist to localStorage (only in local mode or as cache)
  useEffect(() => {
    if (loaded && !apiMode) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(rows));
      } catch {}
    }
  }, [rows, loaded, storageKey, apiMode]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const filtered = rows.filter((r) =>
    Object.values(r).some((v) =>
      String(v ?? "").toLowerCase().includes(search.toLowerCase()),
    ),
  );

  function openAdd() {
    const blank: Row = {};
    columns.forEach((c) => (blank[c.key] = ""));
    setForm(blank);
    setActive(null);
    setModal("add");
  }

  function openView(row: Row) {
    setActive(row);
    setForm({ ...row });
    setModal("view");
  }

  function openEdit(row: Row) {
    setActive(row);
    setForm({ ...row });
    setModal("edit");
  }

  async function saveForm() {
    if (avatarKey && !form[avatarKey]) {
      setToast({ msg: "Please upload a photo before saving.", kind: "error" });
      return;
    }
    setSaving(true);
    try {
      if (modal === "add") {
        if (apiMode && resource) {
          const res = await fetch(`/api/portal/records/${resource}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
          const json = await res.json();
          if (json?.success && json.row) {
            setRows((prev) => [json.row, ...prev]);
          } else {
            const newRow = { id: Date.now(), ...form };
            setRows((prev) => [newRow, ...prev]);
            if (!json?.success) setToast({ msg: "Saved locally (DB unavailable).", kind: "error" });
            else setToast({ msg: "Record added.", kind: "success" });
            setSaving(false);
            setModal(null);
            setActive(null);
            return;
          }
        } else {
          const newRow = { id: Date.now(), ...form };
          setRows((prev) => [newRow, ...prev]);
        }
        setToast({ msg: "Record added successfully.", kind: "success" });
      } else if (modal === "edit" && active) {
        if (apiMode && resource) {
          const res = await fetch(`/api/portal/records/${resource}/${active.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
          const json = await res.json();
          if (json?.success && json.row) {
            setRows((prev) => prev.map((r) => (r.id === active.id ? json.row : r)));
          } else {
            setRows((prev) => prev.map((r) => (r.id === active.id ? { ...r, ...form } : r)));
            setToast({ msg: "Saved locally (DB unavailable).", kind: "error" });
            setSaving(false);
            setModal(null);
            setActive(null);
            return;
          }
        } else {
          setRows((prev) => prev.map((r) => (r.id === active.id ? { ...r, ...form } : r)));
        }
        setToast({ msg: "Record updated successfully.", kind: "success" });
      }
    } catch {
      setToast({ msg: "Save failed.", kind: "error" });
    } finally {
      setSaving(false);
      setModal(null);
      setActive(null);
    }
  }

  async function doDelete(row: Row) {
    setSaving(true);
    try {
      if (apiMode && resource) {
        await fetch(`/api/portal/records/${resource}/${row.id}`, { method: "DELETE" });
      }
    } catch {}
    setRows((prev) => prev.filter((r) => r.id !== row.id));
    setConfirmDelete(null);
    setSaving(false);
    setToast({ msg: "Record deleted.", kind: "success" });
  }

  function moveRow(row: Row, direction: "up" | "down") {
    setRows((prev) => {
      const idx = prev.findIndex((r) => r.id === row.id);
      if (idx === -1) return prev;
      const target = direction === "up" ? idx - 1 : idx + 1;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      try {
        localStorage.setItem(storageKey + "_order", JSON.stringify(next.map((r) => r.id)));
      } catch {}
      return next;
    });
  }

  function attachFile(row: Row) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "*/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const attachment = { name: file.name, data: reader.result as string };
        setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, attachment } : r)));
        // persist to API if available
        if (apiMode && resource) {
          fetch(`/api/portal/records/${resource}/${row.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...row, attachment }),
          }).catch(() => {});
        }
        setToast({ msg: `Attached ${file.name}`, kind: "success" });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  function downloadAttachment(row: Row) {
    if (!row.attachment) return;
    const a = document.createElement("a");
    a.href = row.attachment.data;
    a.download = row.attachment.name;
    a.click();
  }

  function exportCsv() {
    const header = columns.map((c) => c.label).join(",");
    const body = rows
      .map((r) => columns.map((c) => `"${String(r[c.key] ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([header + "\n" + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${storageKey}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function resetData() {
    try {
      localStorage.removeItem(storageKey);
    } catch {}
    setRows(initialRows);
    setToast({ msg: "Data reset to defaults (local).", kind: "success" });
  }

  const isReadOnly = modal === "view";

  return (
    <div className="space-y-4">
      {title && (
        <div className={`rounded-3xl bg-gradient-to-r ${accent} p-6 text-white shadow-lg`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black sm:text-2xl">{title}</h2>
              {subtitle && <p className="mt-1 text-sm text-white/80">{subtitle}</p>}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
                {apiMode ? <Cloud size={12} /> : <HardDrive size={12} />}
                {apiMode ? "Database" : "Local demo"}
              </span>
              <button
                onClick={exportCsv}
                className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/25"
              >
                <Download size={16} /> Export
              </button>
              {canAdd && (
                <button
                  onClick={openAdd}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#003b73] shadow transition hover:bg-blue-50"
                >
                  <Plus size={16} /> {addLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search records..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#003b73] focus:ring-2 focus:ring-[#003b73]/20"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500">
            {filtered.length} of {rows.length} records
          </span>
          <button
            onClick={resetData}
            className="text-xs font-bold text-slate-400 underline-offset-2 hover:text-red-500 hover:underline"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-xs uppercase tracking-wide text-slate-500">
              {avatarKey && <th className="px-4 py-3 font-bold">Photo</th>}
              {allowAttachments && (
                <div>
                  <label className="form-label">Attachment (soft copy)</label>
                  <div className="flex items-center gap-3">
                    {form.attachment ? (
                      <a
                        href={form.attachment.data}
                        download={form.attachment.name}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100"
                      >
                        <Download size={13} /> {form.attachment.name}
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400">No file attached</span>
                    )}
                    <label className="cursor-pointer rounded-xl border border-dashed border-[#0070c9] bg-blue-50 px-3 py-2 text-xs font-bold text-[#0070c9] transition hover:bg-blue-100">
                      <Paperclip size={13} className="inline mr-1" /> Upload
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => setForm((f) => ({ ...f, attachment: { name: file.name, data: reader.result as string } }));
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>
                    {form.attachment && (
                      <button
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, attachment: null }))}
                        className="text-xs font-bold text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              )}
              {columns.map((c) => (
                <th key={c.key} className="px-4 py-3 font-bold">
                  {c.label}
                </th>
              ))}
              {allowAttachments && <th className="px-4 py-3 font-bold">Attachment</th>}
              <th className="px-4 py-3 text-right font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-12 text-center text-sm text-slate-400">
                  {emptyText}
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr
                  key={row.id ?? JSON.stringify(row)}
                  className="border-b border-slate-50 transition hover:bg-blue-50/40 last:border-0"
                >
                  {avatarKey && (
                    <td className="px-4 py-3">
                      <img
                        src={row[avatarKey] || `https://i.pravatar.cc/80?u=${row.id}`}
                        alt=""
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100"
                      />
                    </td>
                  )}
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3 text-slate-700">
                      {String(row[c.key] ?? "—")}
                    </td>
                  ))}
                  {allowAttachments && (
                    <td className="px-4 py-3">
                      {row.attachment ? (
                        <a
                          href={row.attachment.data}
                          download={row.attachment.name}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0070c9] hover:underline"
                        >
                          <Download size={13} /> {row.attachment.name}
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1.5">
                      {reorderable && (
                        <>
                          <button
                            onClick={() => moveRow(row, "up")}
                            className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-300"
                            aria-label="Move up"
                            title="Move up"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveRow(row, "down")}
                            className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-300"
                            aria-label="Move down"
                            title="Move down"
                          >
                            ↓
                          </button>
                        </>
                      )}
                      {allowAttachments && (
                        <>
                          <button
                            onClick={() => attachFile(row)}
                            className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-50 text-indigo-600 transition hover:bg-indigo-500 hover:text-white"
                            aria-label="Upload attachment"
                            title="Upload soft copy"
                          >
                            <Paperclip size={15} />
                          </button>
                          {row.attachment && (
                            <button
                              onClick={() => downloadAttachment(row)}
                              className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 text-emerald-600 transition hover:bg-emerald-500 hover:text-white"
                              aria-label="Download attachment"
                              title="Download"
                            >
                              <Download size={15} />
                            </button>
                          )}
                        </>
                      )}
                      <button
                        onClick={() => openView(row)}
                        className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-[#0070c9] transition hover:bg-[#0070c9] hover:text-white"
                        aria-label="View"
                      >
                        <Eye size={15} />
                      </button>
                      {canEdit && (
                        <button
                          onClick={() => openEdit(row)}
                          className="grid h-8 w-8 place-items-center rounded-lg bg-amber-50 text-amber-600 transition hover:bg-amber-500 hover:text-white"
                          aria-label="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                      )}
                      {canDelete && (
                        <button
                          onClick={() => setConfirmDelete(row)}
                          className="grid h-8 w-8 place-items-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-500 hover:text-white"
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-[#003b73]">
                {modal === "add" ? "Add New Record" : modal === "edit" ? "Edit Record" : "View Record"}
              </h3>
              <button
                onClick={() => setModal(null)}
                className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {avatarKey && (
                <div>
                  <label className="form-label">Photo (required)</label>
                  <div className="flex items-center gap-4">
                    <img
                      src={form[avatarKey] || "https://i.pravatar.cc/80?u=new"}
                      alt="Preview"
                      className="h-16 w-16 rounded-full object-cover ring-2 ring-slate-200"
                    />
                    <label className="cursor-pointer rounded-xl border border-dashed border-[#0070c9] bg-blue-50 px-4 py-2.5 text-sm font-bold text-[#0070c9] transition hover:bg-blue-100">
                      Upload photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => setForm((f) => ({ ...f, [avatarKey]: reader.result as string }));
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>
                  </div>
                  {!form[avatarKey] && (
                    <p className="mt-1 text-xs text-red-500">A photo is required before saving.</p>
                  )}
                </div>
              )}
              {columns.map((c) => (
                <div key={c.key}>
                  <label className="form-label">{c.label}</label>
                  {isReadOnly ? (
                    <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      {String(form[c.key] ?? "—")}
                    </p>
                  ) : c.type === "select" ? (
                    <select
                      value={form[c.key] ?? ""}
                      onChange={(e) => setForm({ ...form, [c.key]: e.target.value })}
                      className="w-full rounded-xl border border-[#dbe4ef] bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#003b73] focus:bg-white focus:ring-2 focus:ring-[#003b73]/20"
                    >
                      <option value="">Select...</option>
                      {(c.options || []).map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : c.type === "textarea" ? (
                    <textarea
                      value={form[c.key] ?? ""}
                      onChange={(e) => setForm({ ...form, [c.key]: e.target.value })}
                      rows={3}
                      className="w-full rounded-xl border border-[#dbe4ef] bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#003b73] focus:bg-white focus:ring-2 focus:ring-[#003b73]/20"
                    />
                  ) : (
                    <input
                      type={c.type === "number" ? "number" : c.type === "date" ? "date" : c.type === "email" ? "email" : "text"}
                      value={form[c.key] ?? ""}
                      onChange={(e) => setForm({ ...form, [c.key]: e.target.value })}
                      className="w-full rounded-xl border border-[#dbe4ef] bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#003b73] focus:bg-white focus:ring-2 focus:ring-[#003b73]/20"
                    />
                  )}
                </div>
              ))}
            </div>

            {!isReadOnly && (
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setModal(null)}
                  className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={saveForm}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#003b73] px-5 py-2.5 text-sm font-bold text-white shadow transition hover:bg-[#00284f] disabled:opacity-60"
                >
                  <CheckCircle2 size={16} /> {saving ? "Saving..." : "Save"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-red-100 text-red-600">
              <AlertTriangle size={24} />
            </div>
            <h3 className="mt-4 text-center text-lg font-black text-[#003b73]">Delete record?</h3>
            <p className="mt-2 text-center text-sm text-slate-500">
              This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => doDelete(confirmDelete)}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow transition hover:bg-red-700 disabled:opacity-60"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[70] rounded-2xl bg-[#003b73] px-5 py-3 text-sm font-bold text-white shadow-2xl">
          {toast.msg}
        </div>
      )}
    </div>
  );
}
