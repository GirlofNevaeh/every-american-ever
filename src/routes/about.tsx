import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({ meta: [{ title: "About · Every American Ever" }] }),
});

function AboutPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="h-3 bg-flag-red" />
      <div className="h-3 bg-card" />
      <div className="h-3 bg-flag-blue" />
      <article className="mt-6 space-y-4">
        <h1 className="font-display text-5xl">About</h1>
        <p>The United States has 50 states.</p>
        <p>Native nations were here before those states.</p>
        <p>A president serves a term.</p>
        <p>Washington, D.C. is the capital and is not a state.</p>
        <p>The flag has 13 stripes and 50 stars.</p>
        <p>Hawaii and Alaska both became states in 1959.</p>
      </article>
      <button type="button" className="btn mt-6 bg-flag-blue text-white" onClick={() => setOpen(true)}>
        Add to iPhone or iPad
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-4 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="about-add">
          <div className="card w-full max-w-md p-6">
            <h2 id="about-add" className="font-display text-3xl">Add to iPhone or iPad</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5">
              <li>Use Safari.</li>
              <li>Tap Share.</li>
              <li>Tap Add to Home Screen.</li>
            </ol>
            <button type="button" className="btn mt-5 bg-flag-blue text-white" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
