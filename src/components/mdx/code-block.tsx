"use client";

import {
  useState,
  useRef,
  useEffect,
  type ComponentProps,
} from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "../ui/button";
import { codeToHtml } from "shiki";
import { cn } from "@/lib/utils";

type CodeBlockProps = ComponentProps<"pre"> & {
  "data-language"?: string;
  "data-title"?: string;
};

function extractLanguage(
  className?: string,
  dataLanguage?: string | null
): string {
  // Content Collections / MDX may provide the language here.
  if (dataLanguage) {
    return dataLanguage.toLowerCase();
  }

  if (!className) {
    return "text";
  }

  const match = className.match(
    /(?:language|lang)-([a-z0-9+#-]+)/i
  );

  return match?.[1]?.toLowerCase() ?? "text";
}

function formatLanguage(language: string) {
  const names: Record<string, string> = {
    js: "JavaScript",
    javascript: "JavaScript",

    jsx: "JSX",

    ts: "TypeScript",
    typescript: "TypeScript",

    tsx: "TSX",

    json: "JSON",

    bash: "Bash",
    shell: "Shell",
    sh: "Shell",

    powershell: "PowerShell",
    ps1: "PowerShell",

    css: "CSS",
    html: "HTML",

    sql: "SQL",

    cpp: "C++",
    "c++": "C++",

    java: "Java",

    python: "Python",
    py: "Python",

    yaml: "YAML",
    yml: "YAML",

    md: "Markdown",
    markdown: "Markdown",

    text: "Text",
    plaintext: "Text",
    txt: "Text",
  };

  return names[language] ?? language;
}

function getCurrentTheme(): "github-light-default" | "github-dark-default" {
  if (typeof document === "undefined") {
    return "github-light-default";
  }

  return document.documentElement.classList.contains("dark")
    ? "github-dark-default"
    : "github-light-default";
}

export function CodeBlock({
  children,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const [renderState, setRenderState] = useState({
    html: "",
    className: "",
    title: null as string | null,
    language: "text",
  });

  const preRef = useRef<HTMLPreElement>(null);

  const renderCode = async () => {
    const pre = preRef.current;

    if (!pre) {
      return;
    }

    const codeEl = pre.querySelector("code");

    if (!codeEl) {
      return;
    }

    const codeText = codeEl.textContent || "";

    /*
     * Content Collections can expose the language through
     * data-language, while normal MDX usually uses
     * language-xxx on the code element.
     */
    const dataLanguage =
      codeEl.getAttribute("data-language") ||
      pre.getAttribute("data-language") ||
      props["data-language"] ||
      null;

    const languageSource =
      codeEl.className ||
      pre.className ||
      "";

    const language = extractLanguage(
      languageSource,
      dataLanguage
    );

    const title =
      codeEl.getAttribute("data-title") ||
      pre.getAttribute("data-title") ||
      props["data-title"] ||
      null;

    const className =
      codeEl.className ||
      "";

    const theme = getCurrentTheme();

    setRenderState((previous) => ({
      ...previous,
      language,
      title,
      className,
    }));

    try {
      const result = await codeToHtml(codeText, {
        lang: language as any,
        theme,
      });

      const parser = new DOMParser();

      const doc = parser.parseFromString(
        result,
        "text/html"
      );

      const highlightedCode =
        doc.querySelector("code");

      setRenderState({
        html: highlightedCode?.innerHTML ?? "",
        className,
        title,
        language,
      });
    } catch (error) {
      console.error(
        `Failed to highlight ${language} code:`,
        error
      );

      /*
       * If Shiki doesn't recognize a language,
       * fall back to plain text instead of crashing.
       */
      try {
        const fallback = await codeToHtml(
          codeText,
          {
            lang: "text",
            theme,
          }
        );

        const parser = new DOMParser();

        const doc = parser.parseFromString(
          fallback,
          "text/html"
        );

        setRenderState({
          html:
            doc.querySelector("code")?.innerHTML ??
            "",
          className,
          title,
          language,
        });
      } catch {
        setRenderState({
          html: "",
          className,
          title,
          language,
        });
      }
    }
  };

  useEffect(() => {
    void renderCode();

    /*
     * Watch the portfolio theme.
     *
     * When your theme toggle adds/removes `.dark`
     * from <html>, the code block is highlighted again
     * using the correct Shiki theme.
     */
    const observer = new MutationObserver(() => {
      void renderCode();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, [children]);

  const handleCopy = async () => {
    const code =
      preRef.current
        ?.querySelector("code")
        ?.textContent || "";

    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Failed to copy code:",
        error
      );
    }
  };

  return (
    <div
      className="
        group
        relative
        my-8
        overflow-hidden
        rounded-2xl
        border
        border-neutral-200/80
        bg-white
        shadow-[0_2px_12px_rgba(0,0,0,0.04)]
        transition-colors
        dark:border-neutral-800
        dark:bg-[#0d0d0d]
        dark:shadow-none
      "
    >
      {/* Header */}
      <div
        className="
          flex
          h-11
          items-center
          justify-between
          border-b
          border-neutral-200/80
          bg-neutral-50
          px-4
          dark:border-neutral-800
          dark:bg-neutral-900/70
        "
      >
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>

          {/* Language */}
          <span
            className="
              ml-2
              font-mono
              text-[11px]
              font-medium
              uppercase
              tracking-[0.12em]
              text-neutral-500
              dark:text-neutral-400
            "
          >
            {renderState.title ||
              formatLanguage(renderState.language)}
          </span>
        </div>

        {/* Copy button */}
        <Button
          onClick={handleCopy}
          variant="ghost"
          size="icon"
          className="
            size-7
            rounded-md
            text-neutral-500
            transition-all
            hover:bg-neutral-200
            hover:text-neutral-900
            dark:hover:bg-neutral-800
            dark:hover:text-white
          "
          aria-label={
            copied ? "Copied" : "Copy code"
          }
        >
          {copied ? (
            <Check className="size-3.5" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </Button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre
          ref={preRef}
          {...props}
          className={cn(
            "m-0! min-w-full bg-transparent! p-0! text-[13px] leading-6",
            props.className
          )}
        >
          {renderState.html ? (
            <code
              className={cn(
                "block min-w-max px-5 py-5 font-mono",
                renderState.className
              )}
              dangerouslySetInnerHTML={{
                __html: renderState.html,
              }}
            />
          ) : (
            <code
              className="
                block
                min-w-max
                px-5
                py-5
                font-mono
                text-neutral-800
                dark:text-neutral-200
              "
            >
              {children}
            </code>
          )}
        </pre>
      </div>
    </div>
  );
}