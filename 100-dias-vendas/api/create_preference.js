export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  // Access Token do Mercado Pago
  const accessToken = process.env.MP_ACCESS_TOKEN || "APP_USR-5196315562790978-101312-4b40d27c121d97b7d360d44e1729b039-3762639342";

  try {
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: [
          {
            title: '100 Dias de Confiança',
            unit_price: 19.90,
            quantity: 1,
            currency_id: 'BRL'
          }
        ],
        back_urls: {
          success: 'https://100-dias-vendas-phwy.vercel.app/sucesso.html',
          failure: 'https://100-dias-vendas-phwy.vercel.app/erro.html',
          pending: 'https://100-dias-vendas-phwy.vercel.app/pendente.html'
        },
        auto_return: 'approved'
      })
    });

    const data = await response.json();
    
    if (data.id) {
      return res.status(200).json({ id: data.id });
    } else {
      return res.status(400).json({ error: 'Erro ao gerar preferência', details: data });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
