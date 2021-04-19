import { endpoint } from '../functions/endpoint';
import { withBrowser } from '../functions/withBrowser';

export const toolsGet = endpoint(async (req, res) => {
  await withBrowser(async (browser, page) => {
    await page.setUserAgent(process.env.USER_AGENT || '');

    await page.goto('https://pt.stardewvalleywiki.com/Ferramentas');

    await page.waitForSelector('.wikitable');

    const items = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.wikitable'))
        .slice(0, 4)
        .flatMap((table) =>
          Array.from(table.querySelectorAll('tbody tr')).map((row: any) => ({
            imagem: row.querySelector('td:nth-child(1) img').src,
            nome: row.querySelector('td:nth-child(2)').innerText,
            custo: row.querySelector('td:nth-child(3)').innerText,
            ingredientes: row.querySelector('td:nth-child(4)').innerText,
            melhorias: row.querySelector('td:nth-child(5)').innerText,
          })),
        );
    });

    res.status(200).json(items);

    await new Promise((resolve) => setTimeout(resolve, 10000));
  });
});
