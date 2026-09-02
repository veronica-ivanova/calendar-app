const pluralRules = new Intl.PluralRules("ru-RU");

export const formatResultsCount = (
    count: number,
): string => {
    const form = pluralRules.select(count);

    switch (form) {
        case "one":
            return `${count} результат`;

        case "few":
            return `${count} результата`;

        default:
            return `${count} результатов`;
    }
};