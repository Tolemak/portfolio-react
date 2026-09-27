import { useSyncExternalStore } from 'react';
import { useLocation } from 'react-router-dom';
import { navbar } from '../data/navbar';
import { useT } from '../data/i18n';
import { useMode } from '../contexts/useMode';
import { getWowStage, subscribeWowStage } from '../utils/wowStage';

/** The status bar shared by all Tolemak apps; its element is registered in main.tsx. */
const StatusBar = () => {
  const t = useT();
  const { mode } = useMode();
  const { pathname } = useLocation();
  const stage = useSyncExternalStore(subscribeWowStage, getWowStage);
  const section = navbar.find((item) => pathname.startsWith(item.to) && item.to !== '/');
  const sectionKey = section?.title.toLowerCase() as keyof typeof t.navbar | undefined;

  return (
    <tolemak-bar app="kamil-galkowski.pl" home="/" langs="pl,en">
      <tolemak-field className="bar-mode" label={t.bar.mode} tone="accent">
        {mode === 'wow' ? t.bar.wow : t.bar.classic}
      </tolemak-field>
      {pathname === '/' && mode === 'wow' && stage && (
        <tolemak-field label={t.bar.stop}>
          {t.navbar[stage.key]} {stage.index + 1}/{stage.total}
        </tolemak-field>
      )}
      {sectionKey && <tolemak-field label={t.bar.section}>{t.navbar[sectionKey]}</tolemak-field>}
    </tolemak-bar>
  );
};

export default StatusBar;
