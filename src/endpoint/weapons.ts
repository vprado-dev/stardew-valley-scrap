import { endpoint } from '../functions/endpoint';
import { withBrowser } from '../functions/withBrowser';

export const weaponsGet = endpoint(async (req, res) => {
  await withBrowser(async (browser, page) => {
    await page.setUserAgent(process.env.USER_AGENT || '');

    await page.goto('https://pt.stardewvalleywiki.com/Armas');

    await page.waitForSelector('.wikitable');

    const weapons = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.wikitable'))
        .slice(1, 4)
        .flatMap((table) =>
          Array.from(table.querySelectorAll('tbody tr')).map((row: any) => ({
            imagem: row.querySelector('td:nth-child(1) img').src,
            nome: row.querySelector('td:nth-child(2)').innerText,
            nivel: row.querySelector('td:nth-child(3)').innerText,
            descricao: row.querySelector('td:nth-child(4)').innerText,
            dano: row.querySelector('td:nth-child(5)').innerText,
            chanceCrit: row.querySelector('td:nth-child(6)').innerText,
            estatisticas: row.querySelector('td:nth-child(7)').innerText,
            localizacao: row.querySelector('td:nth-child(8)').innerText,
            precoCompra: row.querySelector('td:nth-child(9)').innerText,
            precoVenda: row.querySelector('td:nth-child(10)').innerText,
          })),
        );
    });

    res.status(200).json(weapons);
  });
});
