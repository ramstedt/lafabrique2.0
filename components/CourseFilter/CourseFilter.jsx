"use client";

import styles from "./CourseFilter.module.css";
import { useMemo, useEffect, useState, useRef } from "react";

const CourseFilter = ({
  selectedCategories = [],
  setSelectedCategories,
  selectedMonths = [],
  setSelectedMonths,
  events = [],
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!mounted) return;
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    } else {
      mediaQuery.onchange = onChange;
      return () => {
        mediaQuery.onchange = null;
      };
    }
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, mounted]);

  const categories = useMemo(() => {
    const list = (events || [])
      .map((e) => e?.category)
      .filter((c) => typeof c === "string" && c.trim().length > 0);
    return Array.from(new Set(list)).sort((a, b) => a.localeCompare(b, "sv"));
  }, [events]);

  const months = useMemo(() => {
    const fmt = new Intl.DateTimeFormat("sv-SE", {
      month: "long",
      year: "numeric",
    });

    const labels = (events || [])
      .map((e) => {
        const iso = Array.isArray(e?.eventDateTime)
          ? e.eventDateTime[0]
          : e?.eventDateTime;
        const d = iso ? new Date(iso) : null;
        if (!d || Number.isNaN(d.getTime())) return null;
        return {
          label: fmt.format(d).toLowerCase(),
          y: d.getFullYear(),
          m: d.getMonth() + 1,
        };
      })
      .filter(Boolean);

    const unique = Array.from(
      new Map(
        labels.map(({ label, y, m }) => [label, { label, y, m }])
      ).values()
    );
    unique.sort((a, b) => a.y * 100 + a.m - (b.y * 100 + b.m));
    return unique.map((x) => x.label);
  }, [events]);

  const capitalize = (s) =>
    typeof s === "string" && s.length > 0
      ? s.charAt(0).toUpperCase() + s.slice(1)
      : s;

  const handleToggle = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      const next = Array.from(new Set([...(selectedCategories || []), value]));
      setSelectedCategories(next);
    } else {
      const next = (selectedCategories || []).filter((c) => c !== value);
      setSelectedCategories(next);
    }
  };

  const handleMonthToggle = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      const next = Array.from(new Set([...(selectedMonths || []), value]));
      setSelectedMonths(next);
    } else {
      const next = (selectedMonths || []).filter((m) => m !== value);
      setSelectedMonths(next);
    }
  };

  const FiltersContent = () => (
    <div className={styles.filtersContent}>
      <div className={styles.filterLabel}>
        <strong>Filtrera efter kategori:</strong>
      </div>
      <div className={styles.options}>
        {categories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              value={category}
              checked={(selectedCategories || []).includes(category)}
              onChange={handleToggle}
            />{" "}
            {capitalize(category)}
          </label>
        ))}
      </div>

      <div className={styles.filterLabel}>
        <strong>Filtrera efter månad:</strong>
      </div>
      <div className={styles.options}>
        {months.map((month) => (
          <label key={month}>
            <input
              type="checkbox"
              value={month}
              checked={(selectedMonths || []).includes(month)}
              onChange={handleMonthToggle}
            />{" "}
            {month.charAt(0).toUpperCase() + month.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );

  if (!mounted) return null;

  return (
    <div className={styles.filterWrapper}>
      {isMobile ? (
        <>
          <button
            type="button"
            className={styles.mobileTrigger}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls="filters-modal"
            onClick={() => setIsOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              aria-hidden="true"
              className={styles.filterIcon}
            >
              <path d="M3 5h18a1 1 0 0 1 .8 1.6l-6.3 8.4a1 1 0 0 0-.2.6V21a1 1 0 0 1-1.6.8l-3-2.25a1 1 0 0 1-.4-.8v-3.2a1 1 0 0 0-.2-.6L2.2 6.6A1 1 0 0 1 3 5z" />
            </svg>
            Filtrera
          </button>

          {isOpen && (
            <div
              className={styles.modalBackdrop}
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsOpen(false);
              }}
            >
              <div
                id="filters-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="filters-title"
                className={styles.modal}
                ref={dialogRef}
              >
                <div className={styles.modalHeader}>
                  <h2 id="filters-title">Filtrera</h2>
                  <button
                    type="button"
                    className={styles.closeBtn}
                    aria-label="Stäng"
                    onClick={() => setIsOpen(false)}
                  >
                    ×
                  </button>
                </div>
                <div className={styles.modalBody}>
                  <FiltersContent />
                </div>
                <div className={styles.modalFooter}>
                  <button
                    type="button"
                    className={styles.applyBtn}
                    onClick={() => setIsOpen(false)}
                  >
                    Visa resultat
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={styles.inlineFilters}>
          <FiltersContent />
        </div>
      )}
    </div>
  );
};

export default CourseFilter;
