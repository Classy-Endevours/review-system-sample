export function generateRandomParagraph(numSentences: number) {
    const sentenceTemplates = [
        `NALS Apartment Homes is pleased to present our {period} financial report and distributions. Operating distributions for {period} were {distribution}, or {percentage}% of the limited investment.`,
        `In {period}, all {propertyCount} properties earned a distribution. This record level of distributions comes as we reinvest over {capitalInvestment} in capital improvements.`,
        `Year-to-date, we have distributed {totalDistribution}, or {percentage}% of the limited investment while reinvesting {capitalInvestment} in capital improvements.`,
        `Our same store collected rents for {period} declined {rentDecline}% from the {previousPeriod}, but remains {rentAbove}% above the same period of {year}.`,
        `While the growth in our collected rents has noticeably slowed, it remains {rentGrowth}% above the first quarter of {prePandemicYear}.`,
        `The multifamily industry is experiencing significant challenges in the form of {challenge1}, {challenge2}, and {challenge3}.`,
        `We are insulated from rising interest rates due to our decision to finance with long-term, fixed-rate debt, and our management team's experience from the {recessionYear} recession.`,
    ];

    const replacements = {
        period: ['third quarter', 'fourth quarter', 'Q3', '2023'],
        distribution: ['$26.4 million', '$35.2 million'],
        percentage: ['4.1', '5.2', '3.8'],
        propertyCount: ['46', '50', '52'],
        capitalInvestment: ['$9.0 million', '$8.2 million', '$10.5 million'],
        totalDistribution: ['$75.5 million', '$100.3 million'],
        rentDecline: ['0.2%', '0.3%'],
        previousPeriod: ['second quarter', 'previous quarter'],
        rentAbove: ['2.1%', '1.9%'],
        year: ['2022', '2021'],
        rentGrowth: ['30.5%', '28.7%'],
        prePandemicYear: ['2020', '2019'],
        challenge1: ['declining rents', 'increasing expenses'],
        challenge2: ['rising insurance costs', 'higher inflation'],
        challenge3: ['increased interest rates', 'supply chain issues'],
        recessionYear: ['2009', '2008'],
    };

    function replacePlaceholders(template: string) {
        return template.replace(/{(\w+)}/g, (_, key) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const options = (replacements as any)[key];
            return options[Math.floor(Math.random() * options.length)];
        });
    }

    let paragraph = '';
    for (let i = 0; i < numSentences; i++) {
        const randomIndex = Math.floor(Math.random() * sentenceTemplates.length);
        const sentence = replacePlaceholders(sentenceTemplates[randomIndex]);
        paragraph += sentence + ' ';
    }

    return paragraph.trim();
}
