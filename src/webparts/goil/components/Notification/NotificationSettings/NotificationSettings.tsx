import * as React from "react";
import styles from "./NotificationSettings.module.scss";

interface SettingOption {
  label: string;
  key: string;
}

const options: SettingOption[] = [
  { label: "Email Reminders", key: "emailReminders" },
  { label: "Weekly Reports", key: "weeklyReports" },
  { label: "Deadline Alerts", key: "deadlineAlerts" },
];

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = React.useState<Record<string, boolean>>({
    emailReminders: true,
    weeklyReports: true,
    deadlineAlerts: true,
  });

  const toggleSetting = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Notification Settings</div>
      {options.map((opt) => (
        <div key={opt.key} className={styles.settingRow}>
          <span>{opt.label}</span>
          <input
            type="checkbox"
            checked={settings[opt.key]}
            onChange={() => toggleSetting(opt.key)}
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationSettings;
