"use client";

import { useMemo, useState } from "react";
import styles from "./PricingInvestment.module.css";

const flashfireHoursPerWeek = 3;
const flashfireApplicationsPerWeek = 40;
const beforeInterviewRate = 8;
const flashfireInterviewRate = 28;
const defaultHoursPerWeek = 20;
const defaultApplicationsPerWeek = 10;
const defaultHourlyValue = 50;

const toNumber = (value: string, fallback: number) => {
  if (value.trim() === "") {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export default function PricingInvestment() {
  const [hoursPerWeekInput, setHoursPerWeekInput] = useState("");
  const [applicationsPerWeekInput, setApplicationsPerWeekInput] = useState("");
  const [hourlyValueInput, setHourlyValueInput] = useState("");

  const hoursPerWeek = toNumber(hoursPerWeekInput, defaultHoursPerWeek);
  const applicationsPerWeek = toNumber(applicationsPerWeekInput, defaultApplicationsPerWeek);
  const hourlyValue = toNumber(hourlyValueInput, defaultHourlyValue);

  const metrics = useMemo(() => {
    const weeklySavings = Math.max(0, (hoursPerWeek - flashfireHoursPerWeek) * hourlyValue);
    const flashfireApplications = Math.max(
      flashfireApplicationsPerWeek,
      applicationsPerWeek * 4
    );

    return [
      {
        label: "Weekly Savings",
        beforeLabel: "0$",
        flashfireLabel: `${weeklySavings}$`,
        beforeValue: 0,
        flashfireValue: weeklySavings,
      },
      {
        label: "Interview Rate",
        beforeLabel: `${beforeInterviewRate}%`,
        flashfireLabel: `${flashfireInterviewRate}%`,
        beforeValue: beforeInterviewRate,
        flashfireValue: flashfireInterviewRate,
      },
      {
        label: "Applications Per Week",
        beforeLabel: String(applicationsPerWeek),
        flashfireLabel: String(flashfireApplications),
        beforeValue: applicationsPerWeek,
        flashfireValue: flashfireApplications,
      },
      {
        label: "Hours Per Week",
        beforeLabel: String(hoursPerWeek),
        flashfireLabel: String(flashfireHoursPerWeek),
        beforeValue: hoursPerWeek,
        flashfireValue: flashfireHoursPerWeek,
      },
    ].map((metric) => {
      const maxValue = Math.max(metric.beforeValue, metric.flashfireValue, 1);
      const beforePercent = Math.max(4, (metric.beforeValue / maxValue) * 100);
      const flashfirePercent = Math.max(4, (metric.flashfireValue / maxValue) * 100);

      return {
        ...metric,
        beforeHeight: `${beforePercent}%`,
        beforeShort: beforePercent < 18,
        flashfireHeight: `${flashfirePercent}%`,
        flashfireShort: flashfirePercent < 18,
      };
    });
  }, [applicationsPerWeek, hourlyValue, hoursPerWeek]);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2>The best Investment for your Career</h2>
          <p>
            Flashfire Saves you time, Increases your interview chances and helps
            you land better opportunities that lead to higher salaries and
            long-term career growth
          </p>
        </header>

        <div className={styles.controls}>
          <label>
            <span>Hours per week on applications</span>
            <input
              type="number"
              min="0"
              placeholder={String(defaultHoursPerWeek)}
              value={hoursPerWeekInput}
              onClick={() => setHoursPerWeekInput("")}
              onChange={(event) => setHoursPerWeekInput(event.target.value)}
            />
          </label>

          <label>
            <span>Applications per week</span>
            <input
              type="number"
              min="0"
              placeholder={String(defaultApplicationsPerWeek)}
              value={applicationsPerWeekInput}
              onClick={() => setApplicationsPerWeekInput("")}
              onChange={(event) => setApplicationsPerWeekInput(event.target.value)}
            />
          </label>

          <label>
            <span>Your hourly value ($)</span>
            <input
              type="number"
              min="0"
              placeholder={String(defaultHourlyValue)}
              value={hourlyValueInput}
              onClick={() => setHourlyValueInput("")}
              onChange={(event) => setHourlyValueInput(event.target.value)}
            />
          </label>
        </div>

        <div className={styles.chart} aria-label="Flashfire investment comparison chart">
          {metrics.map((metric) => (
            <div className={styles.group} key={metric.label}>
              <div className={styles.bars}>
                <div className={styles.barWrap}>
                  <span className={styles.beforeName}>Before</span>
                  <div
                    className={`${styles.beforeBar} ${
                      metric.beforeShort ? styles.shortBar : ""
                    }`}
                    style={{ height: metric.beforeHeight }}
                  >
                    <strong>{metric.beforeLabel}</strong>
                  </div>
                </div>

                <div className={styles.barWrap}>
                  <span className={styles.flashfireName}>Flashfire</span>
                  <div
                    className={`${styles.flashfireBar} ${
                      metric.flashfireShort ? styles.shortBar : ""
                    }`}
                    style={{ height: metric.flashfireHeight }}
                  >
                    <strong>{metric.flashfireLabel}</strong>
                  </div>
                </div>
              </div>
              <p>{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
