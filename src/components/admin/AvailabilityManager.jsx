import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Save, X, Plus, CheckCircle2 } from "lucide-react";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const defaultSchedule = DAYS.map((name, i) => ({
  day_of_week: i,
  name,
  is_open: i !== 0,
  open_time: "09:00",
  close_time: "18:00",
  id: null,
}));

export default function AvailabilityManager() {
  const [schedule, setSchedule] = useState(defaultSchedule);
  const [blockedDates, setBlockedDates] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [newReason, setNewReason] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    base44.entities.WorkingSchedule.list().then(records => {
      setSchedule(DAYS.map((name, i) => {
        const existing = records.find(r => r.day_of_week === i);
        return existing
          ? { ...existing, name }
          : { day_of_week: i, name, is_open: i !== 0, open_time: "09:00", close_time: "18:00", id: null };
      }));
    });
    base44.entities.BlockedDate.list("-date", 100).then(setBlockedDates);
  }, []);

  const updateDay = (idx, field, value) => {
    setSchedule(prev => prev.map((d, i) => i === idx ? { ...d, [field]: value } : d));
  };

  const handleSave = async () => {
    setSaving(true);
    const updated = await Promise.all(schedule.map(day => {
      const { id, name, ...data } = day;
      if (id) return base44.entities.WorkingSchedule.update(id, data).then(() => day);
      return base44.entities.WorkingSchedule.create(data).then(r => ({ ...day, id: r.id }));
    }));
    setSchedule(updated);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleAddBlocked = async () => {
    if (!newDate) return;
    const record = await base44.entities.BlockedDate.create({ date: newDate, reason: newReason });
    setBlockedDates(prev => [...prev, record].sort((a, b) => a.date.localeCompare(b.date)));
    setNewDate("");
    setNewReason("");
  };

  const handleRemoveBlocked = async (id) => {
    await base44.entities.BlockedDate.delete(id);
    setBlockedDates(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Weekly Schedule */}
      <div className="bg-card border border-border/50 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-heading text-lg text-foreground">Weekly Schedule</h3>
            <p className="font-body text-xs text-muted-foreground mt-0.5">Toggle days open/closed and set working hours.</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 font-body text-sm px-4 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saving ? "Saving..." : saved ? "Saved!" : "Save"}
          </button>
        </div>

        <div className="divide-y divide-border/30">
          {schedule.map((day, idx) => (
            <div key={day.day_of_week} className="flex flex-wrap items-center gap-3 py-3">
              {/* Toggle */}
              <button
                onClick={() => updateDay(idx, "is_open", !day.is_open)}
                className={`relative h-6 w-11 rounded-full transition-colors flex-shrink-0 ${day.is_open ? "bg-primary" : "bg-muted"}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${day.is_open ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>

              {/* Day name */}
              <span className={`font-body text-sm w-24 flex-shrink-0 ${day.is_open ? "text-foreground" : "text-muted-foreground"}`}>
                {day.name}
              </span>

              {/* Hours */}
              {day.is_open ? (
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={day.open_time}
                    onChange={e => updateDay(idx, "open_time", e.target.value)}
                    className="bg-input border border-border/50 rounded-lg px-3 py-1.5 font-body text-sm text-foreground focus:outline-none focus:border-primary/60"
                  />
                  <span className="font-body text-xs text-muted-foreground">to</span>
                  <input
                    type="time"
                    value={day.close_time}
                    onChange={e => updateDay(idx, "close_time", e.target.value)}
                    className="bg-input border border-border/50 rounded-lg px-3 py-1.5 font-body text-sm text-foreground focus:outline-none focus:border-primary/60"
                  />
                </div>
              ) : (
                <span className="font-body text-xs text-muted-foreground italic">Closed</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Blocked Dates */}
      <div className="bg-card border border-border/50 rounded-2xl p-5 space-y-4">
        <div>
          <h3 className="font-heading text-lg text-foreground">Blocked Dates</h3>
          <p className="font-body text-xs text-muted-foreground mt-0.5">Block specific dates for vacations, holidays, etc.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <input
            type="date"
            value={newDate}
            onChange={e => setNewDate(e.target.value)}
            className="bg-input border border-border/50 rounded-xl px-4 py-2.5 font-body text-sm text-foreground focus:outline-none focus:border-primary/60"
          />
          <input
            type="text"
            placeholder="Reason (optional)"
            value={newReason}
            onChange={e => setNewReason(e.target.value)}
            className="flex-1 min-w-36 bg-input border border-border/50 rounded-xl px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60"
          />
          <button
            onClick={handleAddBlocked}
            disabled={!newDate}
            className="flex items-center gap-1.5 font-body text-sm px-4 py-2.5 bg-primary text-primary-foreground rounded-full hover:opacity-90 disabled:opacity-40 transition-opacity"
          >
            <Plus className="h-4 w-4" /> Block Date
          </button>
        </div>

        {blockedDates.length === 0 ? (
          <p className="font-body text-sm text-muted-foreground text-center py-6">No blocked dates set.</p>
        ) : (
          <div className="space-y-2">
            {blockedDates.map(d => (
              <div key={d.id} className="flex items-center justify-between bg-muted/40 rounded-xl px-4 py-2.5">
                <div>
                  <span className="font-body text-sm text-foreground">
                    {new Date(d.date + "T12:00:00").toLocaleDateString("en-CA", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
                  </span>
                  {d.reason && <span className="font-body text-xs text-muted-foreground ml-2">— {d.reason}</span>}
                </div>
                <button
                  onClick={() => handleRemoveBlocked(d.id)}
                  className="h-7 w-7 rounded-full bg-red-500/10 flex items-center justify-center hover:bg-red-500/30 transition-colors"
                >
                  <X className="h-3.5 w-3.5 text-red-400" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}