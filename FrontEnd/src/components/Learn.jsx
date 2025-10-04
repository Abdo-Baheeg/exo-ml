// Learn.jsx
// Educational resources: articles, videos, infographics.

import React from "react";

const ARTICLES = [
  { title: "How Transit Method Works", href: "#", summary: "شرح طريقة العبور (Transit) المستخدمة في اكتشاف الكواكب الخارجية." },
  { title: "Kepler & K2 Overview", href: "#", summary: "ملخص مهام Kepler وK2 وتصنيفاتها." },
  { title: "TESS: Surveying Nearby Stars", href: "#", summary: "كيف تساعدنا TESS في إيجاد كواكب قريبة." },
];

export default function Learn() {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Learn — For Researchers & Students</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Articles */}
        <div className="col-span-2">
          <h3 className="text-xl font-semibold mb-3">Articles & Explaners</h3>
          <div className="space-y-4">
            {ARTICLES.map((a, idx) => (
              <a key={idx} href={a.href} className="block p-4 rounded bg-[#06101a] hover:shadow">
                <div className="text-cyan-300 font-semibold">{a.title}</div>
                <div className="text-gray-300 mt-1 text-sm">{a.summary}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Video / infographic */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Video</h3>
          <div className="bg-[#06101a] p-3 rounded">
            {/* embed placeholder — replace src with real YouTube link */}
            <div className="w-full h-48 bg-black rounded flex items-center justify-center text-gray-400">
              YouTube video placeholder
            </div>
            <p className="mt-3 text-sm text-gray-300">
              فيديو تعليمي قصير يشرح كيف نحلل light curves ونستخدم الـ ML.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-gray-400">
        <p>Tip: اضف مقالات أو فيديوهات حقيقية من NASA أو مقالات مراجعة لتقوية المحتوى التعليمي.</p>
      </div>
    </div>
  );
}
