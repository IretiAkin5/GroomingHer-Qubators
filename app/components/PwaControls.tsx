"use client";

import { useEffect, useRef, useState } from "react";

interface InstallEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaControls() {
  const [installEvent, setInstallEvent] = useState<InstallEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);
  const [updating, setUpdating] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const reloading = useRef(false);

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)");
    const syncInstalled = () => setInstalled(standalone.matches || !!(navigator as Navigator & { standalone?: boolean }).standalone || navigator.userAgent.includes("GroomingHerAndroid/"));
    const offerInstall = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallEvent);
    };
    const onInstalled = () => { setInstalled(true); setInstallEvent(null); };
    syncInstalled();
    standalone.addEventListener("change", syncInstalled);
    window.addEventListener("beforeinstallprompt", offerInstall);
    window.addEventListener("appinstalled", onInstalled);

    let registration: ServiceWorkerRegistration | undefined;
    let disposed = false;
    const findUpdate = () => {
      if (registration?.waiting) setWaiting(registration.waiting);
      const worker = registration?.installing;
      worker?.addEventListener("statechange", () => {
        if (!disposed && worker.state === "installed" && navigator.serviceWorker.controller && registration?.waiting) setWaiting(registration.waiting);
      });
    };
    const checkUpdate = () => { if (navigator.onLine) void registration?.update().catch(() => {}); };
    const controllerChanged = () => {
      if (reloading.current) window.location.reload();
    };
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", controllerChanged);
      void navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).then((result) => {
        if (disposed) return;
        registration = result;
        findUpdate();
        result.addEventListener("updatefound", findUpdate);
        checkUpdate();
      }).catch(() => {});
    }
    window.addEventListener("focus", checkUpdate);
    window.addEventListener("online", checkUpdate);
    const interval = window.setInterval(checkUpdate, 60 * 60 * 1000);
    return () => {
      disposed = true;
      window.clearInterval(interval);
      window.removeEventListener("focus", checkUpdate);
      window.removeEventListener("online", checkUpdate);
      standalone.removeEventListener("change", syncInstalled);
      window.removeEventListener("beforeinstallprompt", offerInstall);
      window.removeEventListener("appinstalled", onInstalled);
      registration?.removeEventListener("updatefound", findUpdate);
      navigator.serviceWorker?.removeEventListener("controllerchange", controllerChanged);
    };
  }, []);

  async function install() {
    if (!installEvent) { dialog.current?.showModal(); return; }
    await installEvent.prompt();
    await installEvent.userChoice;
    setInstallEvent(null);
  }

  return <>
    <aside className="pwa-controls" aria-label="App installation and updates">
      {!installed && <button className="pwa-install" onClick={() => void install()}>Install GroomingHer</button>}
      {waiting && <div className="pwa-update" role="status">
        <strong>An app update is ready.</strong>
        <p>Finish your work before reloading. Reloading clears unsaved demonstration diaries, messages and progress.</p>
        <button className="button" disabled={updating} onClick={() => {
          reloading.current = true;
          setUpdating(true);
          waiting.postMessage({ type: "ACTIVATE_UPDATE" });
        }}>{updating ? "Updating…" : "Update and reload"}</button>
      </div>}
    </aside>
    <dialog className="pwa-dialog" ref={dialog} aria-labelledby="pwa-title">
      <h2 id="pwa-title">Install GroomingHer</h2>
      <p>Keep GroomingHer on your home screen and open it like an app.</p>
      <ul>
        <li><strong>Android or desktop Chrome/Edge:</strong> open the browser menu and choose “Install app” or “Add to home screen”.</li>
        <li><strong>iPhone or iPad:</strong> open this website in Safari, tap Share, then “Add to Home Screen”. Turn on “Open as Web App” if shown.</li>
      </ul>
      <p>You need an internet connection for lessons and demonstration spaces. Installation does not save diaries or messages.</p>
      <form method="dialog"><button className="button">Close</button></form>
    </dialog>
  </>;
}
