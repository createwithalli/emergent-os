"use client";

import { useMemo, useState } from "react";

type Eth = { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> };

export default function Web3Page() {
  const [address, setAddress] = useState("");
  const [chain, setChain] = useState("demo");
  const [note, setNote] = useState("No wallet session yet.");
  const short = useMemo(() => (address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "disconnected"), [address]);
  async function connectInjected() {
    const eth = (window as Window & { ethereum?: Eth }).ethereum;
    if (!eth) {
      setNote("No injected wallet. Use the local session for demos.");
      return;
    }
    const accounts = (await eth.request({ method: "eth_requestAccounts" })) as string[];
    setAddress(accounts[0] ?? "");
    setChain("injected");
    setNote("Connected through the browser wallet.");
  }
  function connectLocal() {
    const hex = Array.from(crypto.getRandomValues(new Uint8Array(20))).map((n) => n.toString(16).padStart(2, "0")).join("");
    setAddress(`0x${hex}`);
    setChain("emergent-local");
    setNote("Local demo wallet minted in the browser. Swap this module for wagmi or RainbowKit.");
  }
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-white/40">Web3</p>
        <h1 className="mt-2 text-4xl font-semibold">Chain gate</h1>
      </div>
      <div className="glass rounded-[28px] p-6">
        <p className="text-sm text-white/45">Session</p>
        <p className="mt-2 font-mono text-2xl text-[#7ee0ff]">{short}</p>
        <p className="mt-2 text-sm text-white/50">{note}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/35">{chain}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={connectInjected} className="rounded-full bg-white px-4 py-2 text-sm text-black">Connect injected wallet</button>
          <button onClick={connectLocal} className="rounded-full border border-white/15 px-4 py-2 text-sm">Mint local session</button>
        </div>
      </div>
    </div>
  );
}
