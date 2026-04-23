import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Are my images uploaded to a server?',
    a: 'No. ClearCut runs the entire AI model inside your browser using WebAssembly. Your images are processed locally on your device and never transmitted anywhere. We have no server that receives image data.',
  },
  {
    q: 'What image formats are supported?',
    a: 'You can upload PNG, JPG/JPEG, WEBP, GIF, BMP, and TIFF files. Output is always a transparent PNG — the most widely compatible format for images without backgrounds.',
  },
  {
    q: 'Why is the first processing run slower?',
    a: 'The AI model (~40 MB of ONNX weights) is downloaded from a CDN on your first use and then cached by your browser. Subsequent runs on the same device are much faster because the model loads from the local cache.',
  },
  {
    q: 'How large can the images be?',
    a: 'ClearCut accepts files up to 10 MB. Very large images may take longer to process and consume more browser memory. For best results, use images under 4000×4000 px.',
  },
  {
    q: 'Does it work on mobile?',
    a: 'Yes — ClearCut is fully responsive and works on modern mobile browsers. Processing may be slower on low-end devices because the AI model is compute-intensive. For large images, a desktop or laptop is recommended.',
  },
] as const;

/** Animated FAQ accordion */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-display font-700 text-3xl sm:text-4xl text-zinc-50 tracking-tight mb-3">
            Frequently asked
          </h2>
          <p className="text-zinc-500 text-base">
            Everything you might want to know.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={[
                  'rounded-xl border transition-all duration-200 overflow-hidden',
                  isOpen
                    ? 'border-zinc-700 bg-zinc-900/60'
                    : 'border-zinc-800 bg-zinc-900/30 hover:border-zinc-700/60',
                ].join(' ')}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-zinc-100 font-medium text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={[
                      'w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform duration-200',
                      isOpen ? 'rotate-180' : '',
                    ].join(' ')}
                  />
                </button>

                <div
                  className={[
                    'grid transition-all duration-200 ease-out',
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  ].join(' ')}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
