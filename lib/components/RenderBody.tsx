"use client";

/* ─────────────────── Markdown Renderer ─────────────────── */

export function RenderBody({ body }: { body: string }) {
    const renderTextWithLinks = (text: string) => {
        const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }
            parts.push(
                <a
                    key={match.index}
                    href={match[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-orange hover:underline font-semibold"
                >
                    {match[1]}
                </a>
            );
            lastIndex = regex.lastIndex;
        }

        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }

        return parts.length > 0 ? parts : text;
    };

    return (
        <>
            {body.split("\n\n").map((block, index) => {
                if (block.startsWith("###")) {
                    return (
                        <h3 key={index} className="text-2xl font-bold font-heading text-brand-dark pt-6 pb-1">
                            {block.replace("### ", "")}
                        </h3>
                    );
                }
                if (block.includes("* ")) {
                    const lines = block.split("\n");
                    return (
                        <ul key={index} className="list-disc pl-6 space-y-2 text-brand-dark/80">
                            {lines.map((line, lIdx) => {
                                const cleanLine = line.replace(/^\s*\*\s*/, "");
                                const match = cleanLine.match(/^\*\*(.*?)\*\*(.*)/);
                                if (match) {
                                    return (
                                        <li key={lIdx}>
                                            <strong className="text-brand-dark">{match[1]}</strong>
                                            {renderTextWithLinks(match[2])}
                                        </li>
                                    );
                                }
                                return <li key={lIdx}>{renderTextWithLinks(cleanLine)}</li>;
                            })}
                        </ul>
                    );
                }
                if (block.match(/^\d+\./)) {
                    const lines = block.split("\n");
                    return (
                        <ol key={index} className="list-decimal pl-6 space-y-2 text-brand-dark/80">
                            {lines.map((line, lIdx) => {
                                const cleanLine = line.replace(/^\s*\d+\.\s*/, "");
                                const match = cleanLine.match(/^\*\*(.*?)\*\*(.*)/);
                                if (match) {
                                    return (
                                        <li key={lIdx}>
                                            <strong className="text-brand-dark">{match[1]}</strong>
                                            {renderTextWithLinks(match[2])}
                                        </li>
                                    );
                                }
                                return <li key={lIdx}>{renderTextWithLinks(cleanLine)}</li>;
                            })}
                        </ol>
                    );
                }
                if (block.startsWith("*") && block.endsWith("*") && !block.startsWith("**")) {
                    return (
                        <p key={index} className="leading-relaxed text-brand-dark/60 italic">
                            {renderTextWithLinks(block.replace(/^\*|\*$/g, ""))}
                        </p>
                    );
                }
                return (
                    <p key={index} className="leading-relaxed text-brand-dark/80">
                        {renderTextWithLinks(block)}
                    </p>
                );
            })}
        </>
    );
}