"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface SearchResultItemProps {
  type: "employee" | "task" | "mentor";
  id: number;
  primaryText: string;
  secondaryText?: string;
  badge?: string;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({
  primaryText,
  secondaryText,
  badge,
}) => {
  return (
    <Card interactive>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-slate-900 truncate">{primaryText}</p>
          {secondaryText && (
            <p className="mt-1 text-sm text-slate-600 truncate">
              {secondaryText}
            </p>
          )}
        </div>
        {badge && <Badge variant="secondary">{badge}</Badge>}
      </div>
    </Card>
  );
};
