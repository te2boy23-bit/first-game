"use client";
import React from "react";
import { PortalContentData } from "./portalData";

interface PortalArticleProps {
  t: PortalContentData;
  articleTriggerRef: React.RefObject<HTMLDivElement | null>;
}

export function PortalArticle({ t, articleTriggerRef }: PortalArticleProps) {
  return (
    <article className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-7 border border-slate-200/90 shadow-sm">
      <div className="text-[11px] sm:text-xs text-slate-400 font-medium mb-2.5 flex items-center gap-1.5 flex-wrap">
        <span>{t.breadcrumbHome}</span>
        <span>&gt;</span>
        <span>{t.breadcrumbCategory}</span>
        <span>&gt;</span>
        <span className="text-indigo-600 font-bold">{t.breadcrumbFeature}</span>
      </div>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-snug mb-3.5">
        {t.articleTitle}
      </h1>

      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 border-b border-slate-100 pb-3.5 mb-5">
        <span className="font-semibold text-slate-600">{t.articleAuthor}</span>
        <span>{t.articleDate}</span>
        <span>{t.articleViews}</span>
      </div>

      <div className="w-full h-44 sm:h-60 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-xl mb-5 flex items-center justify-center text-white text-center p-5 shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
        <div className="relative z-10 space-y-1">
          <div className="text-2xl sm:text-4xl">{t.articleBannerBadge}</div>
          <div className="text-base sm:text-xl font-black tracking-wide">
            {t.articleBannerText}
          </div>
          <div className="text-[11px] sm:text-xs text-indigo-100 font-medium">
            MEDIA TRENDS SPECIAL REPORT 2026
          </div>
        </div>
      </div>

      <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
        <p className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/70 text-slate-700 text-xs sm:text-sm font-medium">
          {t.leadText}
        </p>

        <h2 className="text-base sm:text-lg font-bold text-slate-900 border-l-4 border-indigo-600 pl-3 mt-5">
          {t.heading1}
        </h2>
        <p className="text-xs sm:text-sm">{t.body1}</p>

        <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 text-xs space-y-2 my-4">
          <div className="font-bold text-indigo-950 text-xs sm:text-sm">
            {t.rankingBoxTitle}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 font-medium pt-1">
            <div className="bg-white p-2 rounded-lg border border-indigo-100/60 shadow-2xs">
              {t.rank1}
            </div>
            <div className="bg-white p-2 rounded-lg border border-indigo-100/60 shadow-2xs">
              {t.rank2}
            </div>
            <div className="bg-white p-2 rounded-lg border border-indigo-100/60 shadow-2xs">
              {t.rank3}
            </div>
            <div className="bg-white p-2 rounded-lg border border-indigo-100/60 shadow-2xs">
              {t.rank4}
            </div>
          </div>
        </div>

        <h2 className="text-base sm:text-lg font-bold text-slate-900 border-l-4 border-indigo-600 pl-3 mt-5">
          {t.heading2}
        </h2>
        <p className="text-xs sm:text-sm">{t.body2_1}</p>
        <p className="text-xs sm:text-sm text-slate-600">{t.body2_2}</p>

        <h2 className="text-base sm:text-lg font-bold text-slate-900 border-l-4 border-indigo-600 pl-3 mt-5">
          {t.heading3}
        </h2>
        <p className="text-xs sm:text-sm">{t.body3}</p>

        <div
          ref={articleTriggerRef}
          className="mt-6 p-3.5 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-600 text-xs flex items-center justify-between"
        >
          <span>{t.commentsTeaser}</span>
          <span className="text-base animate-bounce">⬇️</span>
        </div>
      </div>
    </article>
  );
}
