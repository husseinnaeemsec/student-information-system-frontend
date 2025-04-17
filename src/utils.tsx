export function formatDateTime(input: string | number | Date | null): string {
    if (input === null) {
        return "Never logged in";
    }

    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;

    let date: Date;

    if (typeof input === "string") {
        if (isoRegex.test(input)) {
            date = new Date(input);
        } else if (!isNaN(Date.parse(input))) {
            date = new Date(input); // e.g. "2025-04-11 17:33:25"
        } else {
            return "Invalid date string format";
        }
    } else if (typeof input === "number") {
        date = new Date(input); // assume it's a Unix timestamp (ms)
    } else if (input instanceof Date) {
        date = input;
    } else {
        return "Unsupported date type";
    }

    if (isNaN(date.getTime())) {
        return "Invalid date";
    }

    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
}
