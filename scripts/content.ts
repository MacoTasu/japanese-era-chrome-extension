function convertToSeireki(dateString: string): string {
    const match = dateString.match(/([HRS]+)(\d{1,2})\.(\d{1,2})\.(\d{1,2})/);
    const [, era, year, month, day] = match;

    let eraOffset = 0;
    let baseYear = 0;

    switch (era) {
        case 'H':
            eraOffset = 1988;
            baseYear = 1926;
            break;
        case 'S':
            eraOffset = 2018;
            baseYear = 2019;
            break;
        case 'R':
            eraOffset = 2018;
            baseYear = 2019;
            break;
        default:
            return '';
    }

    const eraYear = parseInt(year, 10);
    const fullYear = eraOffset + eraYear;

    if (isNaN(fullYear)) {
        throw new Error('フォーマットが正しくありません');
    }

    const formattedYear = String(fullYear).padStart(4, '0');
    const formattedMonth = String(parseInt(month, 10)).padStart(2, '0');
    const formattedDay = String(parseInt(day, 10)).padStart(2, '0');

    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
}

function parseTextNodes(node) {
    const walker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT,
        null
    );

    const regex = /([HRS]+)(\d{1,2})\.(\d{1,2})\.(\d{1,2})/g;

    while (walker.nextNode()) {
        const originalText = walker.currentNode.textContent || '';
        if (originalText === '') {
            continue;
        }

        const matches = originalText.match(regex);
        if (matches) {
            matches.forEach((match) => {
                console.log(match);
                const convertedText = convertToSeireki(match);
                walker.currentNode.textContent = walker.currentNode.textContent.replace(match, convertedText);
            });
        }
    }
}

parseTextNodes(document.body);
