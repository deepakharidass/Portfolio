import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage: React.FC = () => (
  <section className="w-full bg-background min-h-[60vh] flex items-center">
    <div className="max-w-6xl mx-auto w-full px-6 md:px-8 lg:px-12 py-20">
      <span className="font-mono text-xs uppercase bg-foreground text-background px-2.5 py-1 font-bold">
        404 / NOT FOUND
      </span>
      <h1 className="font-display text-5xl sm:text-7xl uppercase text-foreground mt-6">
        Page Not Found
      </h1>
      <p className="font-body text-lg text-muted-foreground mt-4 max-w-xl">
        The requested page is not part of this portfolio.
      </p>
      <Link
        to="/"
        className="inline-flex mt-8 border-2 border-foreground bg-foreground text-background px-6 py-3 font-mono text-xs uppercase tracking-widest font-bold hover:bg-background hover:text-foreground"
      >
        Return to About
      </Link>
    </div>
  </section>
);
