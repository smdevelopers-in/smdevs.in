"use client";

import React, { useState, useEffect } from "react";
import { Code2, Plus, Trash2, Download } from "lucide-react";
import ToolLayout from "@/components/tools/ToolLayout";
import InputField from "@/components/tools/InputField";
import ResultBox from "@/components/tools/ResultBox";

type SchemaType = "Article" | "FAQPage" | "Product";

export default function SchemaGeneratorPage() {
  const [type, setType] = useState<SchemaType>("Article");
  const [formData, setFormData] = useState<any>({});
  const [jsonOutput, setJsonOutput] = useState("");

  // Article Fields
  const [articleData, setArticleData] = useState({
    headline: "Example Headline",
    author: "SM Developers",
    publisher: "SM Developers",
    url: "https://example.com/article",
    image: "https://example.com/image.jpg",
    datePublished: new Date().toISOString().split("T")[0],
  });

  // Product Fields
  const [productData, setProductData] = useState({
    name: "Awesome Product",
    description: "This is a great product.",
    brand: "SM Brand",
    sku: "SKU12345",
    price: "99.99",
    currency: "USD",
    availability: "https://schema.org/InStock",
  });

  // FAQ Fields
  const [faqItems, setFaqItems] = useState([
    { question: "What is this tool?", answer: "This is a schema generator." },
  ]);

  useEffect(() => {
    let schema: any = {
      "@context": "https://schema.org",
      "@type": type,
    };

    if (type === "Article") {
      schema = {
        ...schema,
        ...articleData,
        "publisher": {
          "@type": "Organization",
          "name": articleData.publisher,
        },
        "author": {
          "@type": "Person",
          "name": articleData.author,
        }
      };
    } else if (type === "Product") {
      schema = {
        ...schema,
        ...productData,
        "offers": {
          "@type": "Offer",
          "url": "https://example.com/product",
          "priceCurrency": productData.currency,
          "price": productData.price,
          "availability": productData.availability,
        }
      };
    } else if (type === "FAQPage") {
      schema = {
        ...schema,
        "mainEntity": faqItems.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer,
          }
        }))
      };
    }

    setJsonOutput(JSON.stringify(schema, null, 2));
  }, [type, articleData, productData, faqItems]);

  const addFaqItem = () => {
    setFaqItems([...faqItems, { question: "", answer: "" }]);
  };

  const removeFaqItem = (index: number) => {
    setFaqItems(faqItems.filter((_, i) => i !== index));
  };

  const updateFaq = (index: number, field: string, value: string) => {
    const newItems = [...faqItems];
    (newItems[index] as any)[field] = value;
    setFaqItems(newItems);
  };

  const downloadJson = () => {
    const element = document.createElement("a");
    const file = new Blob([jsonOutput], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = `${type.toLowerCase()}-schema.json`;
    document.body.appendChild(element);
    element.click();
    window.dispatchEvent(new CustomEvent("trigger-review-popup"));
  };

  return (
    <ToolLayout
      title="Schema Generator"
      description="Easily generate JSON-LD structured data for your website. Select a type, fill in the details, and get your schema instantly."
      toolType="SEO"
      howToUse={[
        "Choose the type of schema you want to generate (Article, Product, or FAQ).",
        "Enter the required information in the corresponding form fields.",
        "The JSON-LD markup will update in real-time in the result section.",
        "Copy the generated code or download it as a .json file for your site."
      ]}
      tips={[
        "Use the 'Article' schema for blog posts to improve visibility in Google News and Discover.",
        "For Product schema, ensure the price and currency match your actual landing page to avoid rich result errors.",
        "FAQ schema can significantly increase your search result footprint by adding expandables.",
        "Always test your generated code using the 'Rich Results Test' by Google after implementation."
      ]}
      explanation={
        <div className="space-y-4">
          <p>
            Structured data (Schema.org) is a standardized format for providing information about a page and classifying the page content. It helps search engines understand the context of your content, which can lead to "Rich Results" like star ratings, FAQ accordions, and featured snippets.
          </p>
          <p>
            This tool generates <strong>JSON-LD</strong>, which is the recommended format by Google. Unlike older formats like Microdata, JSON-LD is easy to maintain and doesn't interfere with your HTML structure.
          </p>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 mt-6">
             <h4 className="font-black text-slate-900 dark:text-white mb-2">Why use Schema?</h4>
             <ul className="list-disc ml-4 space-y-2 text-sm">
                <li>Increases Click-Through Rate (CTR) via Rich Snippets.</li>
                <li>Helps Google understand entities (people, products, events).</li>
                <li>Essential for Voice Search optimization.</li>
             </ul>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form Section */}
        <div className="space-y-8 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-indigo-600 dark:text-indigo-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Generator Settings</h2>
          </div>

          <InputField
            label="Schema Type"
            value={type}
            onChange={(val: any) => setType(val)}
            type="select"
            options={[
              { label: "Article", value: "Article" },
              { label: "Product", value: "Product" },
              { label: "FAQ Page", value: "FAQPage" },
            ]}
          />

          <hr className="border-slate-100 dark:border-slate-800" />

          {type === "Article" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Headline" value={articleData.headline} onChange={(val) => setArticleData({...articleData, headline: val})} />
              <InputField label="Author Name" value={articleData.author} onChange={(val) => setArticleData({...articleData, author: val})} />
              <InputField label="Publisher" value={articleData.publisher} onChange={(val) => setArticleData({...articleData, publisher: val})} />
              <InputField label="Published Date" type="text" value={articleData.datePublished} onChange={(val) => setArticleData({...articleData, datePublished: val})} description="YYYY-MM-DD" />
              <div className="md:col-span-2">
                <InputField label="Image URL" value={articleData.image} onChange={(val) => setArticleData({...articleData, image: val})} />
              </div>
            </div>
          )}

          {type === "Product" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Product Name" value={productData.name} onChange={(val) => setProductData({...productData, name: val})} />
              <InputField label="Brand" value={productData.brand} onChange={(val) => setProductData({...productData, brand: val})} />
              <InputField label="Price" value={productData.price} onChange={(val) => setProductData({...productData, price: val})} />
              <InputField label="Currency" value={productData.currency} onChange={(val) => setProductData({...productData, currency: val})} />
              <div className="md:col-span-2">
                <InputField label="Description" type="textarea" value={productData.description} onChange={(val) => setProductData({...productData, description: val})} />
              </div>
            </div>
          )}

          {type === "FAQPage" && (
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 relative">
                  <button
                    onClick={() => removeFaqItem(index)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <InputField label={`Question ${index + 1}`} value={item.question} onChange={(val) => updateFaq(index, "question", val)} />
                  <InputField label={`Answer ${index + 1}`} type="textarea" value={item.answer} onChange={(val) => updateFaq(index, "answer", val)} />
                </div>
              ))}
              <button
                onClick={addFaqItem}
                className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" /> Add Another Question
              </button>
            </div>
          )}
        </div>

        {/* Result Section */}
        <div className="space-y-6">
          <ResultBox
            title="Generated JSON-LD"
            content={jsonOutput}
            label="Live Preview"
          />
          
          <button
            onClick={downloadJson}
            className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl active:scale-[0.98]"
          >
            <Download className="w-5 h-5" /> Download Schema.json
          </button>
        </div>
      </div>
    </ToolLayout>
  );
}
