interface SectionHeaderProps {
    title: string;
    description?: string;
    className?: string;
}

/**
 * Reusable SectionHeader component for consistent section titles
 * Used across all pages for section headings
 */
export const SectionHeader = ({ title, description, className = '' }: SectionHeaderProps) => {
    return (
        <div className={`text-center mb-16 ${className}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {title}
            </h2>
            {description && (
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    {description}
                </p>
            )}
        </div>
    );
};
